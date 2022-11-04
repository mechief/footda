import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';

import SiteHeader from './components/layout/siteHeader';
import SiteFooter from './components/layout/siteFooter';

import Home from './pages/home';
import MyPage from './pages/myPage';
import Fixture from './pages/fixture';

const Main = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SiteHeader></SiteHeader>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/mypage" element={<MyPage />}></Route>
          <Route path="/fixture/:id" element={<Fixture />}></Route>
        </Routes>
        <SiteFooter></SiteFooter>
      </BrowserRouter>
    </Provider>
  );
}

export default Main;