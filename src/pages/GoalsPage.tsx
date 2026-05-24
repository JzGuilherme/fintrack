import { useState } from 'react';
import { useGoals } from '../hooks/useGoals';
import { createGoal, deleteGoal } from '../services/goals.service';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { formatCurrency } from '../utils/formatCurrency';

interface GoalFormData {
  title: string;
  target: string;
  current: string;
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

export function GoalsPage() {
  const { goals, loading, error, refetch } = useGoals();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<GoalFormData>({ title: '', target: '', current: '0' });

  function handleChange(field: keyof GoalFormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.title || !form.target) return;
    setIsSubmitting(true);
    try {
      await createGoal({
        title: form.title,
        target: parseFloat(form.target),
        current: parseFloat(form.current),
      });
      setIsModalOpen(false);
      setForm({ title: '', target: '', current: '0' });
      refetch();
    } catch (err) {
      console.error('Failed to create goal', err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja deletar esta meta?')) {
      try {
        await deleteGoal(id);
        refetch();
      } catch (err) {
        console.error('Failed to delete goal', err);
      }
    }
  }

  if (loading) return <p style={{ padding: '2rem', color: '#718096' }}>Carregando...</p>;
  if (error) return <p style={{ padding: '2rem', color: '#ef4444' }}>Erro: {error}</p>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#1a202c' }}>Metas</h1>
        <Button label="+ Nova Meta" onClick={() => setIsModalOpen(true)} variant="primary" />
      </div>

      {goals.length === 0 ? (
        <p style={{ color: '#718096', textAlign: 'center', padding: '2rem' }}>Nenhuma meta registrada</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {goals.map((goal) => {
            const percentage = (goal.current / goal.target) * 100;
            const isCompleted = percentage >= 100;
            return (
              <div key={goal.id} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1a202c' }}>{goal.title}</h3>
                  <Button label="Deletar" onClick={() => handleDelete(goal.id)} variant="danger" />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#718096' }}>{formatCurrency(goal.current)} de {formatCurrency(goal.target)}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: isCompleted ? '#22c55e' : '#7c3aed' }}>{Math.min(Math.round(percentage), 100)}%</span>
                </div>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(percentage, 100)}%`, backgroundColor: isCompleted ? '#22c55e' : '#7c3aed', transition: 'width 0.3s ease' }} />
                </div>
                {isCompleted && <p style={{ marginTop: '8px', fontSize: '13px', color: '#22c55e', fontWeight: 600 }}>✓ Meta atingida!</p>}
              </div>
            );
          })}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Nova Meta">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <label style={labelStyle}>Título</label>
          <input style={inputStyle} type="text" placeholder="Ex: Fundo de Emergência" value={form.title} onChange={e => handleChange('title', e.target.value)} />

          <label style={labelStyle}>Valor Alvo</label>
          <input style={inputStyle} type="number" placeholder="0.00" value={form.target} onChange={e => handleChange('target', e.target.value)} />

          <label style={labelStyle}>Valor Atual</label>
          <input style={inputStyle} type="number" placeholder="0.00" value={form.current} onChange={e => handleChange('current', e.target.value)} />

          <Button label={isSubmitting ? 'Criando...' : 'Criar Meta'} onClick={handleSubmit} variant="primary" disabled={isSubmitting} />
        </div>
      </Modal>
    </div>
  );
}