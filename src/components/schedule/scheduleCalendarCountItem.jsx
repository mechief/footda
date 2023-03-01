import React, { memo } from "react";
import styled from "styled-components";

import { getLeagueNameForList, getLeagueColor } from "../../service/apiFootballService";

const hexToRGB = (hex, alpha) => {
  var r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
      return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
      return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

const StyledCountItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1px;
  padding: 1px 2px;
  background: #f0ebd9;
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
    <StyledCountItem bg={getLeagueColor(countData.id)}>
      <LeagueName>{getLeagueNameForList(countData.id)}</LeagueName>
      <Count>{countData.count}</Count>
    </StyledCountItem>
  );
});

export default ScheduleCalendarCountItem;