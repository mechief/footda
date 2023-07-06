import React, { useMemo } from "react";
import styled from "styled-components";

import { getServiceLeagueIds }from "../../utils/league"

import ScheduleLeagueFilterButton from "./scheduleLeagueFilterButton";

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

const StyledLeagueFilter = styled.div`
`;

export default ScheduleLeagueFilter;