import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Componentes/Header.jsx';
import Footer from '../Componentes/Footer.jsx';
import AIChatbot from '../components/AIChatbot/AIChatbot.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';
import CulinaryBackground from '../components/CulinaryBackground.jsx';
import FloatingElements from '../components/FloatingElements.jsx';
import { Toaster } from 'react-hot-toast';

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#121212] text-slate-900 dark:text-slate-200 transition-colors duration-300">
      <Toaster position="top-right" />
      <CulinaryBackground />
      <FloatingElements />
      <ScrollToTop />
      <Header />
      <div className="h-[2px] w-full bg-[#3d6e25] opacity-30 hidden dark:block"></div>
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Root;
