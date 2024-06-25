import {
    Box,
    DialogContent,
    DialogContentText,
    TextField
} from '@mui/material';

import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ParkForm } from '../../models/park/Park';


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


export function DialogParkContent({ control, errors }: FormInputProps) {
    return (
        <DialogContent>
            <DialogContentText>Enter details to create a new park</DialogContentText>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {<GenerateControllerList control={control} errors={errors} name={''} label={''} />}
            </Box>
        </DialogContent>
    );
}
