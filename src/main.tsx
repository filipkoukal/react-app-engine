import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

import * as ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </>
);
