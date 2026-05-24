interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  'aria-label'?: string;
}

export function Button({
  label,
  onClick,
  variant = 'primary',
  disabled = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const baseStyles: React.CSSProperties = {
    padding: '10px 16px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '6px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.6 : 1,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#7c3aed',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: '#7c3aed',
      border: '1px solid #7c3aed',
    },
    danger: {
      backgroundColor: '#ef4444',
      color: '#ffffff',
    },
  };

  const buttonStyle = { ...baseStyles, ...variantStyles[variant] };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={buttonStyle}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.8';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
      aria-label={ariaLabel}
    >
      {label}
    </button>
  );
}
