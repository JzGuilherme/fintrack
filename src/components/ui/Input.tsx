interface InputProps {
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'date';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export function Input({ label, type, value, onChange, placeholder, error }: InputProps) {
  const inputId = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '1rem' }}>
      <label htmlFor={inputId} style={{ fontSize: '14px', fontWeight: 500, color: '#374151' }}>
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        aria-describedby={error ? `${inputId}-error` : undefined}
        style={{
          padding: '8px 12px',
          borderRadius: '8px',
          border: error ? '1px solid #ef4444' : '1px solid #d1d5db',
          fontSize: '14px',
          outline: 'none',
        }}
      />
      {error && (
        <span id={`${inputId}-error`} style={{ fontSize: '12px', color: '#ef4444' }}>
          {error}
        </span>
      )}
    </div>
  );
}