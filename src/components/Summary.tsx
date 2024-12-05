import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import { Paper, Grid, Box, Typography } from '@mui/material';
import { AccountBalance, TrendingUp, TrendingDown } from '@mui/icons-material';
import { formatCurrency } from '../utils/formatters';

interface SummaryData {
  income: number;
  expenses: number;
  balance: number;
}

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce<SummaryData>(
    (acc, transaction) => {
      if (transaction.amount >= 0) {
        acc.income += transaction.amount;
      } else {
        acc.expenses += Math.abs(transaction.amount);
      }
      acc.balance = acc.income - acc.expenses;
      return acc;
    },
    { income: 0, expenses: 0, balance: 0 }
  );

  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="text.secondary" variant="subtitle2">Balance</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {formatCurrency(summary.balance)}
              </Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: 'primary.light', borderRadius: '50%' }}>
              <AccountBalance sx={{ color: 'white' }} />
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="text.secondary" variant="subtitle2">Income</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'success.main' }}>
                {formatCurrency(summary.income)}
              </Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: 'success.light', borderRadius: '50%' }}>
              <TrendingUp sx={{ color: 'white' }} />
            </Box>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography color="text.secondary" variant="subtitle2">Expenses</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'error.main' }}>
                {formatCurrency(summary.expenses)}
              </Typography>
            </Box>
            <Box sx={{ p: 1.5, bgcolor: 'error.light', borderRadius: '50%' }}>
              <TrendingDown sx={{ color: 'white' }} />
            </Box>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}