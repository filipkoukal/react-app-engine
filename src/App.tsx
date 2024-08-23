import { Box, Container, Drawer, styled } from '@mui/material';
import { DrawerProps } from './components/drawerProps';
import { Route, Routes } from 'react-router-dom';
import { DRAWER_WIDTH } from './constants';
import { Root } from './routes/root';
import { Shrek } from './routes/shrek';
import { Hooks } from './routes/hooks';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `${DRAWER_WIDTH}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: `-${DRAWER_WIDTH}px`,
    }),
}));

function App() {
    return (
        <div
            id="rootdiv"
            style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Drawer
                sx={{
                    width: DRAWER_WIDTH,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        boxSizing: 'border-box',
                    },
                }}
                open
                variant="persistent"
            >
                {DrawerProps()}
            </Drawer>
            <Main>
                <Box min-height="100vh" display="flex" my={2} flexGrow={1}>
                    <Container>
                        <Routes>
                            <Route path="/" element={<Root />} />
                            <Route path="/shrek" element={<Shrek />} />
                            <Route path="/hooks" element={<Hooks />} />
                        </Routes>
                    </Container>
                </Box>
                {/*<Footer />*/}
            </Main>
        </div>
    );
}

export default App;
