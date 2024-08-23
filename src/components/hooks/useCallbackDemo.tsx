import { Button, Paper, Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';

const ChildComponent = ({
    handleSubmit,
}: {
    handleSubmit: (value: number) => number;
}) => {
    const [count, setCount] = useState(0);

    return (
        <Stack>
            <Stack>{count}</Stack>
            <Button
                variant="contained"
                onClick={() => setCount(handleSubmit(count))}
            >
                Do action
            </Button>
        </Stack>
    );
};

export const UseCallbackDemo = () => {
    const [useDecrement, setUseDecrement] = useState(false);

    const handleSubmit = useCallback(
        (value: number) => {
            return useDecrement ? (value -= 1) : (value += 1);
        },
        [useDecrement]
    );

    return (
        <Stack>
            <Typography variant="h6">Use callback</Typography>
            <Paper sx={{ p: 2, backgroundColor: 'grey.100' }} elevation={2}>
                <Stack gap={2}>
                    <Stack
                        gap={2}
                        flexDirection={'column'}
                        justifyContent={'center'}
                    >
                        <ChildComponent handleSubmit={handleSubmit} />
                        <Button
                            variant="contained"
                            onClick={() => setUseDecrement(!useDecrement)}
                        >
                            {useDecrement ? 'Increment' : 'Decrement'}
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};
