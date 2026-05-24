import api from './api';
import type { Transaction } from '../types';

export async function getTransactions(): Promise<Transaction[]> {
  const response = await api.get('/transactions');
  return response.data;
}

export async function createTransaction(
  data: Omit<Transaction, 'id'>
): Promise<Transaction> {
  const response = await api.post('/transactions', data);
  return response.data;
}

export async function updateTransaction(
  id: string,
  data: Partial<Transaction>
): Promise<Transaction> {
  const response = await api.put(`/transactions/${id}`, data);
  return response.data;
}

export async function deleteTransaction(id: string): Promise<void> {
  await api.delete(`/transactions/${id}`);
}
