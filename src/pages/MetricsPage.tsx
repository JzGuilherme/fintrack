import { useMemo } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { useTheme } from '../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../styles/theme';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

const COLORS = ['#7c3aed', '#22c55e', '#ef4444', '#f59e0b', '#3b82f6'];

export function MetricsPage() {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;
  const { transactions } = useTransactions();

  const cardStyle = {
    backgroundColor: colors.surface,
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  };

  const titleStyle = {
    fontSize: '16px',
    fontWeight: 600,
    color: colors.text,
    marginBottom: '16px',
  };

  const balanceData = useMemo(() => {
    const months: Record<string, { income: number; expense: number }> = {};
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('pt-BR', { month: 'short' });
      if (!months[month]) months[month] = { income: 0, expense: 0 };
      if (t.type === 'income') months[month].income += t.amount;
      else months[month].expense += t.amount;
    });
    let accumulated = 0;
    return Object.entries(months).map(([month, values]) => {
      accumulated += values.income - values.expense;
      return { month, saldo: accumulated };
    });
  }, [transactions]);

  const incomeExpenseData = useMemo(() => {
    const months: Record<string, { receitas: number; despesas: number }> = {};
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('pt-BR', { month: 'short' });
      if (!months[month]) months[month] = { receitas: 0, despesas: 0 };
      if (t.type === 'income') months[month].receitas += t.amount;
      else months[month].despesas += t.amount;
    });
    return Object.entries(months).map(([month, values]) => ({ month, ...values }));
  }, [transactions]);

  const expenseDistribution = useMemo(() => {
    const categories: Record<string, number> = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        if (!categories[t.category]) categories[t.category] = 0;
        categories[t.category] += t.amount;
      });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 600, color: colors.text, marginBottom: '32px' }}>
        Métricas
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px' }}>

        <div style={cardStyle}>
          <h2 style={titleStyle}>Evolução do Saldo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={balanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" stroke={colors.textSecondary} />
              <YAxis stroke={colors.textSecondary} />
              <Tooltip
                contentStyle={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
                formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              />
              <Line type="monotone" dataKey="saldo" stroke={colors.primary} strokeWidth={2} dot={{ fill: colors.primary }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h2 style={titleStyle}>Receitas vs Despesas</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeExpenseData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis dataKey="month" stroke={colors.textSecondary} />
              <YAxis stroke={colors.textSecondary} />
              <Tooltip
                contentStyle={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
                formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              />
              <Legend />
              <Bar dataKey="receitas" fill="#22c55e" />
              <Bar dataKey="despesas" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={cardStyle}>
          <h2 style={titleStyle}>Distribuição de Despesas</h2>
          {expenseDistribution.length === 0 ? (
            <p style={{ color: colors.textSecondary, textAlign: 'center', padding: '2rem' }}>
              Nenhuma despesa registrada
            </p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, value }) => `${name}: R$ ${value}`}
                >
                  {expenseDistribution.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, color: colors.text }}
                  formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>
    </div>
  );
}