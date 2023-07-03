import React, { memo } from "react";
import styled from "styled-components";

import { getLeagueNameForList } from "../../utils/league";

const StyledCountItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1px;
  padding: 1px 2px;
  background: #fdf8e8;
  font-size: 11px;
  border-radius: 2px;
  color: #222;
`;

const LeagueName = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Count = styled.span`
  padding-left: 4px;
  flex: 0 0 auto;
`;

const ScheduleCalendarCountItem = memo(({ countData }) => {
  return (
    <StyledCountItem>
      <LeagueName>{getLeagueNameForList(countData.id)}</LeagueName>
      <Count>{countData.count}</Count>
    </StyledCountItem>
  );
});

export default ScheduleCalendarCountItem;