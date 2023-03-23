import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ContentsBasic = styled.div`
  max-width: 1200px;
  min-height: calc(100vh - 56px - 65px);
  margin: 56px auto 0;
  padding: 0 20px;
  box-sizing: content-box;
`;

const ContentsFull = styled.div`
  min-height: calc(100vh - 56px - 65px);
  margin: 56px auto 0;
  background: #f5f5f5;
`;

const ContentsFullInner = styled.div`
  max-width: 1920px;
`;

const SiteContents = ({ children }) => {
  const location = useLocation();

  return (
    <>
      { location.pathname.startsWith('/fixture')
        ? <ContentsFull>
            <ContentsFullInner>{children}</ContentsFullInner>
          </ContentsFull>
        : <ContentsBasic>{children}</ContentsBasic>
      }
    </>
  )
}

export default SiteContents;