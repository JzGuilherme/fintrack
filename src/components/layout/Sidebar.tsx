import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export function Sidebar() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const sidebarBg = theme === 'light' ? '#1e1e2e' : '#13131f';

  const navLinkStyle = {
    display: 'block',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    color: '#a0a0b0',
    textDecoration: 'none',
    fontSize: '0.95rem',
    marginBottom: '4px',
  };

  const activeStyle = {
    ...navLinkStyle,
    backgroundColor: '#7c3aed',
    color: '#fff',
    fontWeight: 500,
  };

  const buttonStyle = {
    background: 'none',
    border: '1px solid #3a3a4e',
    color: '#a0a0b0',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    textAlign: 'left' as const,
    width: '100%',
    marginBottom: '8px',
  };

  return (
    <aside style={{
      width: '240px',
      minHeight: '100vh',
      backgroundColor: sidebarBg,
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem 1rem',
      gap: '0.5rem',
    }} aria-label="Menu principal">

      <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', padding: '0.5rem', marginBottom: '1rem' }}>
        💰 Fintrack
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <NavLink to="/dashboard" style={({ isActive }) => isActive ? activeStyle : navLinkStyle}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/transactions" style={({ isActive }) => isActive ? activeStyle : navLinkStyle}>
          📋 Transações
        </NavLink>
        <NavLink to="/metrics" style={({ isActive }) => isActive ? activeStyle : navLinkStyle}>
          📈 Métricas
        </NavLink>
        <NavLink to="/goals" style={({ isActive }) => isActive ? activeStyle : navLinkStyle}>
          🎯 Metas
        </NavLink>
      </nav>

      <button style={buttonStyle} onClick={toggleTheme}>
        {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
      </button>

      <button style={buttonStyle} onClick={handleLogout}>
        🚪 Sair
      </button>
    </aside>
  );
}