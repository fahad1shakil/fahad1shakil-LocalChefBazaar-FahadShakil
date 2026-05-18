import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import UserAside from '../../Componentes/Asideber/UserAside';
import Loading from '../../Componentes/Loading';

const DashboardLayout = () => {
  const { user, role, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr] bg-gray-50 dark:bg-[#0f0f0f] transition-colors duration-300">
      <title>LocalChefBazaar || Dashboard</title>
      
      {/* Sidebar */}
      <aside className="border-r border-gray-200 dark:border-[#242424] dark:border-[0.5px] bg-white dark:bg-[#111111] sticky top-0 h-screen hidden lg:block shadow-lg">
        <UserAside />
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <UserAside />
      </div>

      {/* Main Content */}
      <main className="p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Ensure role is loaded before rendering children to prevent logic errors in sub-pages */}
          {loading ? <Loading /> : <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
