import React from "react";
import styled from "styled-components";

import TopPlayerSummaryItem from "./topPlayerSummaryItem";

const SummaryListWrapper = styled.div`
  flex: 1 0 calc(50% - 20px);
`;

const SummaryTitle = styled.h3`
  margin-bottom: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
`; 

const SummaryList = styled.ul`
  padding: 12px 16px;
  border: 1px solid #e5e5e5;
  background: #eee;
  border-radius: 4px;
`;

const TopPlayerSummaryList = ({ listData, type }) => {
  return (
    <>
      <SummaryListWrapper>
        <SummaryTitle>{type === 'goals' ? '득점' : '도움'} TOP 5</SummaryTitle>
        <SummaryList>
          { listData.slice(0, 5).map((item) => 
            <TopPlayerSummaryItem key={`summary_${type}_${item.player.id}`} data={item} type={type} />
          )}
        </SummaryList>
      </SummaryListWrapper>
    </>
  );
}

export default TopPlayerSummaryList;