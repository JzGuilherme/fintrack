import { useState } from 'react';
import { useTransactions } from '../hooks/useTransactions';
import { createTransaction, deleteTransaction } from '../services/transactions.service';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { formatCurrency } from '../utils/formatCurrency';

interface TransactionFormData {
  title: string;
  amount: string;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

const inputStyle = {
  padding: '8px 12px',
  borderRadius: '8px',
  border: '1px solid #d1d5db',
  fontSize: '14px',
  width: '100%',
  marginTop: '4px',
  marginBottom: '12px',
};

const labelStyle = {
  fontSize: '14px',
  fontWeight: 500,
  color: '#374151',
};

export function TransactionsPage() {
  const { transactions, loading, error, refetch } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<TransactionFormData>({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  function handleChange(field: keyof TransactionFormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.title || !form.amount || !form.category) return;
    setIsSubmitting(true);
    try {
      await createTransaction({
        title: form.title,
        amount: parseFloat(form.amount),
        type: form.type,
        category: form.category,
        date: form.date,
      });
      setIsModalOpen(false);
      setForm({ title: '', amount: '', type: 'expense', category: '', date: new Date().toISOString().split('T')[0] });
      refetch();
    } catch (err) {
      console.error('Failed to create transaction', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja deletar esta transação?')) {
      try {
        await deleteTransaction(id);
        refetch();
      } catch (err) {
        console.error('Failed to delete transaction', err);
      }
    }
  }

  if (loading) return <p style={{ padding: '2rem', color: '#718096' }}>Carregando...</p>;
  if (error) return <p style={{ padding: '2rem', color: '#ef4444' }}>Erro: {error}</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#1a202c' }}>Transações</h1>
        <Button label="+ Nova Transação" onClick={() => setIsModalOpen(true)} variant="primary" />
      </div>

      {transactions.length === 0 ? (
        <p style={{ color: '#718096', textAlign: 'center', padding: '2rem' }}>Nenhuma transação registrada</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <thead>
              <tr style={{ backgroundColor: '#f7fafc', borderBottom: '1px solid #e2e8f0' }}>
                {['Título', 'Valor', 'Tipo', 'Categoria', 'Data', 'Ações'].map(col => (
                  <th key={col} style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: 600, color: '#1a202c' }}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} style={{ borderBottom: '1px solid #e2e8f0' }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f7fafc'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#1a202c' }}>{transaction.title}</td>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: 600, color: '#1a202c' }}>{formatCurrency(transaction.amount)}</td>
                  <td style={{ padding: '16px' }}>
                    <Badge label={transaction.type === 'income' ? 'Receita' : 'Despesa'} variant={transaction.type === 'income' ? 'success' : 'danger'} />
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#718096' }}>{transaction.category}</td>
                  <td style={{ padding: '16px', fontSize: '14px', color: '#718096' }}>{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <Button label="Deletar" onClick={() => handleDelete(transaction.id)} variant="danger" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Transação">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Título</label>
          <input style={inputStyle} type="text" placeholder="Ex: Salário" value={form.title} onChange={e => handleChange('title', e.target.value)} />

          <label style={labelStyle}>Valor</label>
          <input style={inputStyle} type="number" placeholder="0.00" value={form.amount} onChange={e => handleChange('amount', e.target.value)} />

          <label style={labelStyle}>Tipo</label>
          <select style={{ ...inputStyle }} value={form.type} onChange={e => handleChange('type', e.target.value as 'income' | 'expense')}>
            <option value="income">Receita</option>
            <option value="expense">Despesa</option>
          </select>

          <label style={labelStyle}>Categoria</label>
          <input style={inputStyle} type="text" placeholder="Ex: Alimentação" value={form.category} onChange={e => handleChange('category', e.target.value)} />

          <label style={labelStyle}>Data</label>
          <input style={inputStyle} type="date" value={form.date} onChange={e => handleChange('date', e.target.value)} />

          <Button label={isSubmitting ? 'Criando...' : 'Criar Transação'} onClick={handleSubmit} variant="primary" disabled={isSubmitting} />
        </div>
      </Modal>
    </div>
  );
}