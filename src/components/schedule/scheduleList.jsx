import React, { useMemo, memo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { dayOfWeekToKR } from "../../utils/dates"

import ScheduleItem from "./scheduleItem";

const ScheduleList = memo(({ fixtures, date }) => {
  const dayjsDate = useMemo(() => {
    return dayjs(date);
  }, []);

  const printDateTitle = () => {
    return `${dayjsDate.format('M')}월 ${dayjsDate.format('D')}일 (${dayOfWeekToKR(dayjsDate.format('d'))})`;
  }
  
  return (
    <>
      <DateTitle id={`list_date_${date}`}>{printDateTitle()}</DateTitle>
      { fixtures.map(fixtureData => 
        <ScheduleItem key={fixtureData.fixture.id} fixture={fixtureData} />
      )}
    </>
  );
});

const DateTitle = styled.h4`
  padding: 16px 0 8px;
  font-size: 16px;
  font-weight: 400;
  &:first-of-type {
    padding-top: 0;
  }
`;

export default ScheduleList;