import React from "react";
import styled from "styled-components";

const FooterInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 10px;
  background: #ebf1f5;
  text-align: center;
`;

const SiteFooter = () => {
  return (
    <footer>
      <FooterInner>
        <h2>Footda</h2>
        <p className="copyright">ⓒ 2023. Seonmin Choe All rights reserved</p>
      </FooterInner>
    </footer>
  );
}

export default SiteFooter;