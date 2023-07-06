import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import useWeekSchedule from "../../hooks/schedule/useWeekSchedule";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

import ScheduleList from "./scheduleList";

const ScheduleListSection = ({ focusDate, isScrollToFocus, setIsScrollToFocus, calendarMonth, setCalendarMonth }) => {
  const [weekSunday, setWeekSunday] = useState(dayjs(focusDate).day(0).format('YYYY-MM-DD')); // 주 단위 기준 요일: 일요일
  const [filteredList, dates] = useWeekSchedule(weekSunday);

  const listRef = useRef(null);

  useEffect(() => {
    setWeekSunday(dayjs(focusDate).day(0).format('YYYY-MM-DD'));
  }, [focusDate]);

  // focusDate 로 scroll 이동
  useEffect(() => {
    if (dates.length === 0 || !isScrollToFocus) return;
    if (!dayjs(weekSunday).isSame(dayjs(focusDate), 'week')) return;

    const dataTitleElem = document.getElementById(`list_date_${focusDate}`);
    if (!dataTitleElem) {
      setIsScrollToFocus(false);
      return;
    }

    listRef.current.scrollTo(0, dataTitleElem.offsetTop);
    
    setIsScrollToFocus(false);
  }, [dates, isScrollToFocus]);

  const onClickArrow = (direction) => {
    const weekSundayObj = dayjs(weekSunday);
    const newWeekDateObj = direction === 'prev'
      ? weekSundayObj.subtract(1, 'week')
      : weekSundayObj.add(1, 'week');
    
    listRef.current.scrollTo(0, 0);

    if (!newWeekDateObj.isSame(weekSundayObj, 'month')) {
      setCalendarMonth(dayjs(newWeekDateObj).date(1));
    }

    setWeekSunday(newWeekDateObj.format('YYYY-MM-DD'));
  }

  const getWeekPeriod = () => {
    const dayjsObj = dayjs(weekSunday);
    return dayjsObj.format('M.D') + ' ~ ' + dayjsObj.add(6, 'day').format('M.D');
  }

  return (
    <ListContainer>
      <WeekControler>
        <LoadMoreButton onClick={() => onClickArrow('prev')}><AiOutlineLeft title="이전" /><span className="sound-only">이전</span></LoadMoreButton>
        <WeekTitle>{getWeekPeriod()}</WeekTitle>
        <LoadMoreButton onClick={() => onClickArrow('next')}><AiOutlineRight title="다음" /><span className="sound-only">다음</span></LoadMoreButton>
      </WeekControler>
      <ScheduleListWrapper ref={listRef}>
        { dates.length === 0 
          ? <NoListData>선택된 주간에 경기 일정이 없습니다.</NoListData>
          : dates.map((date) => 
              <ScheduleList 
                key={`schedule-list-${date}`} 
                fixtures={filteredList[date]} 
                date={date}
              />
            )
        }
      </ScheduleListWrapper>
    </ListContainer>
  );
}

const ListContainer = styled.div`
  flex: 1 1 auto;
  position: relative;
  padding: 20px 0 20px 40px;
`;

const WeekControler = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  margin-bottom: 20px;
`;

const WeekTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
`;

const ScheduleListWrapper = styled.div`
  overflow: auto;
  position: relative;
  height: calc(100% - 60px);
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
  padding: 0.4em;
  border: none;
  line-height: 1;
  background: none;
  font-size: 20px;
`;

const NoListData = styled.div`
  line-height: 100px;
  text-align: center;
`;

export default ScheduleListSection;