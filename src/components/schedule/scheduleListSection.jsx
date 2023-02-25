import React, { useMemo } from "react";
import styled from "styled-components";

import ScheduleList from "./scheduleList";

const ListContainer = styled.div`
  width: calc(50% - 60px);
`;

const ScheduleListSection = ({ fixturesData }) => {
  const dateKeys = useMemo(() => {
    return Object.keys(fixturesData);
  }, [fixturesData]);

  return (
    <ListContainer>
    { dateKeys.length > 0 
      && dateKeys.map((date) => 
      <ScheduleList key={`schedule_week_${date}`} fixtures={fixturesData[date]} date={date} />
    )}
    </ListContainer>
  );
}

export default ScheduleListSection;