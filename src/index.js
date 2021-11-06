import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { NotificationManager } from './components/NotificationManager/NotificationManager'
import { StyledEngineProvider } from '@mui/material/styles'
import { ThemeProvider } from '@mui/system'
import App from './App';
import theme from './utils/theme'
import './index.css';

const queryClient = new QueryClient()

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterLuxon}>
              <NotificationManager>
                <App />
              </NotificationManager>
            </LocalizationProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);