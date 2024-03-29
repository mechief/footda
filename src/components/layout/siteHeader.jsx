import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";

import SiteHeaderNavLi from "./siteHeaderNavLi";

const SiteHeader = () => {
  return (
    <StyledHeader>
      <HeaderInner>
        <HeaderLogo>
          <Link to={'/'}>Footda</Link>
        </HeaderLogo>
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
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  padding: 0 10px;
  border-bottom: 1px solid #ddd;
  background: #fafafa;
`;

const HeaderInner = styled.div`
  display: flex;
  position: relative;
  max-width: 1320px;
  margin: 0 auto;
  padding: 10px 0;
  justify-content: space-between;
`;

const HeaderLogo = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const HeaderNav = styled.nav`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;

const HeaderNavUl = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  gap: 0 12px;
`;

export default SiteHeader;