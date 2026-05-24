import api from './api';
import type { Goal } from '../types';


export async function getGoals(): Promise<Goal[]> {
  const response = await api.get('/goals');
  return response.data;
}

export async function createGoal(data: Omit<Goal, 'id'>): Promise<Goal> {
  const response = await api.post('/goals', data);
  return response.data;
}

export async function updateGoal(id: string, data: Partial<Goal>): Promise<Goal> {
  const response = await api.put(`/goals/${id}`, data);
  return response.data;
}

export async function deleteGoal(id: string): Promise<void> {
  await api.delete(`/goals/${id}`);
}
