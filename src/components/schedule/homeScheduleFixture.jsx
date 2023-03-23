import React from "react";
import { useInfiniteQuery } from "react-query";
import dayjs from "dayjs";
import styled, { css } from "styled-components";

import { getFirstExistsDate } from "../../api/scheduleFixture";

import HomeScheduleFixtureSection from "./homeScheduleFixtureSection";

const LoadButton = styled.button`
  width: 100%;
  padding: 0.4em;
  border: none;
  font-size: 16px;
  ${props => !props.disabled && css`
    &:hover {
      background: #f5f5f5;
    }
  `}
`;

const HomeScheduleFixture = () => {
  const fetchFirstExistsDate = ({ pageParam = undefined }) => getFirstExistsDate(pageParam);

  const {
    data,
    fetchNextPage,
    // hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading, 
  } = useInfiniteQuery('fixturesDates', fetchFirstExistsDate, {
    getNextPageParam: (lastPage, allPages) => dayjs(lastPage).add(1, 'day').format('YYYY-MM-DD'),
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });
  
  if (isLoading) {
    return <></>
  }

  return (
    <>
      { data.pages.map(date => 
        <HomeScheduleFixtureSection key={`fixtures_${date}`} date={date} />
      )}
      <div>
        <LoadButton 
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          >
          { isFetchingNextPage 
            ? '불러오는 중...' 
            : '다음 일정 보기'
          }
        </LoadButton>
      </div>
    </>
  );
}

export default HomeScheduleFixture;