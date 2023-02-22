import React, { useState } from "react";
import { useQuery } from "react-query";

import { getTopPlayers } from "../../apiFootball/topPlayers"

import TopPlayerSummaryList from "./topPlayerSummaryList";
import TopPlayerTable from "./topPlayerTable";

import { TopPlayerSummaryWrapper } from "./topPlayerStyled";

const queryConfig = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 5,
  suspense: true,
}

const topPlayersQuery = (leagueId) => ({
  queryKey: ['topPlayers', leagueId],
  queryFn: async () => getTopPlayers(leagueId),
  ...queryConfig,
});

const TopPlayerData = ({ leagueId }) => {
  const { data } = useQuery(topPlayersQuery(leagueId)); // 기본값: 프리미어 리그
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