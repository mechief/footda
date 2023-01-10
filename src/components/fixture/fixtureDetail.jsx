import React, { useState } from "react";
import styled, { css } from "styled-components";

import FixtureDetailPreview from "./fixtureDetailPreview";
import FixtureDetailEvent from "./fixtureDetailEvent";

const FixtureDetailWrapper = styled.div`
  width: 500px;
`;

const FixtureDetailTabController = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0 1px;
`;

const FixtureDetailTabButton = styled.button`
  flex: 1 1 auto;
  height: 36px;
  border: none;
  background: #8cb8b9;
  color: #fff;
  ${props => props.active && css`
    background: #5f9ea0;
  `}
`;

const FixtureDetailTabContent = styled.div`
  overflow-y: auto;
  height: 400px;
  background: #e5e5e5;
`;

const FixtureDetail = ({ fixtureStatus }) => {
  const [tab, setTab] = useState(fixtureStatus >= 0 ? 1 : 0);

  const onClickTab = (tabNum) => {
    setTab(tabNum);
  }

  return (
    <FixtureDetailWrapper>
      <FixtureDetailTabController>
        <FixtureDetailTabButton onClick={() => onClickTab(0)} active={tab === 0}>경기 프리뷰</FixtureDetailTabButton>
        <FixtureDetailTabButton onClick={() => onClickTab(1)} active={tab === 1}>경기 요약</FixtureDetailTabButton>
        <FixtureDetailTabButton onClick={() => onClickTab(2)} active={tab === 2}>경기 통계</FixtureDetailTabButton>
      </FixtureDetailTabController>
      <FixtureDetailTabContent>
        { tab === 0 &&
          <FixtureDetailPreview />
        }
        { tab === 1 &&
          <FixtureDetailEvent />
        }
      </FixtureDetailTabContent>
    </FixtureDetailWrapper>
  );
};

export default FixtureDetail;