import { TransactionCategory } from '../constants/categories';
import { Dayjs } from 'dayjs';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
}

export interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
}

export interface TransactionFormData {
  title: string;
  amount: string;
  type: TransactionType;
  category: TransactionCategory;
  date: Dayjs;
}