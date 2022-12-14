import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './root';
import Home from './pages/home';
import Fixture, { fixtureLoader } from './pages/fixture';
import MyPage from './pages/myPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>에러 엘리먼트</div>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "fixture/:id",
        element: <Fixture />,
        loader: fixtureLoader,
      },
      {
        path: "mypage",
        element: <MyPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.querySelector('#root')).render(
  <RouterProvider router={router} />
);