import React from "react";
import styled from "styled-components";

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px 10px;
  background: #ebf1f5;
  text-align: center;
`;

const FooterLogo = styled.h2`
  font-size: 18px;
`;

const Copyright = styled.p`
  font-size: 13px;
`

const SiteFooter = () => {
  return (
    <footer>
      <FooterInner>
        <FooterLogo>Footda</FooterLogo>
        <Copyright>ⓒ 2023. Seonmin Choe All rights reserved</Copyright>
      </FooterInner>
    </footer>
  );
}

export default SiteFooter;