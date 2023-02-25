import React, { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import dayjs from "dayjs";

import { getScheduleFixtures } from "../api/scheduleFixture";

import ScheduleCalendarSection from "../components/schedule/scheduleCalendarSection";
import ScheduleListSection from "../components/schedule/scheduleListSection";

const ScheduleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px 20px;
`;

/**
 * param 으로 date를 전달 받는다. (기본값: 오늘, format: Ymd)
 * 해당 날짜가 시작되는 주의 시작일, 종료일을 계산한다. (일요일 시작 - 토요일 끝).
 * 활성화된 '주' 의 정보는 보관한다.
 * 
 * 활성화된 '주' 마다 경기 일정 데이터를 불러온다.
 * useInfiniteQuery 로 받아온다.
 * 전체 데이터가 있는 범위를 넘어서 스크롤을 하면 주 단위로 infinite scrolling 한다.
 * 
 * 활성돠된 '주'에 대해 캘린더에 표기한다. 그 중에 오늘 날짜 또는 클릭한 날짜는 더 highlight 처리한다.
 */
const Schedule = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const leagueId = searchParams.get('leagueId');

  const focusDate = params.date && dayjs(params.date, 'YYYYMMDD').isValid() 
    ? dayjs(params.date, 'YYYYMMDD').format('YYYY-MM-DD')
    : dayjs().format('YYYY-MM-DD')

  const fetchWeekSchedule = async ({ pageParam = focusDate }) => {
    // 일요일을 기준으로 주 단위로 data 수신
    const startDayjsObj = dayjs(pageParam).day(0);

    const fixtures = await getScheduleFixtures({
      date: startDayjsObj.format('YYYY-MM-DD'),
      endDate: startDayjsObj.add(6, 'day').format('YYYY-MM-DD'),
      leagueId: leagueId,
    });

    return {
      fixtures,
      prevPage: startDayjsObj.subtract(7, 'day').format('YYYY-MM-DD'),
      nextPage: startDayjsObj.add(7, 'day').format('YYYY-MM-DD'),
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    fetchPreviousPage,
    // hasNextPage,
    // hasPreviousPage,
    isFetching,
    isFetchingNextPage,
    isLoading, 
    isError,
  } = useInfiniteQuery('scheduleOfWeek', fetchWeekSchedule, {
    getPreviousPageParam: (firstPage, allPages) => firstPage.prevPage,
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
  });

  const fixturesData = useMemo(() => {
    const obj = {};
    
    if (!data) return obj;

    data.pages.map((pageData) => {
      pageData.fixtures.forEach((fixtureData) => {
        const date = fixtureData.fixture?.formattedDate.substring(0, 10);
        obj[date] = (obj[date] || []).concat(fixtureData);
      });
    });

    return obj;
  }, [data]);

  return (
    <ScheduleContainer>
      { isError &&
        <div>일정을 불러오는 중 에러가 발생했습니다.</div>
      }
      <ScheduleCalendarSection />
      <ScheduleListSection 
        fixturesData={fixturesData}
        isLoading={isLoading}
      />
    </ScheduleContainer>
  );
}

export default Schedule;