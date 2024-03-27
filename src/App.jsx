/* eslint-disable object-curly-newline */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AboutMe, Details, DetailsItem, Home, References } from './pages';
import AppLayout from './pages/layouts/AppLayout';

const routesList = [
  { path: '/', element: <Home /> },
  { path: '/details/:detailsListName', element: <Details /> },
  {
    path: '/details/:detailsListName/:detailsItemID',
    element: <DetailsItem />,
  },
  { path: '/aboutme', element: <AboutMe /> },
  { path: '/references', element: <References /> },
];

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {routesList.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={element}
          />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
