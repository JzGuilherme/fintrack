import { useTransactions } from '../hooks/useTransactions';
import { useSummary } from '../hooks/useSummary';
import { formatCurrency } from '../utils/formatCurrency';

export function DashboardPage() {
  const { transactions, loading } = useTransactions();
  const { totalBalance, totalIncome, totalExpenses } = useSummary(transactions);

  const summaryData = [
    {
      title: 'Saldo Total',
      value: totalBalance,
      color: '#667eea',
    },
    {
      title: 'Receitas',
      value: totalIncome,
      color: '#48bb78',
    },
    {
      title: 'Despesas',
      value: totalExpenses,
      color: '#f56565',
    },
  ];

  if (loading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '32px', color: '#1a202c' }}>
          Bem-vindo ao Fintrack
        </h1>
        <p style={{ color: '#718096', textAlign: 'center', padding: '2rem' }}>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '32px', color: '#1a202c' }}>
        Bem-vindo ao Fintrack
      </h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}
      >
        {summaryData.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              borderLeft: `4px solid ${item.color}`,
            }}
          >
            <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#718096', fontWeight: '500' }}>
              {item.title}
            </p>
            <p style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: item.color }}>
              {formatCurrency(item.value)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
