import React, { memo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import useScheduleCounts from "../../hooks/schedule/useScheduleCounts";

import ScheduleCalendarControl from "./scheduleCalendarControl";
import ScheduleCalendarTr from "./scheduleCalendarTr";

const CalendarTable = styled.table`
  overflow: hidden;
  width: 100%;
  table-layout: fixed;
  border-radius: 8px;
  border-spacing: 1px;
  border-collapse: separate;
`;

const ScheduleCalendar = memo(({ focusDate, calendarMonth, setCalendarMonth }) => {
  const dayjsObj = dayjs.isDayjs(calendarMonth) ? calendarMonth : dayjs(focusDate);
  const currentMonth = dayjsObj.month();
  
  const { data, isLoading, isError, error } = useScheduleCounts(dayjsObj);
  
  const firstSunday = dayjsObj.date(1).day(0);
  const sundaysObjOfWeeks = [];
  for (let i = 0; firstSunday.add(i, 'week').isBefore(dayjsObj.date(1).add(1, 'month')); i++) {
    sundaysObjOfWeeks.push(firstSunday.add(i, 'week'));
  }
  
  return (
    <>
      <ScheduleCalendarControl currentMonthObj={dayjsObj} setCalendarMonth={setCalendarMonth} />
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
    </>
  );
});

export default ScheduleCalendar;