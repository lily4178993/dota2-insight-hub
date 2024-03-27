import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../components';

function AppLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
