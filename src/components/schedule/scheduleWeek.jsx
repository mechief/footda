import React, { useEffect, useMemo, memo } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { getScheduleFixtures } from "../../api/scheduleFixture";

import ScheduleList from "./scheduleList";

const queryConfig = {
  staleTime: 1000 * 60 * 5,
  cacheTime: 1000 * 60 * 5,
}

const scheduleOfWeekQuery = (weekDate) => ({
  queryKey: ['scheduleOfWeek', weekDate],
  queryFn: async () => getScheduleFixtures({
    date: weekDate,
    endDate: dayjs(weekDate).add(6, 'day').format('YYYY-MM-DD'),
  }),
  ...queryConfig,
});

const ScheduleWeek = memo(({ 
  weekDate, 
  focusDate, 
  isScrollToFocus, 
  setIsScrollToFocus, 
  listRef, 
  isLoading, 
  setIsLoading 
}) => {
  const scheduleLeaguesFilter = useSelector(state => state.userSetting.scheduleLeaguesFilter);
  const { data } = useQuery(scheduleOfWeekQuery(weekDate));

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

    if (isLoading) {
      setIsLoading(false);
    }

    return obj;
  }, [data, scheduleLeaguesFilter]);

  const dates = useMemo(() => {
    return filteredList ? Object.keys(filteredList) : [];
  }, [filteredList]);

  // focusDate 로 scroll 이동
  useEffect(() => {
    if (dates.length === 0 || !isScrollToFocus) return;
    if (!dayjs(weekDate).isSame(dayjs(focusDate), 'week')) return;

    const dataTitleElem = document.getElementById(`list_date_${focusDate}`);
    if (!dataTitleElem) {
      setIsScrollToFocus(false);
      return;
    }

    listRef.current.scrollTo(0, dataTitleElem.offsetTop);
    
    setIsScrollToFocus(false);
  }, [dates, isScrollToFocus]);
  
  return (
    <>
      { dates.map((date) => 
        <ScheduleList 
          key={`schedule-list-${date}`} 
          fixtures={filteredList[date]} 
          date={date}
        />
      )}
    </>
  );
});

export default ScheduleWeek;