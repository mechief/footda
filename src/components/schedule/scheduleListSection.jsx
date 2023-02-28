import React, { useMemo } from "react";
import styled, { css } from "styled-components";

import InfiniteScroll from 'react-infinite-scroller';

import ScheduleList from "./scheduleList";

const ListContainer = styled.div`
  overflow-y: scroll;
  width: calc(50% - 60px);
  height: calc(100vh - 158px);
  padding-right: 4px;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, .4);
    box-shadow: 0 0 1px rgba(255, 255, 255, .4);
  }
`;


const LoadPrevButton = styled.button`
  width: 100%;
  padding: 0.4em;
  border: none;
  font-size: 16px;
  font-weight: 500;
  ${props => !props.disabled && css`
    &:hover {
      background: #f5f5f5;
    }
  `}
`;

const ScheduleListSection = ({ 
  fixturesData,
  hasPreviousPage,
  hasNextPage,
  fetchPreviousPage,
  fetchNextPage,
  isFetchingPreviousPage,
  isFetchingNextPage,
}) => {
  const dateKeys = useMemo(() => {
    return Object.keys(fixturesData);
  }, [fixturesData]);

  const fetchPrev = () => {
    if (!isFetchingNextPage) {
      fetchPreviousPage();
    }
  }

  const fetchNext = () => {
    if (!isFetchingNextPage) {
      fetchNextPage(); 
    }
  }

  return (
    <ListContainer>
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchNext}
        hasMore={hasNextPage}
        // loader={<div className="loader" key={0}>Loading ...</div>}
        threshold={0} // 스크롤의 끝에서 (n)px 남았을 때 요청
        useWindow={false}
      >
        { hasPreviousPage &&
          <LoadPrevButton 
            onClick={() => fetchPrev()}
            disabled={isFetchingPreviousPage}
            >
            { isFetchingPreviousPage 
              ? '불러오는 중...' 
              : '이전 일정 보기'
            }
          </LoadPrevButton>
        }
        { dateKeys.length > 0 
          && dateKeys.map((date) => 
          <ScheduleList key={`schedule_week_${date}`} fixtures={fixturesData[date]} date={date} />
        )}
      </InfiniteScroll>
    </ListContainer>
  );
}

export default ScheduleListSection;