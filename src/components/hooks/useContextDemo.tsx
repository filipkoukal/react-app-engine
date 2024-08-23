import { DarkMode, LightMode } from '@mui/icons-material';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

const ChildComponent = () => {
    const theme = useContext(ThemeContext);
    return (
        <Stack flexDirection={'row'} justifyContent={'space-between'}>
            <Typography>Current theme: {theme}</Typography>
            {theme === 'light' && <LightMode />}
            {theme === 'dark' && <DarkMode />}
        </Stack>
    );
};

export const UseContextDemo = () => {
    const [mode, setMode] = useState('light');

    return (
        <ThemeContext.Provider value={mode}>
            <Stack>
                <Typography variant="h6">Use context</Typography>
                <Paper sx={{ p: 2, backgroundColor: 'grey.100' }} elevation={2}>
                    <Stack gap={2}>
                        <Stack
                            gap={2}
                            flexDirection={'column'}
                            justifyContent={'center'}
                        >
                            <ChildComponent />
                            <Button
                                variant="contained"
                                onClick={() =>
                                    setMode(mode === 'light' ? 'dark' : 'light')
                                }
                            >
                                Toggle Mode
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>
            </Stack>
        </ThemeContext.Provider>
    );
};
