import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getStandings } from "../../api/standings";

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

// 기본값: 프리미어 리그
const useStanding = (leagueId) => {
  const { data } = useQuery({
    queryKey: ['standing', leagueId],
    queryFn: async () => getStandings(leagueId),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
    suspense: true,
  });

  const [orderType, setOrderType] = useState('rank asc');

  useEffect(() => {
    setOrderType('rank asc');
  }, [data]);

  const standings = useMemo(() => {
    if (!data) {
      return [];
    }

    const [orderData, orderDirection] = orderType.split(' ');

    const newStandings = data.slice().sort((a, b) => a.rank - b.rank);

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

    return newStandings;
  }, [data, orderType]);

  return [standings, orderType, setOrderType];
}

export default useStanding;