import React from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import { getScheduleFixtures } from "../../api/scheduleFixture";

import LiveSidebarFixtureItem from "./liveSidebarFixtureItem";

const liveSidebarQuery = () => {
  const nowDayjsObj = dayjs();
  const endDate = [0, 1, 22, 23].includes(nowDayjsObj.hour()) || null;

  return {
    queryKey: 'liveSidebar',
    queryFn: async () => getScheduleFixtures({ endDate }),
    staleTime: 15000,
    cacheTime: 15000,
  }
};

const LiveSidebarList = () => {
  const { data, isLoading, isError } = useQuery(liveSidebarQuery());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>라이브 경기 정보를 불러오는 중 에러가 발생했습니다.</div>;
  }

  return (
    <ul>
      { data && data.map(fixtureData => 
        <LiveSidebarFixtureItem key={`liveFixture_${fixtureData.fixture.id}`} fixture={fixtureData} />
      )}
    </ul>
  );
}

export default LiveSidebarList;