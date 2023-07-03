import React from 'react';
import { Outlet } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store/store';

import SiteWrapper from './components/layout/siteWrapper';
import SiteHeader from './components/layout/siteHeader';
import SiteContents from './components/layout/siteContents';
import SiteFooter from './components/layout/siteFooter';

import withCommonLogic from './service/withCommonLogic';

const SiteWrapperWithCommonLogic = withCommonLogic(SiteWrapper);

const Root = ({ queryClient }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SiteWrapperWithCommonLogic>
            <SiteHeader />
            <SiteContents>
              <Outlet />
            </SiteContents>
            <SiteFooter />
          </SiteWrapperWithCommonLogic>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default Root;