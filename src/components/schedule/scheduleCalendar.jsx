import React, { memo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { useScheduleCounts } from "../../hooks/schedule/useScheduleCounts";

import ScheduleCalendarTr from "./scheduleCalendarTr";

const CalendarTable = styled.table`
  overflow: hidden;
  width: 100%;
  table-layout: fixed;
  border-radius: 8px;
  border-spacing: 1px;
  border-collapse: separate;
`;

const ScheduleCalendar = memo(({ focusDate }) => {
  const dayjsObj = dayjs(focusDate);
  const currentMonth = dayjsObj.month();
  
  const { data, isLoading, isError, error } = useScheduleCounts(dayjsObj);
  
  const firstSunday = dayjsObj.date(1).day(0);
  const sundaysObjOfWeeks = [];
  for (let i = 0; firstSunday.add(i, 'week').month() <= currentMonth; i++) {
    sundaysObjOfWeeks.push(firstSunday.add(i, 'week'));
  }
  
  return (
    <CalendarTable>
      <tbody>
        { sundaysObjOfWeeks.map(sundayObj =>
          <ScheduleCalendarTr 
            key={`scheduleWeek_${sundayObj.format('YYYY-MM-DD')}`}
            scheduleCountData={data}
            sundayObj={sundayObj} 
            currentMonth={currentMonth}
            focusDate={focusDate}
          />
        )}
      </tbody>
    </CalendarTable>
  );
});

export default ScheduleCalendar;