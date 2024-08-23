import { AgGridReact } from '@ag-grid-community/react'; // React Grid Logic
import '@ag-grid-community/styles/ag-grid.css'; // Core CSS
import '@ag-grid-community/styles/ag-theme-quartz.css'; // Theme
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { ModuleRegistry, ColDef, ColGroupDef } from '@ag-grid-community/core';
import { useEffect } from 'react';
import { Row, fetchRows } from '../store/gridSlice';
import { GridActionsRenderer } from './aggrid/gridActions';
import { ICellRendererParams } from 'ag-grid';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

type GridProps = {
    deleteEvent: (rowData: Row) => void;
    updateEvent: (rowData: Row) => void;
};

export const Grid = ({ deleteEvent, updateEvent }: GridProps) => {
    const openDeleteDialog = (rowData: Row) => {
        deleteEvent(rowData);
    };

    const openEditDialog = (rowData: Row) => {
        updateEvent(rowData);
    };

    const rowData = useSelector((state: RootState) => state.grid.rows);
    const dispatch = useDispatch<AppDispatch>();

    // Column Definitions: Defines & controls grid columns.
    const colDefs: (ColDef<Row> | ColGroupDef<Row>)[] = [
        { field: 'manufacturer' },
        { field: 'model' },
        { field: 'teraflops', headerName: 'TeraFlops' },
        { field: 'tdp', headerName: 'TDP' },
        { field: 'rt', headerName: 'Raytracing' },
        {
            headerName: 'Actions',
            cellRenderer: (params: ICellRendererParams) =>
                GridActionsRenderer({
                    data: params.data,
                    handleDelete: () => openDeleteDialog(params.data),
                    handleUpdate: () => openEditDialog(params.data),
                }),
        },
    ];

    useEffect(() => {
        dispatch(fetchRows()); // Dispatch the action to fetch rows when the component mounts
    }, [dispatch]);

    const defaultColDef: ColDef = {
        flex: 1,
    };

    return (
        <Box
            pt={2}
            height="85vh"
            className={'ag-theme-quartz'}
            sx={{ width: 1.0 }}
        >
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
            />
        </Box>
    );
};
