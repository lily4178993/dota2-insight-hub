import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  AboutMe, Details, DetailsItem, Home,
} from './pages';
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
        <Route
          path="/details/:detailsListName"
          element={<Details />}
        />
        <Route
          path="/details/:detailsListName/:detailsItemID"
          element={<DetailsItem />}
        />
        <Route
          path="/aboutme"
          element={<AboutMe />}
        />
      </Routes>
    </main>
  </>
);

export default App;
