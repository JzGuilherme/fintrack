import type { Transaction } from '../types';

interface SummaryData {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export function useSummary(transactions: Transaction[]): SummaryData {
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        return {
          ...acc,
          totalIncome: acc.totalIncome + transaction.amount,
        };
      } else {
        return {
          ...acc,
          totalExpenses: acc.totalExpenses + transaction.amount,
        };
      }
    },
    { totalIncome: 0, totalExpenses: 0 }
  );

  return {
    totalIncome: totals.totalIncome,
    totalExpenses: totals.totalExpenses,
    totalBalance: totals.totalIncome - totals.totalExpenses,
  };
}
