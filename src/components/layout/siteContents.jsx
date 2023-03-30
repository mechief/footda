import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const ContentsBasic = styled.div`
  max-width: 1320px;
  min-height: calc(100vh - 56px - 65px);
  margin: 56px auto 0;
  padding: 0 20px;
  box-sizing: content-box;
`;

const ContentsFull = styled.div`
  min-height: calc(100vh - 56px - 65px);
  margin: 56px auto 0;
  background: #ebebeb;
`;

const ContentsFullInner = styled.div`
  max-width: 1920px;
`;

const ContentsFullHeight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 1320px;
  height: calc(100vh - 56px - 65px);
  margin: 56px auto 0;
  padding: 0 20px;
  box-sizing: content-box;
`;

const ContentsStretch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 1320px;
  min-height: calc(100vh - 56px - 65px);
  margin: 56px auto 0;
  padding: 0 20px;
  box-sizing: content-box;
`;

const fullPages = ['fixture'];

const fullHeightPages = ['schedule'];

const SiteContents = ({ children }) => {
  const location = useLocation();

  const renderByType = (children) => {
    const splited = location.pathname.split('/');
    
    if (splited[1] && fullPages.includes(splited[1])) {
      return <ContentsFull>
        <ContentsFullInner>{children}</ContentsFullInner>
      </ContentsFull>;
    }
    
    if (splited[1] && fullHeightPages.includes(splited[1])) {
      return <ContentsFullHeight>{children}</ContentsFullHeight>;
    }

    // if (splited[1] && stretchPages.includes(splited[1])) {
    //   return <ContentsStretch>{children}</ContentsStretch>;
    // }
    
    return <ContentsBasic>{children}</ContentsBasic>;
  }

  return (
    <>{renderByType(children)}</>
  )
}

export default SiteContents;