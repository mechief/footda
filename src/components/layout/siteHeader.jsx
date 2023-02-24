import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import SiteHeaderNavLi from "./siteHeaderNavLi";

import LiveSidebar from "../liveWidget/LiveSidebar";

const HeaderInner = styled.div`
  display: flex;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 10px;
  background: #d6eaea;
  justify-content: space-between;
`;
const HeaderLogo = styled.h1`
  margin: 0 auto;
`;
const HeaderNav = styled.nav`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
`;

const HeaderNavUl = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  gap: 0 12px;
`;

const SiteHeader = () => {
  const isSidebarOpened = useSelector((state) => state.liveWidget.isSidebarOpened);

  return (
    <header>
      <HeaderInner>
        <HeaderLogo>Footda</HeaderLogo>
        <HeaderNav>
          <HeaderNavUl>
            <SiteHeaderNavLi link="/" name="홈" />
            <SiteHeaderNavLi link="/schedule" name="일정" />
            <SiteHeaderNavLi link="/standing" name="순위" />
            <SiteHeaderNavLi link="/top_players" name="기록" />
            {/* <SiteHeaderNavLi link="/mypage" name="마이페이지" /> */}
          </HeaderNavUl>
        </HeaderNav>
      </HeaderInner>
      { isSidebarOpened &&
        <LiveSidebar />
      }
    </header>
  );
}

export default SiteHeader;