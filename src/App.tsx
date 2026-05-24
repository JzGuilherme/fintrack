import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from './components/layout/PrivateRoute';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TransactionsPage } from './pages/TransactionsPage';
import { MetricsPage } from './pages/MetricsPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard" element={
        <PrivateRoute>
          <MainLayout>
            <DashboardPage />
          </MainLayout>
        </PrivateRoute>
      } />

      <Route path="/transactions" element={
        <PrivateRoute>
          <MainLayout>
            <TransactionsPage />
          </MainLayout>
        </PrivateRoute>
      } />

      <Route path="/metrics" element={
        <PrivateRoute>
          <MainLayout>
            <MetricsPage />
          </MainLayout>
        </PrivateRoute>
      } />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;