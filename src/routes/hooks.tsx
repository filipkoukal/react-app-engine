import { Stack, Grid } from '@mui/material';
import { UseStateDemo } from '../components/hooks/useStateDemo';
import { UseEffectDemo } from '../components/hooks/useEffectDemo';
import { UseMemoDemo } from '../components/hooks/useMemoDemo';
import { UseCallbackDemo } from '../components/hooks/useCallbackDemo';
import { UseContextDemo } from '../components/hooks/useContextDemo';
import { UseOptimisticDemo } from '../components/hooks/useOptimisticDemo';
import { UseActionStateDemo } from '../components/hooks/useActionStateDemo';
import { UseLayoutEffectDemo } from '../components/hooks/useLayoutEffectDemo';

export const Hooks = () => {
  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <UseStateDemo />
        </Grid>
        <Grid item xs={4}>
          <UseEffectDemo />
        </Grid>
        <Grid item xs={4}>
          <UseMemoDemo />
        </Grid>
        <Grid item xs={4}>
          <UseCallbackDemo />
        </Grid>
        <Grid item xs={4}>
          <UseContextDemo />
        </Grid>
        <Grid item xs={4}>
          <UseOptimisticDemo />
        </Grid>
        <Grid item xs={4}>
          <UseActionStateDemo />
        </Grid>
        <Grid item xs={4}>
          <UseLayoutEffectDemo />
        </Grid>
      </Grid>
    </Stack>
  );
};
