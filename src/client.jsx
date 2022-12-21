import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './root';
import Home from './pages/home';
import Fixture, { fixtureLoader } from './pages/fixture';
import Standing, { standingLoader } from './pages/standing';
import TopPlayer, { topPlayerLoader } from './pages/topPlayer';
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
        path: "standing",
        children: [
          {
            index: true,
            element: <Standing />,
            loader: standingLoader,
          },
          {
            path: ":id",
            element: <Standing />,
            loader: standingLoader,
          }
        ],
      },
      {
        path: "top_player",
        children: [
          {
            index: true,
            element: <TopPlayer />,
            loader: topPlayerLoader,
          },
          {
            path: ":id",
            element: <TopPlayer />,
            loader: topPlayerLoader,
          }
        ],
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