import { Box, IconButton } from '@mui/material';
import { Row } from '../../store/gridSlice';
import { Delete, Update } from '@mui/icons-material';

type GridActionsRendererParams = {
    data: Row;
    handleDelete: () => void;
    handleUpdate: () => void;
};

export const GridActionsRenderer = (params: GridActionsRendererParams) => {
    return (
        <Box display="flex" flexDirection="row-reverse" justifyContent="center">
            <IconButton
                aria-label="delete"
                onClick={() => params.handleDelete()}
            >
                <Delete />
            </IconButton>

            <IconButton
                aria-label="update"
                onClick={() => params.handleUpdate()}
            >
                <Update />
            </IconButton>
        </Box>
    );
};
