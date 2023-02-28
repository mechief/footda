import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";

import { getScheduleFixtures, getFirstExistsDate } from "../api/scheduleFixture";

import { NoResultError } from "../errors/footballAPIError";

import ScheduleCalendarSection from "../components/schedule/scheduleCalendarSection";
import ScheduleListSection from "../components/schedule/scheduleListSection";

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px 20px;
`;

const Schedule = () => {
  const params = useParams();
  const scheduleLeaguesFilter = useSelector(state => state.userSetting.scheduleLeaguesFilter);

  const focusDate = params.date && dayjs(params.date, 'YYYYMMDD').isValid() 
    ? dayjs(params.date, 'YYYYMMDD').format('YYYY-MM-DD')
    : dayjs().format('YYYY-MM-DD')

  const fetchWeekSchedule = async ({ pageParam = focusDate }) => {
    // 일요일을 기준으로 주 단위로 data 수신
    const startDayjsObj = dayjs(pageParam).day(0);

    let hasPrev = true;
    let hasNext = true;
    const fetchDirection = startDayjsObj.isBefore(focusDate) ? 'prev' : 'next';

    const fixtures = await getScheduleFixtures({
      date: startDayjsObj.format('YYYY-MM-DD'),
      endDate: startDayjsObj.add(6, 'day').format('YYYY-MM-DD'),
    });

    // 현재 주의 일정이 하나도 없는 경우, 이전 혹은 이후 20일간 일정이 있는지 확인하여 없으면 pageParam을 undefind 설정한다.
    if (fixtures.length === 0) {
      try {
        const date = fetchDirection === 'prev'
          ? startDayjsObj.subtract(20, 'day').format('YYYY-MM-DD') // 20일 이전 부터 확인
          : startDayjsObj.add(7, 'day').format('YYYY-MM-DD');
        
        await getFirstExistsDate(date); // false 인 경우 error return;
      } catch (err) {
        if (err instanceof NoResultError) {
          if (fetchDirection === 'prev') hasPrev = false;
          if (fetchDirection === 'next') hasNext = false;
        }
      }
    }  

    return {
      fixtures,
      prevPage: !hasPrev ? undefined : startDayjsObj.subtract(7, 'day').format('YYYY-MM-DD'),
      nextPage: !hasNext ? undefined : startDayjsObj.add(7, 'day').format('YYYY-MM-DD'),
    }
  }

  const {
    data,
    hasPreviousPage,
    hasNextPage,
    fetchPreviousPage,
    fetchNextPage,
    isFetchingPreviousPage,
    isFetchingNextPage,
    isLoading, 
    isError,
  } = useInfiniteQuery('scheduleOfWeek', fetchWeekSchedule, {
    getPreviousPageParam: (firstPage) => firstPage.prevPage,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  const fixturesData = useMemo(() => {
    const obj = {};
    
    if (!data) return obj;

    data.pages.forEach((pageData) => {
      const leagueFilteredFixtures = scheduleLeaguesFilter.length === 0 
        ? pageData.fixtures
        : pageData.fixtures.filter((fixtureData) => scheduleLeaguesFilter.includes(fixtureData.league.id));

      leagueFilteredFixtures.forEach((fixtureData) => {
        const date = fixtureData.fixture?.formattedDate.substring(0, 10);
        obj[date] = (obj[date] || []).concat(fixtureData);
      });
    });

    return obj;
  }, [data, scheduleLeaguesFilter]);

  console.log(data);

  return (
    <ScheduleContainer>
      { isError &&
        <div>일정을 불러오는 중 에러가 발생했습니다.</div>
      }
      <ScheduleCalendarSection />
      <ScheduleListSection 
        fixturesData={fixturesData}
        isLoading={isLoading}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        fetchPreviousPage={fetchPreviousPage}
        fetchNextPage={fetchNextPage}
        isFetchingPreviousPage={isFetchingPreviousPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </ScheduleContainer>
  );
}

export default Schedule;