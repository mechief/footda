import React, { memo } from "react";
import dayjs from "dayjs";
import styled from "styled-components";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"

const ScheduleCalendarControl = memo(({ currentMonthObj, setCalendarMonth }) => {
  const onClickPrev = () => {
    setCalendarMonth(currentMonthObj.subtract(1, 'month').date(1));
  }

  const onClickNext = () => {
    setCalendarMonth(currentMonthObj.add(1, 'month').date(1));
  }

  const onClickToday = () => {
    setCalendarMonth(dayjs());
  }
  
  return (
    <Container>
      <ButtonArrow onClick={onClickPrev}><AiOutlineLeft /><span className="sound-only">이전</span></ButtonArrow>
      <MonthTitle>{currentMonthObj.format('YY.M')}</MonthTitle>
      <ButtonArrow onClick={onClickNext}><AiOutlineRight /><span className="sound-only">다음</span></ButtonArrow>
      <ButtonToday onClick={onClickToday}>오늘</ButtonToday>
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
`;

const ButtonArrow = styled.button`
  padding: 0.4em;
  border: none;
  line-height: 1;
  background: none;
  font-size: 20px;
`;

const MonthTitle = styled.h3`
  margin: 0 30px;
  line-height: 1;
  font-weight: 500;
`;

const ButtonToday = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  padding: 7px 10px;
  background: #bce3ec;
  border: none;
  border-radius: 4px;
  &:hover {
    background: #dfebee;
  }
`;

export default ScheduleCalendarControl;