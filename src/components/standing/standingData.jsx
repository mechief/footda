import React from "react";

import { useStanding } from "../../hooks/standing/useStanding";

import StandingTable from "./standingTable";

const StandingData = ({ leagueId }) => {
  const [ standings, orderType, setOrderType ] = useStanding(leagueId);

  return (
    <StandingTable 
      standings={standings}
      leagueId={leagueId}
      orderType={orderType}
      setOrderType={setOrderType}
    />
  );
}

export default StandingData;