import { Button, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';

const myfunc = () => {
  console.log('ahoj');
  return 0;
};

export const UseStateDemo = () => {
  const [reactive, setReactive] = useState(myfunc());

  return (
    <Stack>
      <Typography variant="h6">Use state</Typography>
      <Paper sx={{ p: 2, backgroundColor: 'grey.100' }} elevation={2}>
        <Stack gap={2}>
          <Typography>{reactive}</Typography>
          <Stack gap={2} flexDirection={'row'} justifyContent={'center'}>
            <Button variant="contained" onClick={() => setReactive(reactive + 1)}>
              Add
            </Button>
            <Button variant="contained" onClick={() => setReactive(reactive - 1)}>
              Subtract
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
