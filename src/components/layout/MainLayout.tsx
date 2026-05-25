import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import { lightTheme, darkTheme } from '../../styles/theme';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const { theme } = useTheme();
  const colors = theme === 'light' ? lightTheme : darkTheme;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: colors.background }}>
      <Sidebar />
      <main
        role="main"
        style={{
          flex: 1,
          backgroundColor: colors.background,
          padding: '2rem',
          overflowY: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  );
}