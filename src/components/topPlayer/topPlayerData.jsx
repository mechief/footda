import React, { useState } from "react";
import styled from "styled-components";

import useTopPlayer from "../../hooks/topPlayer/useTopPlayer";

import TopPlayerSummaryList from "./topPlayerSummaryList";
import TopPlayerTable from "./topPlayerTable";

const TopPlayerData = ({ leagueId }) => {
  const { data } = useTopPlayer(leagueId);
  const [orderData, setOrderData] = useState('goals');

  return (
    <>
      { data && 
        <>
          <TopPlayerSummaryWrapper>
            <TopPlayerSummaryList key='summary_goal' listData={data?.scorers} type='goals' />
            <TopPlayerSummaryList key='summary_assist' listData={data?.assists} type='assists' />
          </TopPlayerSummaryWrapper>
          <TopPlayerTable 
            playersData={orderData === 'goals' ? data?.scorers : data?.assists}
            orderData={orderData}
            setOrderData={setOrderData}
          />
        </>
      }
    </>
  );
}

const TopPlayerSummaryWrapper = styled.div`
  display: flex;
  gap: 0 40px;
  justify-content: space-between;
  max-width: 720px;
  margin: 0 auto 40px;
`;

export default TopPlayerData;