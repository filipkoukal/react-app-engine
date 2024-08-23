import { Row, deleteGpu, fetchRows } from '../store/gridSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { FormEvent, forwardRef, useImperativeHandle, useState } from 'react';

export type DeleteDialogProps = {
    open: boolean;
    handleClickOpen: (row: Row) => void;
    handleClose: () => void;
};

export const DeleteDialog = forwardRef((_, ref) => {
    const dispatch = useDispatch<AppDispatch>();

    DeleteDialog.displayName = 'DeleteDialog';
    const [open, setOpen] = useState(false);
    const [manufacturer, setManufacturer] = useState(String);
    const [model, setModel] = useState(String);
    const [id, setId] = useState(String);

    useImperativeHandle(ref, () => ({
        handleClickOpen(row: Row) {
            setOpen(true);
            setModel(row.model);
            setManufacturer(row.manufacturer);
            setId(row.id!);
        },
    }));

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        await deleteGpu(id);
                        dispatch(fetchRows());
                        handleClose();
                    },
                }}
            >
                <DialogTitle>
                    Remove GPU {manufacturer} {model}?
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Delete</Button>
                </DialogActions>
            </Dialog>
        </>
    );
});
