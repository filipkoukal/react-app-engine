import {
    Button,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    Dialog,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { Row, createGpu, fetchRows, updateGpu } from '../store/gridSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { MANUFACTURERS } from '../constants';
import {
    ChangeEvent,
    FormEvent,
    forwardRef,
    useImperativeHandle,
    useState,
} from 'react';

type Mode = 'new' | 'update';

export type CreateUpdateDialogProps = {
    open: boolean;
    handleClickOpen: (title: string, mode: Mode, row?: Row) => void;
    handleClose: () => void;
};

export const CreateUpdateDialog = forwardRef((_, ref) => {
    const dispatch = useDispatch<AppDispatch>();

    CreateUpdateDialog.displayName = 'CreateUpdateDialog';
    const [title, setTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [model, setModel] = useState('');
    const [teraflops, setTeraflops] = useState(0);
    const [tdp, setTdp] = useState(0);
    const [rt, setRt] = useState(false);
    const [id, setId] = useState('');

    const onRtChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRt(event.target.checked);
    };

    const onManufacturerChange = (event: SelectChangeEvent<string>) => {
        console.log(event.target.value);
        setManufacturer(event.target.value);
    };

    useImperativeHandle(ref, () => ({
        handleClickOpen(title: string, mode: Mode, row?: Row) {
            setOpen(true);
            setTitle(title);
            setMode(mode);
            console.log(row);
            if (mode === 'update') {
                setManufacturer(row!.manufacturer);
                setModel(row!.model);
                setTeraflops(row!.teraflops);
                setTdp(row!.tdp);
                setRt(row!.rt);
                setId(row!.id!);
            } else {
                setManufacturer('AMD');
                setModel('');
                setTeraflops(0);
                setTdp(0);
                setRt(false);
                setId('');
            }
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
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        console.log(formJson);
                        const payload: Row = {
                            manufacturer,
                            model: formJson.model.toString(),
                            teraflops: +formJson.teraflops.toString(),
                            tdp: +formJson.tdp.toString(),
                            rt: formJson.rt ? true : false,
                        };
                        if (mode === 'new') {
                            await createGpu(payload);
                        } else {
                            payload.id = id;
                            await updateGpu(payload);
                        }
                        dispatch(fetchRows());
                        handleClose();
                    },
                }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ marginTop: 1 }}>
                        <InputLabel id="manufacturer-label">
                            Manufacturer
                        </InputLabel>
                        <Select
                            labelId="manufacturer-label"
                            id="manufacturer"
                            value={manufacturer}
                            label="Manufacturer"
                            onChange={onManufacturerChange}
                        >
                            {MANUFACTURERS.map((object, i) => (
                                <MenuItem value={object} key={i}>
                                    {object}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        required
                        variant="outlined"
                        margin="dense"
                        id="model"
                        name="model"
                        label="Model"
                        type="text"
                        defaultValue={model}
                        fullWidth
                    />
                    <TextField
                        required
                        variant="outlined"
                        margin="dense"
                        id="teraflops"
                        name="teraflops"
                        label="TeraFlops"
                        type="number"
                        defaultValue={teraflops}
                        fullWidth
                    />
                    <TextField
                        required
                        variant="outlined"
                        margin="dense"
                        id="tdp"
                        name="tdp"
                        label="TDP"
                        type="number"
                        defaultValue={tdp}
                        fullWidth
                    />
                    <FormControlLabel
                        label="Raytracing"
                        control={
                            <Checkbox
                                checked={rt}
                                onChange={onRtChange}
                                id="rt"
                                name="rt"
                            />
                        }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">
                        {mode === 'new' ? 'Add' : 'Update'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
});
