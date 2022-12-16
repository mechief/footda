import React, { useState, useEffect, useRef } from "react";
import { useParams, useLoaderData } from "react-router-dom";

import { getStandings } from "../apiFootball/standings";
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

  console.log(standings);

  useEffect(() => {
    setStandings(standingData.league.standings[0]);
  }, [standingData]);

  return (
    <StandingWrapper>
      <StandingTitle>순위</StandingTitle>
      <StandingLeagues />
      <StandingTable standings={standings} leagueId={leagueId} orderType={orderType} />
    </StandingWrapper>
  );
}

export const standingLoader = async ({ params }) => {
  const id = params.id ?? 39; // 기본값: 프리미어리그
  console.log('Standing loader working... / id: ' + id);
  return await getStandings(id);
}

export default Standing;