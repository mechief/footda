import React from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import dayjs from "dayjs";

import { NoResultError } from "../../errors/footballAPIError";

import { getFirstExistsDate } from "../../api/scheduleFixture";

import ScheduleFixtureSection from "./scheduleFixtureSection";

const ScheduleFixtureContainer = styled.div`
  // max-width: 800px;
  padding: 40px 20px;
`;

const LoadButton = styled.button`
  width: 100%;
  padding: 0.4em;
  border: none;
  font-size: 16px;
  font-weight: 500;
  &:hover:not(disabled) {
    background: #f5f5f5;
  }
`;

const ScheduleFixture = () => {
  const fetchFirstExistsDate = ({ pageParam = undefined }) => getFirstExistsDate(pageParam);

  const {
    data,
    error,
    fetchNextPage,
    // hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading, 
    isError,
  } = useInfiniteQuery('fixturesDates', fetchFirstExistsDate, {
    getNextPageParam: (lastPage, pages) => dayjs(lastPage).add(1, 'day').format('YYYY-MM-DD'),
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });
  
  if (isLoading) {
    return <></>
  }

  if (isError) {
    if (error instanceof NoResultError) {
      return <ScheduleFixtureContainer><span>예정된 경기가 없습니다.</span></ScheduleFixtureContainer>
    } else {
      return <ScheduleFixtureContainer><span>Error: {error.message}</span></ScheduleFixtureContainer>
    }
  }

  return (
    <ScheduleFixtureContainer>
      { data.pages.map(date => 
        <ScheduleFixtureSection key={`fixtures_${date}`} date={date} />
      )}
      <div>
        <LoadButton 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          >
          { isFetchingNextPage 
            ? '불러오는 중...' 
            : '다음 일정 불러오기'
          }
        </LoadButton>
      </div>
    </ScheduleFixtureContainer>
  );
}

export default ScheduleFixture;