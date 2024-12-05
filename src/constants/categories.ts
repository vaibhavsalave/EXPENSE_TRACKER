export const TRANSACTION_CATEGORIES = [
  'Food',
  'Transport',
  'Utilities',
  'Entertainment',
  'Shopping',
  'Other'
] as const;

export type TransactionCategory = typeof TRANSACTION_CATEGORIES[number];