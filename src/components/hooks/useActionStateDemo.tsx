import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { useActionState, useState } from 'react';

export const UseActionStateDemo = () => {
    const [messageBody, setMessageBody] = useState('');

    const appendText = (previousState: string) => {
        setMessageBody('');
        return `${previousState} ${messageBody}`;
    };

    const [state, formAction] = useActionState(appendText, 'Text');

    return (
        <Stack>
            <Typography variant="h6">Use actionState</Typography>
            <Paper sx={{ p: 2, backgroundColor: 'grey.100' }} elevation={2}>
                <Stack
                    gap={2}
                    flexDirection={'column'}
                    justifyContent={'center'}
                >
                    <Typography>{state}</Typography>
                    <form action={formAction}>
                        <Stack gap={2}>
                            <TextField
                                type="text"
                                onChange={(e) => setMessageBody(e.target.value)}
                                placeholder="Append text"
                            />
                            <Button variant="contained" type="submit">
                                Append
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Paper>
        </Stack>
    );
};
