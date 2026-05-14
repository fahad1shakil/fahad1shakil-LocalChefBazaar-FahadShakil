import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Componentes/Header.jsx';
import Footer from '../Componentes/Footer.jsx';
import AIChatbot from '../components/AIChatbot/AIChatbot.jsx';
import ScrollToTop from '../components/ScrollToTop.jsx';

const Root = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <br />
      <br />
      <br />
      <br />
      <Outlet />
      <br />
      <br />
      <Footer />
      <AIChatbot />
    </div>
  );
};

export default Root;
