// React Grid Logic
import '@ag-grid-community/styles/ag-grid.css'; // Core CSS
import '@ag-grid-community/styles/ag-theme-quartz.css'; // Theme

import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Box, Button } from '@mui/material';
import { ModuleRegistry } from '@ag-grid-community/core';
import { Grid } from '../components/grid';
import { Add } from '@mui/icons-material';
import {
    CreateUpdateDialog,
    CreateUpdateDialogProps,
} from '../components/createUpdateDialog';
import { useRef } from 'react';
import { DeleteDialog, DeleteDialogProps } from '../components/deleteDialog';
import { Row } from '../store/gridSlice';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

export const Root = () => {
    const dialogRef = useRef<CreateUpdateDialogProps>(null);
    const deleteDialogRef = useRef<DeleteDialogProps>(null);

    const openDeleteDialog = (rowData: Row) => {
        deleteDialogRef.current?.handleClickOpen(rowData);
    };

    const openUpdateDialog = (rowData: Row) => {
        dialogRef.current?.handleClickOpen(
            `Update ${rowData.manufacturer} ${rowData.model}`,
            'update',
            rowData
        );
    };
    // Container: Defines the grid's theme & dimensions.
    return (
        <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="flex-end">
                <Button
                    startIcon={<Add />}
                    variant="contained"
                    color="success"
                    onClick={() =>
                        dialogRef.current?.handleClickOpen('Add new GPU', 'new')
                    }
                >
                    Add
                </Button>
            </Box>
            <Grid
                deleteEvent={openDeleteDialog}
                updateEvent={openUpdateDialog}
            />
            <CreateUpdateDialog ref={dialogRef} />
            <DeleteDialog ref={deleteDialogRef} />
        </Box>
    );
};
