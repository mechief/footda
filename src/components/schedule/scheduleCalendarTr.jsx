import React, { memo } from "react";

import ScheduleCalendarTd from "./scheduleCalendarTd";

const ScheduleCalendarTr = memo(({ scheduleCountData = [], sundayObj, currentMonth, focusDate }) => {
  const dateObjects = new Array(7).fill(0).map((_, i) => {
    return sundayObj.add(i, 'day');
  });

  return (
    <tr>
      { dateObjects.map((dateObj) => {
        const countItem = scheduleCountData.find(v => v.date === dateObj.format('YYYY-MM-DD'));
        return (
          <ScheduleCalendarTd 
            key={`scheduleTable_${dateObj.format('YYYY-MM-DD')}`}
            dateObj={dateObj}
            isCurrentMonth={dateObj.month() === currentMonth}
            countArray={!countItem ? [] : countItem.leagues}
            focusDate={focusDate}
          />
        )
      })}
    </tr>
  );
});

export default ScheduleCalendarTr;