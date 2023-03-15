import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import styled from "styled-components";

import ScheduleCalendarSection from "../components/schedule/scheduleCalendarSection";
import ScheduleListSection from "../components/schedule/scheduleListSection";

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0px;
`;

const Schedule = () => {
  const params = useParams();
  const [isScrollToFocus, setIsScrollToFocus] = useState(false);

  const focusDate = useMemo(() => {
    setIsScrollToFocus(true);
    return params.date && dayjs(params.date, 'YYYYMMDD').isValid() 
      ? dayjs(params.date, 'YYYYMMDD').format('YYYY-MM-DD')
      : dayjs().format('YYYY-MM-DD');
  }, [params.date]);

  return (
    <ScheduleContainer>
      <ScheduleCalendarSection focusDate={focusDate} />
      <ScheduleListSection focusDate={focusDate} isScrollToFocus={isScrollToFocus} setIsScrollToFocus={setIsScrollToFocus} />
    </ScheduleContainer>
  );
}

export default Schedule;