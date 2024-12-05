import React from 'react';
import { TransactionProvider } from './context/TransactionContext';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Summary } from './components/Summary';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { AccountBalanceWallet } from '@mui/icons-material';
import { theme } from './theme/theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <TransactionProvider>
          <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static" color="primary" elevation={0}>
              <Toolbar>
                <AccountBalanceWallet sx={{ mr: 2 }} />
                <Typography variant="h6" component="div">
                  Expense Tracker
                </Typography>
              </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
                <Box>
                  <Summary />
                  <TransactionForm />
                </Box>
                <Box>
                  <TransactionList />
                </Box>
              </Box>
            </Container>
          </Box>
        </TransactionProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;