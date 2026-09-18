import React from 'react';
import { Outlet } from 'react-router-dom';
/* import { Footer , Header } from '../../components'; */

function AppLayout() {
  return (
    <div className="appLayout">
      {/* <Header /> */}
      <main>
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default AppLayout;
