import { Paper, Stack, Typography, Button } from '@mui/material';
import { useLayoutEffect, useRef, useState } from 'react';

export const UseLayoutEffectDemo = () => {
    const [width, setWidth] = useState(0);
    const divRef = useRef<HTMLDivElement>(null);
    const [trigger, setTrigger] = useState(false);

    useLayoutEffect(() => {
        if (!divRef.current) return;
        const measuredWidth = divRef.current.offsetWidth;
        setWidth(measuredWidth);
        setTrigger(false);
    }, [trigger]);

    return (
        <Stack>
            <Typography variant="h6">Use layoutEffect</Typography>
            <Paper sx={{ p: 2, backgroundColor: 'grey.100' }} elevation={2}>
                <Stack gap={2}>
                    <Stack
                        gap={2}
                        flexDirection={'column'}
                        justifyContent={'center'}
                    >
                        <Paper
                            ref={divRef}
                            sx={{
                                backgroundColor: 'olive',
                                height: 100,
                                width: '100%',
                            }}
                        ></Paper>
                        <Typography>
                            The width of the above div is: {width}px
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => setTrigger(true)}
                        >
                            Recalculate
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};
