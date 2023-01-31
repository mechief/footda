import React, { useState } from "react";
import dayjs from "dayjs";

import ScheduleFixtureSection from "./scheduleFixtureSection";

const ScheduleFixture = () => {
  const [dates, setDates] = useState([dayjs().format('YYYY-MM-DD')]);

  return (
    <>
      { dates.map(date => 
        <ScheduleFixtureSection key={`fixtures_${date}`} date={date} />
      )}
    </>
  );
}

export default ScheduleFixture;