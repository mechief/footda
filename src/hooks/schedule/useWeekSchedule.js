import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

import { getScheduleFixtures } from "../../api/scheduleFixture";

const useWeekSchedule = (weekSunday) => {
  const scheduleLeaguesFilter = useSelector(state => state.userSetting.scheduleLeaguesFilter);

  const { data } = useQuery({
    queryKey: ['scheduleOfWeek', weekSunday],
    queryFn: async () => getScheduleFixtures({
      date: weekSunday,
      endDate: dayjs(weekSunday).add(6, 'day').format('YYYY-MM-DD'),
    }),
    enabled: !!weekSunday,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  const filteredList = useMemo(() => {
    const obj = {};
    
    if (!data) return obj;

    const filteredFixtures = scheduleLeaguesFilter.length === 0 
      ? data
      : data.filter(fixtureData => scheduleLeaguesFilter.includes(fixtureData.league.id));

    filteredFixtures.forEach((fixtureData) => {
      const date = fixtureData.fixture?.formattedDate.substring(0, 10);
      obj[date] = (obj[date] || []).concat(fixtureData);
    });

    return obj;
  }, [data, scheduleLeaguesFilter]);

  const dates = useMemo(() => {
    return filteredList ? Object.keys(filteredList) : [];
  }, [filteredList]);

  return [filteredList, dates];
}

export default useWeekSchedule;