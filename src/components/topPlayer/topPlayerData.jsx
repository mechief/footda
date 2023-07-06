import React, { useState } from "react";

import useTopPlayer from "../../hooks/topPlayer/useTopPlayer";

import TopPlayerSummaryList from "./topPlayerSummaryList";
import TopPlayerTable from "./topPlayerTable";

import { TopPlayerSummaryWrapper } from "./topPlayerStyled";

const TopPlayerData = ({ leagueId }) => {
  const { data } = useTopPlayer(leagueId);
  const [orderData, setOrderData] = useState('goals');

  return (
    <>
      { data && 
        <>
          <TopPlayerSummaryWrapper>
            <TopPlayerSummaryList key='summary_goal' listData={data[0]} type='goals' />
            <TopPlayerSummaryList key='summary_assist' listData={data[1]} type='assists' />
          </TopPlayerSummaryWrapper>
          <TopPlayerTable 
            playersData={orderData === 'goals' ? data[0] : data[1]}
            orderData={orderData}
            setOrderData={setOrderData}
          />
        </>
      }
    </>
  );
}

export default TopPlayerData;