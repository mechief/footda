import React, { useMemo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import useDateSchedule from "../../hooks/schedule/useDateSchedule";
import { dayOfWeekToKR } from "../../utils/dates"

import HomeScheduleItem from "./homeScheduleItem";

const Container = styled.div`
  margin-bottom: 15px;
`;

const DateTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 400;
`;

const HomeScheduleSection = ({ date }) => {
  const { isLoading, isError, data, error } = useDateSchedule(date);

  const dayjsDate = useMemo(() => {
    return dayjs(date);
  }, []);
 
  if (isLoading) {
    return <></>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <Container>
      <DateTitle>{`${dayjsDate.format('M')}월 ${dayjsDate.format('D')}일 (${dayOfWeekToKR(dayjsDate.format('d'))})`}</DateTitle>
      { data.map(fixtureData => 
        <HomeScheduleItem key={fixtureData.fixture.id} fixture={fixtureData} />
      )}
    </Container>
  );
}

export default HomeScheduleSection;