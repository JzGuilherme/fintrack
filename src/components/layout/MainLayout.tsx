import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh' }}>
      <Sidebar />
      <main
        role="main"
        style={{
          marginLeft: '240px',
          flex: 1,
          backgroundColor: '#f4f6f9',
          padding: '2rem',
          overflowY: 'auto',
        }}
      >
        {children}
      </main>
    </div>
  );
}