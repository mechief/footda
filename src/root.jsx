import React from 'react';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import SiteWrapper from './components/layout/SiteWrapper';
import SiteHeader from './components/layout/siteHeader';
import SiteContents from './components/layout/siteContents';
import SiteFooter from './components/layout/siteFooter';

const Root = () => {
  return (
    <Provider store={store}>
      <SiteWrapper>
        <SiteHeader />
        <SiteContents>
          <Outlet />
        </SiteContents>
        <SiteFooter />
      </SiteWrapper>
    </Provider>
  );
}

export default Root;