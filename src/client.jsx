import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient } from 'react-query'

import RootErrorBoundary from './errors/route/rootErrorBoundary';

import Root from './root';
import Home from './pages/home';
import Fixture from './pages/fixture';
import Schedule from './pages/schedule';
import Standing from './pages/standing';
import TopPlayers from './pages/topPlayers';
import MyPage from './pages/myPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      useErrorBoundary: true,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root queryClient={queryClient} />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "fixture/:id",
        element: <Fixture />,
      },
      {
        path: "schedule",
        children: [
          {
            index: true,
            element: <Schedule />,
          },
          {
            path: ":date",
            element: <Schedule />,
          }
        ],
      },
      {
        path: "standing",
        children: [
          {
            index: true,
            element: <Standing />,
          },
          {
            path: ":id",
            element: <Standing />,
          }
        ],
      },
      {
        path: "top_players",
        children: [
          {
            index: true,
            element: <TopPlayers />,
          },
          {
            path: ":id",
            element: <TopPlayers />,
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