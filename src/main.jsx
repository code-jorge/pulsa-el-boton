import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { NotificationManager } from './components/NotificationManager/NotificationManager'
import App from './App'
import theme from './utils/theme'
import './index.css'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale='es'>
              <NotificationManager>
                <App />
              </NotificationManager>
            </LocalizationProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>
)
