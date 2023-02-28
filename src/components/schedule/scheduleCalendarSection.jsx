import React from "react";
import styled from "styled-components";

import ScheduleLeagueFilter from "./scheduleLeagueFilter";

const StyledCalendarSection = styled.div`
  width: 50%;
`;

const CalendarContainer = styled.div`
  height: 400px;
  background: #e9eff1;
`;

const ScheduleCalendarSection = () => {
  return (
    <StyledCalendarSection>
      <CalendarContainer />
      <ScheduleLeagueFilter />
    </StyledCalendarSection>
  );
}

export default ScheduleCalendarSection;