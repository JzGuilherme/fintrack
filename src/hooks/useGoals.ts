import { useState, useEffect } from 'react';
import type { Goal } from '../types';
import { getGoals } from '../services/goals.service';

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchGoals() {
    try {
      setLoading(true);
      setError(null);
      const data = await getGoals();
      setGoals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch goals');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGoals();
  }, []);

  return {
    goals,
    loading,
    error,
    refetch: fetchGoals,
  };
}
