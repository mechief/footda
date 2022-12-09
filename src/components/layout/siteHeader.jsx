import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import SiteHeaderNavLi from "./siteHeaderNavLi";

import LiveSidebar from "../liveWidget/LiveSidebar";

const HeaderInner = styled.div`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 10px;
  background: #e5caab;
  justify-content: space-between;
`;
const HeaderLogo = styled.h1`
  margin: 0 auto;
`;
const HeaderNav = styled.nav``;
const HeaderUl = styled.nav`
  display: flex;
  flex-wrap: nowrap;
`;

const SiteHeader = () => {
  const sidebarOpened = useSelector((state) => state.liveWidget.sidebarOpened);

  return (
    <header>
      <HeaderInner>
        <HeaderLogo>Footda</HeaderLogo>
        <HeaderNav>
          <HeaderUl>
            {/* <SiteHeaderNavLi link="/" name="메인" /> */}
            {/* <SiteHeaderNavLi link="/mypage" name="마이페이지" /> */}
          </HeaderUl>
        </HeaderNav>
      </HeaderInner>
      { sidebarOpened &&
        <LiveSidebar />
      }
    </header>
  );
}

export default SiteHeader;