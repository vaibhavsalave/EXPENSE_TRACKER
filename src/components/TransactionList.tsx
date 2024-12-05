import React from 'react';
import { useTransactions } from '../context/TransactionContext';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Chip,
  Divider
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { formatCurrency, formatDate } from '../utils/formatters';

export function TransactionList() {
  const { transactions, deleteTransaction } = useTransactions();

  return (
    <Paper>
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h6">Recent Transactions</Typography>
      </Box>
      <List sx={{ p: 0 }}>
        {transactions.length === 0 ? (
          <ListItem>
            <ListItemText
              primary={
                <Typography color="text.secondary" align="center">
                  No transactions yet
                </Typography>
              }
            />
          </ListItem>
        ) : (
          transactions.map((transaction, index) => (
            <React.Fragment key={transaction.id}>
              {index > 0 && <Divider />}
              <ListItem
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTransaction(transaction.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1">{transaction.title}</Typography>
                      <Typography
                        variant="subtitle1"
                        color={transaction.amount >= 0 ? 'success.main' : 'error.main'}
                        sx={{ fontWeight: 'bold' }}
                      >
                        {formatCurrency(transaction.amount)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Chip
                        label={transaction.category}
                        size="small"
                        color={transaction.amount >= 0 ? 'success' : 'error'}
                        variant="outlined"
                      />
                      <Typography variant="body2" color="text.secondary">
                        {formatDate(transaction.date)}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))
        )}
      </List>
    </Paper>
  );
}