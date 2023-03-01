import React, { memo } from "react";
import styled from "styled-components";

import ScheduleCalendarCountItem from "./scheduleCalendarCountItem";

const StyledTd = styled.td`
  height: 60px;
  padding: 4px 4px 2px;
  vertical-align: top;
  background: ${props => props.isFocusDate ? '#eedfe4' : '#f1f1f1'};
  
`;
  
const DateText = styled.div`
  margin-bottom: 5px;
  line-height: 1;
  font-size: 12px;
  color: ${props => props.isCurrentMonth ? '#555' : '#ccc' };
`;

const ScheduleCalendarTd = memo(({ dateObj, isCurrentMonth, countArr, focusDate }) => {
  return (
    <StyledTd isFocusDate={dateObj.format('YYYY-MM-DD') === focusDate}>
      <DateText isCurrentMonth={isCurrentMonth}>{dateObj.format('D')}</DateText>
      { countArr.sort((a, b) => a.id - b.id).map(countData => 
        <ScheduleCalendarCountItem key={`scheduleCountItem_${dateObj.format('YYYY-MM-DD')}_${countData.id}`} countData={countData} />
      )}
    </StyledTd>
  );
});

export default ScheduleCalendarTd;