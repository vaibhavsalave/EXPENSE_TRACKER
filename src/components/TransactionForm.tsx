import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';
import {
  Paper,
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Add } from '@mui/icons-material';
import dayjs from 'dayjs';
import { TRANSACTION_CATEGORIES } from '../constants/categories';
import { TransactionFormData } from '../types';

const initialFormData: TransactionFormData = {
  title: '',
  amount: '',
  type: 'expense',
  category: 'Other',
  date: dayjs()
};

export function TransactionForm() {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState<TransactionFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;

    addTransaction({
      ...formData,
      amount: formData.type === 'expense' 
        ? -Math.abs(Number(formData.amount)) 
        : Math.abs(Number(formData.amount)),
      date: formData.date.format('YYYY-MM-DD')
    });
    
    setFormData(initialFormData);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>Add Transaction</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={formData.title}
              onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={e => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              required
              inputProps={{ min: "0", step: "0.01" }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Type"
              value={formData.type}
              onChange={e => setFormData(prev => ({ ...prev, type: e.target.value as 'income' | 'expense' }))}
            >
              <MenuItem value="expense">Expense</MenuItem>
              <MenuItem value="income">Income</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Category"
              value={formData.category}
              onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as typeof formData.category }))}
            >
              {TRANSACTION_CATEGORIES.map(category => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={(newValue) => setFormData(prev => ({ ...prev, date: newValue || dayjs() }))}
              sx={{ width: '100%' }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              startIcon={<Add />}
              disabled={!formData.title || !formData.amount}
            >
              Add Transaction
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}