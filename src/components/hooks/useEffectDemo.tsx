import { Button, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { timeout } from '../../helpers';

export const UseEffectDemo = () => {
    const [trigger, setTrigger] = useState(false);
    const [stateText, setStateText] = useState('Idle');

    useEffect(() => {
        const fetchData = async () => {
            if (!trigger) return;
            setStateText('Fetching');
            await timeout(1000);
            setStateText('Fetched');
            await timeout(500);
            setTrigger(false);
            setStateText('Idle');
        };
        fetchData();
    }, [trigger]);

    return (
        <Stack>
            <Typography variant="h6">Use effect</Typography>
            <Paper sx={{ p: 2, backgroundColor: 'grey.100' }} elevation={2}>
                <Stack gap={2}>
                    <Typography>{stateText}</Typography>
                    <Stack
                        gap={2}
                        flexDirection={'row'}
                        justifyContent={'center'}
                    >
                        <Button
                            variant="contained"
                            onClick={() => setTrigger(true)}
                        >
                            Fetch data
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};
