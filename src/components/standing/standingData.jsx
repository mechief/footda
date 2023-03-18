import React, { useState, useEffect, useMemo } from "react";
import { useQuery } from "react-query";

import { getStandings } from "../../apiFootball/standings";
import { getLeagueRule } from "../../service/apiFootballService";

import StandingTable from "./standingTable";

const queryConfig = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 5,
  suspense: true,
}

const standingQuery = (leagueId) => ({
  queryKey: ['standing', leagueId],
  queryFn: async () => getStandings(leagueId),
  ...queryConfig,
});

const StandingData = ({ leagueId }) => {
  const { data } = useQuery(standingQuery(leagueId)); // 기본값: 프리미어 리그

  const [standings, setStandings] = useState(data?.league?.standings[0] ?? []);
  const [orderType, setOrderType] = useState('rank asc');

  const leagueRule = useMemo(() => {
    return getLeagueRule(leagueId);
  }, []);

  useEffect(() => {
    setOrderType('rank asc');
    setStandings(data?.league?.standings[0]);
  }, [data?.league?.standings[0]]);

  useEffect(() => {
    const [orderData, orderDirection] = orderType.split(' ');

    const newStandings = standings.slice().sort((a, b) => a.rank - b.rank);

    // 순서상 자연스러워 보이게 하도록 랭크 이외에서는 오름차순일때 랭크 기준 내림차순 정렬해둠
    if (orderDirection === 'desc' && orderData === 'rank'
        || orderDirection === 'asc' && orderData !== 'rank') {
      newStandings.reverse();
    }

    if (orderData === 'form') {
      newStandings.sort((a, b) => {
        if (orderDirection === 'desc') {
          [b, a] = [a, b];
        }
        return formToScore(a.form) - formToScore(b.form);
      });
    } else if (orderData !== 'rank') {
      newStandings.sort((a, b) => {
        if (orderDirection === 'desc') {
          [b, a] = [a, b];
        }
        return getColumnDataFromTeamData(orderData, a) - getColumnDataFromTeamData(orderData, b);
      });
    }

    setStandings(newStandings);
  }, [orderType]);

  const formToScore = (form) => {
    return form.split('').map((v) => v === 'W' ? 3 : (v === 'D' ? 1 : 0)).reduce((acc, v) => acc + v, 0);
  }

  const getColumnDataFromTeamData = (dataName, teamData) => {
    if (['rank', 'points', 'goalsDiff', 'form'].includes(dataName)) {
      return teamData[dataName];
    } else if (['played', 'win', 'draw', 'lose'].includes(dataName)) {
      return teamData.all[dataName];
    } else if (['goalsFor', 'goalsAgainst'].includes(dataName)) {
      return teamData.all.goals[dataName === 'goalsFor' ? 'for' : 'against'];
    }
    return null;
  }

  /*
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>순위를 불러오는 중 에러가 발생했습니다.</div>;
  }
  */

  return (
    <StandingTable 
      standings={standings}
      leagueId={leagueId}
      orderType={orderType}
      setOrderType={setOrderType}
      leagueRule={leagueRule}
    />
  );
}

export default StandingData;