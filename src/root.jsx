import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store/store';

import SiteWrapper from './components/layout/SiteWrapper';
import SiteHeader from './components/layout/siteHeader';
import SiteContents from './components/layout/siteContents';
import SiteFooter from './components/layout/siteFooter';

const Root = ({ queryClient }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SiteWrapper>
            <SiteHeader />
            <SiteContents>
              <Outlet />
            </SiteContents>
            <SiteFooter />
          </SiteWrapper>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default Root;