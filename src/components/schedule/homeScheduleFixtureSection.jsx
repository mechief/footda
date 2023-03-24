import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import styled from "styled-components";

import { getScheduleFixtures } from "../../api/scheduleFixture";
import { dayOfWeekToKR } from "../../service/commonFunctions"

import HomeScheduleFixtureItem from "./homeScheduleFixtureItem";

const Container = styled.div`
  margin-bottom: 15px;
`;

const DateTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 400;
`;

const queryConfig = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 5,
}

const scheduleFixturesQuery = (date) => ({
  queryKey: ['fixtures', date],
  queryFn: async () => getScheduleFixtures({date: date}),
  ...queryConfig,
});

const HomeScheduleFixtureSection = ({ date }) => {
  const { isLoading, isError, data, error } = useQuery(scheduleFixturesQuery(date));

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
        <HomeScheduleFixtureItem key={fixtureData.fixture.id} fixture={fixtureData} />
      )}
    </Container>
  );
}

export default HomeScheduleFixtureSection;