import React, { useState, useEffect } from "react";
import { useParams, useLoaderData } from "react-router-dom";

import { getStandings } from "../apiFootball/standings";
import { getLeagueRule } from "../service/apiFootballService";

import StandingLeagues from "../components/standing/standingLeagues";
import StandingTable from "../components/standing/standingTable";

import {
  StandingWrapper,
  StandingTitle,
} from "../components/standing/standingStyled";

const Standing = () => {
  const leagueId = useParams().id ?? 39; // 기본값: 프리미어리그
  const standingData = useLoaderData();
  const [standings, setStandings] = useState(standingData.league.standings[0]);
  const [orderType, setOrderType] = useState('rank asc');
  const leagueRule = getLeagueRule(leagueId);

  console.log(standings);

  useEffect(() => {
    setOrderType('rank asc');
    setStandings(standingData.league.standings[0]);
  }, [standingData]);

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
        return getColumnDataFromTeamData(orderData, a) - getColumnDataFromTeamData(orderData, b)
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

  return (
    <StandingWrapper>
      <StandingTitle>순위</StandingTitle>
      <StandingLeagues />
      <StandingTable 
        standings={standings}
        leagueId={leagueId}
        orderType={orderType}
        setOrderType={setOrderType}
        leagueRule={leagueRule}
      />
    </StandingWrapper>
  );
}

export const standingLoader = async ({ params }) => {
  const id = params.id ?? 39; // 기본값: 프리미어리그
  return await getStandings(id);
}

export default Standing;