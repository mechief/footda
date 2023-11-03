import React from "react";
import styled from "styled-components";

const SiteFooter = () => {
  return (
    <footer>
      <FooterInner>
        <FooterLogo>Footda</FooterLogo>
        <Copyright>ⓒ 2023. Seonmin Choe</Copyright>
      </FooterInner>
    </footer>
  );
}

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
  background: #ebf1f5;
  text-align: center;
`;

const FooterLogo = styled.h2`
  font-size: 18px;
  font-weight: 500;
`;

const Copyright = styled.p`
  font-size: 13px;
`

export default SiteFooter;
