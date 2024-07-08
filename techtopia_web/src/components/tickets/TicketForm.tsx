import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Fab,
    TextField
} from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';
import AddIcon from '@mui/icons-material/Add';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useState } from 'react';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useTickets } from '../../hooks/TicketHook';
import { TicketFormData } from '../../models/ticket/Ticket';
import { AddTicket, PrintTicket, sellTicketToGuest } from '../../services/ticket/TicketService';
import Loader from '../Loader';
import SecurityContext from '../../security/contexts/SecurityContexts.ts';


interface TicketDialogProps {
    isOpen: boolean
    onSubmit: (ticket: TicketFormData) => void
    onClose: () => void
}

interface ActionsToDisplay {
    onClose: () => void
}

const ticketSchema: z.ZodType<TicketFormData> = z.object({
    username: z.string().min(2, 'username must be at least 2 characters'),
    children: z.string(),
    grandparents: z.string(),
    ticketType: z.string(),
    formTicketId: z.string(),
    validityStartDate: z.string(),
    validityEndDate: z.string(),
    price: z.number()
})



interface FormInputProps {
    control: Control<TicketFormData>;
    name: string;
    label: string;
    errors?: FieldErrors<TicketFormData>
}



export function AddTicketDialog({ isOpen, onSubmit, onClose }: Readonly<TicketDialogProps>) {
    const { ticket_type } = useParams();
    const { token } = useContext(SecurityContext)
    console.log(token)
    const {
        reset,
        control,
        formState: { errors },
    } = useForm<TicketFormData>({
        resolver: zodResolver(ticketSchema),
        defaultValues: {
            username: '',
            children: '',
            grandparents: '',
            price: ticket_type?.toUpperCase() === 'SINGLE_DAY_PASS' ? 20 : 30,
        },
    });

    const navigate = useNavigate();
    const params = useParams();
    const type = params.ticket_type
    const ticketAgentId = params.ticket_agent;

    const handleFormSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = Object.fromEntries(data.entries());
        onSubmit(formData as unknown as TicketFormData);
        event.currentTarget.reset();
        const ticketId = await AddTicket(type, token);
        await sellTicketToGuest(ticketId, ticketAgentId, token);
        reset();
        onClose();
        navigate(`/ticket_info/${ticketId}/ticket/${formData.username}`);
    }, [onSubmit, type, reset, onClose, navigate, ticketAgentId, token]);

    return (
        <Dialog open={isOpen} onClose={onClose}>
            <form onSubmit={handleFormSubmit} noValidate style={{ margin: 'auto' }} method='post'>
                <DialogTitle sx={{ textAlign: 'center', backgroundColor: 'black', color: 'whitesmoke' }}>Purchase Ticket</DialogTitle>
                <ShowTicketFormData control={control} errors={errors} name={''} label={''} />
                <DialogActionsToDisplay onClose={onClose} />
            </form>
        </Dialog>
    );
}


function DialogActionsToDisplay({ onClose }: Readonly<ActionsToDisplay>) {
    return (
        <DialogActions style={{ background: 'black', color: 'whitesmoke', display: 'flex', justifyContent: 'center' }}>
            <Button type="button" onClick={onClose} style={{ backgroundColor: 'orange', color: 'black', fontWeight: 'bold', fontSize: '0.75rem' }}>
                Cancel Purchase
            </Button>
            <Button type="submit" style={{ backgroundColor: 'lightseagreen', color: 'black', fontWeight: 'bold', fontSize: '0.75rem' }}>
                Purchase Ticket
            </Button>
        </DialogActions>
    )
}

function GenerateControllerList({ control, errors }: FormInputProps) {
    const ticketUserData = [
        { name: 'username', label: 'username', error: !!errors?.username, helperText: errors?.username?.message },
        { name: 'children', label: 'children', error: !!errors?.children, helperText: errors?.children?.message },
        { name: 'grandparents', label: 'grandparents', error: !!errors?.grandparents, helperText: errors?.grandparents?.message },
        { name: 'price', label: 'price', error: !!errors?.price, helperText: errors?.price?.message }
    ];


    return (ticketUserData.map((ticket) => (
        <Controller
            key={ticket.name}
            name={ticket.name as keyof TicketFormData}
            control={control}
            render={({ field }) => (
                <TextField sx={{ width: '100%', margin: '0.25rem' }}
                    {...field}
                    label={ticket.label}
                    error={ticket.error}
                    helperText={ticket.helperText}
                />
            )}
        />
    )))
}


export function ShowTicketFormData({ control, errors, name, label }: Readonly<FormInputProps>) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', margin: 'auto' }}>
            {<GenerateControllerList control={control} errors={errors} name={name} label={label} />}
        </Box>
    )
}


export function ShowTicketForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const queryClient = useQueryClient()
    const { isLoading, isError, tickets } = useTickets()
    const {token} = useContext(SecurityContext)
    const {
        mutate: addItem,
        isLoading: isAddingItem,
        isError: isErrorAddingItem,
    } = useMutation((_ticket: TicketFormData) => PrintTicket(_ticket, token), {
        onSuccess: () => {
            queryClient.invalidateQueries(['tickets'])
        },
    }
    )

    if (isLoading) return <Loader>We're loading your board</Loader>

    if (isAddingItem) return <Loader>We are connecting you to the server</Loader>

    if (isErrorAddingItem) {
        return <Alert severity="error">Oops, we were unable to connect to the server.</Alert>
    }

    if (isError || !tickets) {
        return <Alert severity="error">Board could not be loaded</Alert>
    }

    return (
        <Box sx={{ width: '100vw', height: '80vh' }}>
            <AddTicketDialog
                isOpen={isDialogOpen}
                onSubmit={(ticket) => {
                    addItem({ ...ticket })
                }}
                onClose={() => {
                    setIsDialogOpen(false)
                }}
            />
            <Fab
                title="add new attraction"
                size="large"
                color="secondary"
                aria-label="purchase ticket"
                style={{ position: 'relative', left: '10rem', top: '10rem' }}
                onClick={() => setIsDialogOpen(true)}
            >
                <AddIcon />
            </Fab>
        </Box>
    )
}

