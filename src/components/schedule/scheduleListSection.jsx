import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { useWeekSchedule } from "../../hooks/schedule/useWeekSchedule";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

import ScheduleList from "./scheduleList";

const ListContainer = styled.div`
  flex: 1 1 auto;
  position: relative;
  padding: 20px 0 60px 40px;
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

const LoadMoreButton = styled.button`
  padding: 0.4em;
  border: none;
  line-height: 1;
  background: none;
  font-size: 20px;
`;

const ScheduleListSection = ({ focusDate, isScrollToFocus, setIsScrollToFocus }) => {
  const [weekSunday, setWeekSunday] = useState(null); // 주 단위 기준 요일: 일요일
  const [filteredList, dates] = useWeekSchedule(weekSunday);

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
    
    setIsScrollToFocus(false);
  }, [dates, isScrollToFocus]);

  const onClickPrev = async () => {
    const newWeekDate = dayjs(weekSunday).subtract(1, 'week').format('YYYY-MM-DD');
    setWeekSunday(newWeekDate);
  }

  const onClickNext = async () => {
    const newWeekDate = dayjs(weekSunday).add(1, 'week').format('YYYY-MM-DD');
    setWeekSunday(newWeekDate);
  }

  const getWeekPeriod = () => {
    const dayjsObj = dayjs(weekSunday);
    return dayjsObj.format('M.D') + ' ~ ' + dayjsObj.add(6, 'day').format('M.D');
  }

  return (
    <ListContainer>
      <WeekControler>
        <LoadMoreButton onClick={() => onClickPrev()}><AiOutlineLeft title="이전" /><span className="sound-only">이전</span></LoadMoreButton>
        <WeekTitle>{getWeekPeriod()}</WeekTitle>
        <LoadMoreButton onClick={() => onClickNext()}><AiOutlineRight title="다음" /><span className="sound-only">다음</span></LoadMoreButton>
      </WeekControler>
      { dates.map((date) => 
        <ScheduleList 
          key={`schedule-list-${date}`} 
          fixtures={filteredList[date]} 
          date={date}
        />
      )}
    </ListContainer>
  );
}

export default ScheduleListSection;