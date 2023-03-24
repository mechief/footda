import React, { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import styled from "styled-components";

import { getScheduleCountOfMonth } from "../../api/scheduleFixture";

import ScheduleCalendarTr from "./scheduleCalendarTr";

const CalendarTable = styled.table`
  overflow: hidden;
  width: 100%;
  table-layout: fixed;
  border-radius: 8px;
  border-spacing: 1px;
  border-collapse: separate;
`;

const queryConfig = {
  staleTime: 1000 * 60 * 60 * 24,
  cacheTime: 1000 * 60 * 60 * 24,
}

const scheduleCountOfMonthQuery = ({ key, date, endDate }) => ({
  queryKey: ['scheduleCountOfMonth', key],
  queryFn: async () => getScheduleCountOfMonth(date, endDate),
  ...queryConfig,
});

const ScheduleCalendar = memo(({ focusDate }) => {
  const dayjsObj = dayjs(focusDate);
  const currentMonth = dayjsObj.month();
  
  const { isLoading, isError, data, error } = useQuery(scheduleCountOfMonthQuery({
    key: dayjsObj.format('YYYY-MM'),
    date: dayjsObj.startOf('month').format('YYYY-MM-DD'),
    endDate: dayjsObj.endOf('month').format('YYYY-MM-DD')
  }));
  
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