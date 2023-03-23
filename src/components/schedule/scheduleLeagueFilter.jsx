import React, { useMemo } from "react";
import styled from "styled-components";

import { getServiceLeagueIds }from "../../service/apiFootballService"

import ScheduleLeagueFilterButton from "./scheduleLeagueFilterButton";

const StyledLeagueFilter = styled.div`
`;

const ScheduleLeagueFilter = () => {
  const leagueIds = useMemo(() => {
    return getServiceLeagueIds();
  }, []);

  return (
    <StyledLeagueFilter>
      <ScheduleLeagueFilterButton key={`league_filter_all`} leagueId='all' />
      { leagueIds.map((leagueId) => 
        <ScheduleLeagueFilterButton key={`league_filter_${leagueId}`} leagueId={leagueId} />
      )}
    </StyledLeagueFilter>
  );
}

export default ScheduleLeagueFilter;