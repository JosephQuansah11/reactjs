import { zodResolver } from '@hookform/resolvers/zod'
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AttractionFormData } from '../../models/park/Attraction.ts'
import { DialogAttractionContent } from './DialogAttractionContent'
import { useCallback /* useState */ } from 'react'
// import { useQueryClient, useMutation } from '@tanstack/react-query'
// import Loader from '../Loader.tsx'

interface ItemDialogProps {
    isOpen: boolean
    onSubmit: (attraction: AttractionFormData) => void
    onClose: () => void
}

const itemSchema: z.ZodType<AttractionFormData> = z.object({
    name: z.string().min(2, 'name must be at least 2 characters'),
    image: z.string().url(),
    positionX: z.string(),
    positionY: z.string(),
    parkID: z.string(),
})

export function AddAttractionDialog({ isOpen, onSubmit, onClose }: Readonly<ItemDialogProps>) {
    const {
        reset,
        control,
        formState: { errors },
    } = useForm<AttractionFormData>({
        resolver: zodResolver(itemSchema),
        defaultValues: {
            name: 'my attraction',
            image: 'https://neural.love/cdn/ai-photostock/1ed5ffb3-f65f-62be-a38a-7d9cad96c979/0.jpg?Expires=1704067199&Signature=w1aT~1gMecwHXyA0LuBWX45o5DHs8lOs03rw2usx2NaqHoE6hIjd4GzoVUL0DhevD6nnvVzkePJIso3FQEUH9LvXimi6OpXrCCFgIvc3jxvfTELQJZ-i9cHL2eaC5cPI-hOTfofUCK0ZtguUIYuGbPQ7XikP3MVIeqNab2Q6Tp~x-kjYmBy~NDDgft0-AQE7ihyFgtq7UkQ~mguu3KXUSXYvhtAAvXxkbYL~MC2swTVGkA5Axg5agOTr6IyhyH-CqY1z~HbJrQ4~2S-NSBTluuOt~dngPsqCbQUh~lR9Qu1kT0VEnC90TB49tiId5CcNp6vgOFztOuyeDH3VKON3kg__&Key-Pair-Id=K2RFTOXRBNSROX',
            positionY: '345.45',
            positionX: '367.25',
        },
    });

    const handleFormSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Render AddItemDialog');
        const data = new FormData(event.currentTarget);
        const formData = Object.fromEntries(data.entries());
        const attractionData = {
            name: formData.name,
            image: formData.image,
            positionX: formData.positionX+"px",
            positionY: formData.positionY+"px",
            parkID: formData.parkID,
        };
        onSubmit(attractionData as unknown as AttractionFormData);
        event.currentTarget.reset();
        reset();
        onClose();
    }, [onSubmit,  reset, onClose]);


    return (
        <Dialog open={isOpen} onClose={onClose}>
            <form onSubmit={handleFormSubmit} noValidate  style={{ margin: 'auto' }} method='post'>
                <DialogTitle>Add Attraction</DialogTitle>
                <DialogAttractionContent control={control} errors={errors} name={''} label={''} />
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