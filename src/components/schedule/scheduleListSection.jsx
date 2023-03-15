import React, { useState, useEffect, useCallback, useRef } from "react";
import dayjs from "dayjs";
import styled, { css } from "styled-components";

import ScheduleWeek from "./scheduleWeek";

const ListContainer = styled.div`
  overflow-y: scroll;
  position: fixed;
  top: 95px;
  left: calc(60% + 20px);
  bottom: 95px;
  width: calc(40% - 20px);
  max-width: 460px;
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

const LoadMoreButton = styled.button`
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
  &:last-child {
    margin-top: 16px;
  }
`;

const ScheduleListSection = ({ focusDate, isScrollToFocus, setIsScrollToFocus }) => {
  const [listWeeks, setListWeeks] = useState([]); // 주 단위 기준 요일: 일요일
  const [isLoading, setIsLoading] = useState(false);

  const listRef = useRef(null);

  useEffect(() => {
    changeListWeeks(focusDate);
  }, [focusDate]);

  const changeListWeeks = useCallback((date) => {
    const sunDayjsObj = dayjs(date).day(0); // 기준 요일 - 일요일
    const formattedDate = sunDayjsObj.format('YYYY-MM-DD');

    if (listWeeks.includes(formattedDate)) {
      return;
    }

    // listWeeks 에 해당 주와 연속된 주가 있으면 기존 배열에 추가, 연속되지 않으면 해당 주만 list 에 담음
    if (listWeeks.includes(sunDayjsObj.add(1, 'week').format('YYYY-MM-DD'))
      || listWeeks.includes(sunDayjsObj.subtract(1, 'week').format('YYYY-MM-DD'))) {
      if (sunDayjsObj.isBefore(dayjs(listWeeks[0]))) {
        setListWeeks((prevState) => [formattedDate, ...prevState]);
      } else {
        setListWeeks((prevState) => [...prevState, formattedDate]);
      }
    } else {
      setListWeeks([formattedDate]);
    }
  }, [listWeeks])

  const fetchPrev = async () => {
    if (isLoading) return;

    // setIsLoading(true);
    const newWeekDate = dayjs(listWeeks[0]).subtract(1, 'week').format('YYYY-MM-DD');
    setListWeeks((prevState) => [newWeekDate, ...prevState]);
  }

  const fetchNext = async () => {
    if (isLoading) return;

    // setIsLoading(true);
    const newWeekDate = dayjs(listWeeks[listWeeks.length - 1]).add(1, 'week').format('YYYY-MM-DD');
    setListWeeks((prevState) => [...prevState, newWeekDate]);
  }

  return (
    <ListContainer ref={listRef}>
      <LoadMoreButton onClick={() => fetchPrev()} disabled={isLoading}>
        { isLoading ? '불러오는 중...' : '이전 일정 보기' }
      </LoadMoreButton>
      { listWeeks.map(weekDate => 
        <ScheduleWeek 
          key={`schedule_week_${weekDate}`}
          weekDate={weekDate}
          focusDate={focusDate}
          isScrollToFocus={isScrollToFocus}
          setIsScrollToFocus={setIsScrollToFocus}
          listRef={listRef}
        />
      )}
      <LoadMoreButton onClick={() => fetchNext()} disabled={isLoading}>
        { isLoading ? '불러오는 중...' : '다음 일정 보기' }
      </LoadMoreButton>
    </ListContainer>
  );
}

export default ScheduleListSection;