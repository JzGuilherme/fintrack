interface BadgeProps {
  label: string;
  variant: 'success' | 'danger' | 'warning' | 'info';
}

const colors = {
  success: { background: '#dcfce7', color: '#16a34a' },
  danger: { background: '#fee2e2', color: '#dc2626' },
  warning: { background: '#fef9c3', color: '#ca8a04' },
  info: { background: '#dbeafe', color: '#2563eb' },
};

export function Badge({ label, variant }: BadgeProps) {
  return (
    <span style={{
      ...colors[variant],
      padding: '2px 10px',
      borderRadius: '999px',
      fontSize: '12px',
      fontWeight: 500,
    }}>
      {label}
    </span>
  );
}