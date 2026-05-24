import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <aside className={styles.sidebar} aria-label="Menu principal">
      <div className={styles.sidebarLogo}>
        <span>💰 Fintrack</span>
      </div>

      <nav className={styles.sidebarNav}>
        <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}>
          📋 Transações
        </NavLink>
        <NavLink to="/metrics" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}>
          📈 Métricas
        </NavLink>
        <NavLink to="/goals" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}>
          🎯 Metas
        </NavLink>
      </nav>

      <button className={styles.sidebarLogout} onClick={handleLogout}>
        🚪 Sair
      </button>
    </aside>
  );
}