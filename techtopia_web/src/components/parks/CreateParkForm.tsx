import { zodResolver } from '@hookform/resolvers/zod'
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Fab,
    TextField
} from '@mui/material'
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback, useState} from 'react'
import { ParkForm } from '../../models/park/Park.ts'
import { DialogParkContent } from './DialogParkContent.tsx'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import AddIcon from '@mui/icons-material/Add';
import Loader from '../Loader.tsx'
import { useParks } from '../../hooks/ParkHook.ts'
import { addPark } from '../../services/park/ParkService.ts'


interface FormInputProps {
    control: Control<ParkForm>;
    name: string;
    label: string;
    multiline?: boolean;
    defaultValue?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    errors?: FieldErrors<ParkForm>
}


interface ItemDialogProps {
    isOpen: boolean
    onSubmit: (attraction: ParkForm) => void
    onClose: () => void
}

const itemSchema: z.ZodType<ParkForm> = z.object({
    name: z.string().min(2, 'name must be at least 2 characters'),
    image: z.string().url()
})

export function AddParkDialog({ isOpen, onSubmit, onClose }: Readonly<ItemDialogProps>) {
    const {
        reset,
        control,
        formState: { errors },
    } = useForm<ParkForm>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            name: 'my park',
            image: 'https://neural.love/cdn/ai-photostock/1ed5ffb3-f65f-62be-a38a-7d9cad96c979/0.jpg?Expires=1704067199&Signature=w1aT~1gMecwHXyA0LuBWX45o5DHs8lOs03rw2usx2NaqHoE6hIjd4GzoVUL0DhevD6nnvVzkePJIso3FQEUH9LvXimi6OpXrCCFgIvc3jxvfTELQJZ-i9cHL2eaC5cPI-hOTfofUCK0ZtguUIYuGbPQ7XikP3MVIeqNab2Q6Tp~x-kjYmBy~NDDgft0-AQE7ihyFgtq7UkQ~mguu3KXUSXYvhtAAvXxkbYL~MC2swTVGkA5Axg5agOTr6IyhyH-CqY1z~HbJrQ4~2S-NSBTluuOt~dngPsqCbQUh~lR9Qu1kT0VEnC90TB49tiId5CcNp6vgOFztOuyeDH3VKON3kg__&Key-Pair-Id=K2RFTOXRBNSROX',
        },
    });

    const handleFormSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = Object.fromEntries(data.entries());
        const parkData = {
            name: formData.name,
            image: formData.image,
        };
        onSubmit(parkData as unknown as ParkForm);
        event.currentTarget.reset();
        reset();
        onClose();
    }, [onSubmit,  reset, onClose]);


    return (
        <Dialog open={isOpen} onClose={onClose}>
            <form onSubmit={handleFormSubmit} noValidate  style={{ margin: 'auto' }} method='post'>
                <DialogTitle>Add Attraction</DialogTitle>
                <DialogParkContent control={control} errors={errors} name={''} label={''} />
                <DialogActionsToDisplay onClose={onClose} reset={reset} />
            </form>
        </Dialog>
    );
}


interface ActionsToDisplay {
    onClose: () => void
    reset: () => void
}

function DialogActionsToDisplay({ onClose, reset }: ActionsToDisplay) {
    return (
        <DialogActions style={{ paddingRight: '1.5em', paddingBottom: '1.5em' }}>
            <Button variant="outlined" onClick={onClose}>
                Cancel
            </Button>
            <Button type="reset" variant="outlined" onClick={() => reset()}>
                Clear
            </Button>
            <Button type="submit" variant="contained">
                Add
            </Button>
        </DialogActions>
    )
}




function GenerateControllerList({ control, errors }: FormInputProps) {
    const itemData = [
        { name: 'name', label: 'Name', error: !!errors?.name, helperText: errors?.name?.message },
        { name: 'image', label: 'Image URL', error: !!errors?.image, helperText: errors?.image?.message },
    ];


    return (itemData.map((item) => (
        <Controller
            key={item.name}
            name={item.name as keyof ParkForm}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label={item.label}
                    error={item.error}
                    helperText={item.helperText}
                />
            )}
        />
    )))
}


export function ShowParkFormData({ control, errors, name, label }: Readonly<FormInputProps>) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', margin: 'auto' }}>
            {<GenerateControllerList control={control} errors={errors} name={name} label={label} />}
        </Box>
    )
}


export function CreateParkForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const queryClient = useQueryClient()
    const { isLoading, isError, parks } = useParks()
    const {
        mutate: addItem,
        isLoading: isAddingItem,
        isError: isErrorAddingItem,
    } = useMutation((_park: ParkForm) => addPark(_park), {
        onSuccess: () => {
            queryClient.invalidateQueries(['parks'])
        },
    }
)

    if (isLoading) return <Loader>We're loading your board</Loader>

    if (isAddingItem) return <Loader>We are connecting you to the server</Loader>

    if (isErrorAddingItem) {
        return <Alert severity="error">Oops, we were unable to connect to the server.</Alert>
    }

    if (isError || !parks) {
        return <Alert severity="error">Board could not be loaded</Alert>
    }

    return (
        <Box sx={{width: '100vw', height: '80vh'}}>
            <AddParkDialog
                isOpen={isDialogOpen}
                onSubmit={(park)=>{
                    addItem({...park})
                }}
                onClose={() => {
                    setIsDialogOpen(false)}}
            />
            <Fab
                title="add new park"
                size="large"
                color="secondary"
                aria-label="create park"
                style={{ position: 'relative', left: '10rem', top: '10rem' }}
                onClick={() => setIsDialogOpen(true)}
            >
                <AddIcon />
            </Fab>
        </Box>
    )
}


