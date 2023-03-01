import React from "react";
import styled from "styled-components";

import ScheduleCalendar from "./scheduleCalendar";
import ScheduleLeagueFilter from "./scheduleLeagueFilter";

const StyledCalendarSection = styled.div`
  width: 60%;
`;

const ScheduleCalendarSection = ({ focusDate }) => {
  return (
    <StyledCalendarSection>
      <ScheduleCalendar focusDate={focusDate} />
      <ScheduleLeagueFilter />
    </StyledCalendarSection>
  );
}

export default ScheduleCalendarSection;