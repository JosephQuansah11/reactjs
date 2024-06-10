import {
    Box,
    DialogContent,
    DialogContentText,
    TextField
} from '@mui/material';

import { Control, Controller, FieldErrors } from 'react-hook-form';
import { AttractionData } from '../../models/park/Attraction';


interface FormInputProps {
    control: Control<AttractionData>;
    name: string;
    label: string;
    multiline?: boolean;
    defaultValue?: string;
    fullWidth?: boolean;
    disabled?: boolean;
    errors?: FieldErrors<AttractionData>
}


function GenerateControllerList({ control, errors }: FormInputProps) {
    const itemData = [
        { name: 'name', label: 'Name', error: !!errors?.name, helperText: errors?.name?.message },
        { name: 'image', label: 'Image URL', error: !!errors?.image, helperText: errors?.image?.message },
        { name: 'positionY', label: 'Position Y', error: !!errors?.positionY, helperText: errors?.positionY?.message },
        { name: 'positionX', label: 'Position X', error: !!errors?.positionX, helperText: errors?.positionX?.message },
    ];


    return (itemData.map((item) => (
        <Controller
            key={item.name}
            name={item.name as keyof AttractionData}
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


export function DialogAttractionContent({ control, errors }: FormInputProps) {
    return (
        <DialogContent>
            <DialogContentText>Enter details to create a new item on the board</DialogContentText>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {<GenerateControllerList control={control} errors={errors} name={''} label={''} />}
            </Box>
        </DialogContent>
    );
}
