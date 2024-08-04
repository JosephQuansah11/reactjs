import { zodResolver } from '@hookform/resolvers/zod'
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Fab,
    InputLabel,
    NativeSelect,
    TextField
} from '@mui/material'
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCallback, useContext, useState } from 'react'
import { ParkForm } from '../../models/park/Park.ts'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import AddIcon from '@mui/icons-material/Add';
import Loader from '../Loader.tsx'
import { useParks } from '../../hooks/ParkHook.ts'
import { addPark } from '../../services/park/ParkService.ts'
import { useNavigate } from 'react-router-dom'
import SecurityContext from '../../security/contexts/SecurityContexts.ts'
import { createGate, showGates } from '../../services/gate/GateService.ts'
import { ParkGate } from './ParkGate.ts'


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
    onSubmit: (park: ParkForm) => void
    onClose: () => void
}

const itemSchema: z.ZodType<ParkForm> = z.object({
    name: z.string().min(2, 'name must be at least 2 characters'),
    image: z.string().url(),
    entranceGateId: z.string(),
    exitGateId: z.string(),
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
            image: 'https://pics.craiyon.com/2023-10-14/0a67892f4981426d92ece30f27182f82.webp',
            entranceGateId: '',
            exitGateId: '',
        },
    });

    const handleFormSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = Object.fromEntries(data.entries());
        const parkData = {
            name: formData.name,
            image: formData.image,
            entranceGateId: formData.entranceGateId,
            exitGateId: formData.exitGateId
        };
        onSubmit(parkData as unknown as ParkForm);
        event.currentTarget.reset();
        reset();
        onClose();
    }, [onSubmit, reset, onClose]);


    return (
        <Dialog open={isOpen} onClose={onClose}>
            <form onSubmit={handleFormSubmit} noValidate style={{ margin: 'auto' }} method='post'>
                <DialogTitle>Add Park</DialogTitle>
                <ShowParkFormData control={control} errors={errors} name={''} label={''} />
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
            <Button type="reset" variant="outlined" onClick={reset}>
                Clear
            </Button>
            <Button type="submit" variant="contained">
                Add
            </Button>
        </DialogActions>
    )
}


function GenerateControllerList({ control, errors }: FormInputProps) {
    const { isLoading, isError, data: gates } = useQuery(["gates"], () => showGates());
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error</p>;

    const itemFound: string[] = []
    const exitItemFound: string[] = []

    gates.forEach((gate: ParkGate) => {
        if (gate.gateType === 'ENTRANCE') itemFound.push(gate.parkGateUUID)
        if (gate.gateType === 'EXIT') exitItemFound.push(gate.parkGateUUID)
    })

    const itemData = [
        { name: 'name', label: 'Name', error: !!errors?.name, helperText: errors?.name?.message },
        { name: 'image', label: 'Image URL', error: !!errors?.image, helperText: errors?.image?.message },
        { name: 'entranceGateId', label: 'Entrances', error: !!errors?.entranceGateId, helperText: errors?.entranceGateId?.message, options: itemFound },
        { name: 'exitGateId', label: 'Exits', error: !!errors?.exitGateId, helperText: errors?.exitGateId?.message, options: exitItemFound }
    ];


    return (itemData.map((item) => (
        <Controller
            key={item.name}
            name={item.name as keyof ParkForm}
            control={control}
            render={({ field }) => (
                item.options ? (
                    <>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">{item.name}</InputLabel>
                        <NativeSelect
                            {...field}
                        >
                            {item.options.map((option) => (
                                <option style={{ backgroundColor: 'black' }} key={option} value={option}>{option}</option>
                            ))}
                        </NativeSelect>
                    </>
                ) : (
                    <TextField
                        {...field}
                        label={item.label}
                        error={item.error}
                        helperText={item.helperText}
                    />
                )
            )}
        />
    )))

}


export function ShowParkFormData({ control, errors, name, label }: Readonly<FormInputProps>) {
    const { token } = useContext(SecurityContext)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.5rem', margin: 'auto' }}>
            <div>
                <Button onClick={() => createGate(token)}>Create Entrance and Exit Gates For Park</Button>
            </div>
            {<GenerateControllerList control={control} errors={errors} name={name} label={label} />}
        </Box>
    )
}


export function CreateParkForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const queryClient = useQueryClient()
    const { isLoading, isError, parks } = useParks()
    const {token} = useContext(SecurityContext)
    const {
        mutate: addItem,
        isLoading: isAddingItem,
        isError: isErrorAddingItem,
    } = useMutation((_park: ParkForm) => addPark(_park, _park.entranceGateId, _park.exitGateId, token), {
        onSuccess: () => {
            queryClient.invalidateQueries(['parks'])
        },
    }
    )

    const navigate = useNavigate();


    if (isLoading) return <Loader>We're loading your board</Loader>

    if (isAddingItem) return <Loader>We are connecting you to the server</Loader>

    if (isErrorAddingItem) {
        return <Alert severity="error">Oops, we were unable to connect to the server.</Alert>
    }

    if (isError || !parks) {
        return <Alert severity="error">Board could not be loaded</Alert>
    }

    return (
        <Box sx={{ width: '100vw', height: '80vh' }}>
            <AddParkDialog
                isOpen={isDialogOpen}
                onSubmit={(park) => {
                    addItem({ ...park })
                    navigate('/')
                }}
                onClose={() => {
                    setIsDialogOpen(false)
                }}
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


