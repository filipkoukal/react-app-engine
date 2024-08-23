import { Button, Paper, Stack, TextField, Typography } from '@mui/material';
import { startTransition, useOptimistic, useState } from 'react';
import { timeout } from '../../helpers';

type Message = {
    text: string;
    sending?: boolean;
};

export const UseOptimisticDemo = () => {
    const [messageBody, setMessageBody] = useState('');

    const [messages, setMessages] = useState<Message[]>([]);

    const [optimisticMessages, addOptimisticMessage] = useOptimistic(
        messages,
        (state, newMessage: string) => [
            ...state,
            {
                text: newMessage,
                sending: true,
            },
        ]
    );

    const buttonAction = async () => {
        startTransition(() => {
            addOptimisticMessage(messageBody);
        });
        await sendMessage(messageBody);
    };

    const deliverMessage = async (message: string) => {
        await timeout(1000);
        return message;
    };
    const sendMessage = async (messageBody: string) => {
        const sentMessage = await deliverMessage(messageBody);
        setMessages((messages) => [
            ...messages,
            { text: sentMessage, sending: false },
        ]);
    };

    return (
        <Stack>
            <Typography variant="h6">Use optimistic</Typography>
            <Paper sx={{ p: 2, backgroundColor: 'grey.100' }} elevation={2}>
                <Stack gap={2}>
                    {optimisticMessages.map((message, index) => (
                        <Typography key={index}>
                            {message.text}
                            {!!message.sending && (
                                <Typography variant="caption">
                                    (Sending...)
                                </Typography>
                            )}
                        </Typography>
                    ))}
                    <Stack
                        gap={2}
                        flexDirection={'column'}
                        justifyContent={'center'}
                    >
                        <TextField
                            type="text"
                            onChange={(e) => setMessageBody(e.target.value)}
                            placeholder="Type a message"
                        />
                        <Button variant="contained" onClick={buttonAction}>
                            Send
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </Stack>
    );
};
