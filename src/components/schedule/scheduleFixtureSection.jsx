import React from "react";
import { useQuery } from "react-query";

import { getScheduleFixtures } from "../../api/scheduleFixture";

import ScheduleFixtureItem from "./scheduleFixtureItem";

const scheduleFixturesQuery = (date) => ({
  queryKey: ['fixtures', date],
  queryFn: async () => getScheduleFixtures({date: date}),
  refetchOnWindowFocus: false,
  retry: 0,
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 5,
});

const ScheduleFixtureSection = ({ date }) => {
  const { isLoading, isError, data, error } = useQuery(scheduleFixturesQuery(date));
 
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <div>
      { data.map(fixtureData => 
        <ScheduleFixtureItem key={fixtureData.fixture.id} fixture={fixtureData} />
      )}
    </div>
  );
}

export default ScheduleFixtureSection;