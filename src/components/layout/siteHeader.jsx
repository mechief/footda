import React from "react";
import styled from "styled-components";

import SiteHeaderNavLi from "./siteHeaderNavLi";

const HeaderInner = styled.div`
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    justify-content: space-between;
`;
const HeaderNav = styled.nav``;
const HeaderUl = styled.nav`
    display: flex;
    flex-wrap: nowrap;
`;

const SiteHeader = () => {
    return (
        <header>
            <HeaderInner>
                <h1>Footda</h1>
                <HeaderNav>
                    <HeaderUl>
                        <SiteHeaderNavLi link="/" name="메인" />
                        <SiteHeaderNavLi link="/mypage" name="마이페이지" />
                    </HeaderUl>
                </HeaderNav>
            </HeaderInner>
        </header>
    );
}

export default SiteHeader;