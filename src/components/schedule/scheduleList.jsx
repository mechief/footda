import React, { useMemo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { dayOfWeekToKR } from "../../service/commonFunctions"

import ScheduleItem from "./scheduleItem";

const DateTitle = styled.h3`
  margin: 16px 0 8px;
  font-size: 16px;
  font-weight: 500;
`;

const ScheduleList = ({ fixtures, date }) => {
  const dayjsDate = useMemo(() => {
    return dayjs(date);
  }, []);
  
  return (
    <>
      <DateTitle>{`${dayjsDate.format('M')}월 ${dayjsDate.format('D')}일 (${dayOfWeekToKR(dayjsDate.format('d'))})`}</DateTitle>
      { fixtures.map(fixtureData => 
        <ScheduleItem key={fixtureData.fixture.id} fixture={fixtureData} />
      )}
    </>
  );
}

export default ScheduleList;