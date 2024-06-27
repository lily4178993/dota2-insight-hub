/* eslint-disable object-curly-newline */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { register } from 'swiper/element/bundle';
import { AboutMe, Details, DetailsItem, Home, References } from './pages';
import AppLayout from './pages/layouts/AppLayout';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// register Swiper custom elements
register();

const routesList = [
  { path: '/', element: <Home /> },
  { path: '/:detailsListName', element: <Details /> },
  {
    path: '/:detailsListName/:detailsItemID',
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
