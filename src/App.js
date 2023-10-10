import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages';
import { Header } from './components';

const App = () => (
  <>
    <Header />
    <main>
      <Routes>
        <Route
          exact
          path="/"
          element={<Home />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
      </Routes>
    </main>
  </>
);

export default App;
