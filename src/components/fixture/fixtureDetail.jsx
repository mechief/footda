import React, { useState } from "react";
import styled, { css } from "styled-components";

import FixtureDetailPreview from "./fixtureDetailPreview";
import FixtureDetailEvent from "./fixtureDetailEvent";

const FixtureDetail = ({ fixtureStatus }) => {
  // const [tab, setTab] = useState(fixtureStatus >= 0 ? 1 : 0);
  const [tab, setTab] = useState(1);

  const onClickTab = (tabNum) => {
    setTab(tabNum);
  }

  return (
    <FixtureDetailWrapper>
      <FixtureDetailTabController>
        {/* <FixtureDetailTabButton onClick={() => onClickTab(0)} active={tab === 0}>경기 프리뷰</FixtureDetailTabButton> */}
        <FixtureDetailTabButton onClick={() => onClickTab(1)} active={tab === 1}>경기 요약</FixtureDetailTabButton>
        {/* <FixtureDetailTabButton onClick={() => onClickTab(2)} active={tab === 2}>경기 통계</FixtureDetailTabButton> */}
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

const FixtureDetailWrapper = styled.div`
  width: 500px;
  margin: 0 20px;
  box-shadow: 0 0 8px rgba(0, 0, 0, .08);
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
  cursor: default;
  ${props => props.active && css`
    background: #5f9ea0;
  `}
`;

const FixtureDetailTabContent = styled.div`
  overflow-y: auto;
  height: calc(100% - 36px);
  min-height: 520px;
  background: #fff;
`;

export default FixtureDetail;