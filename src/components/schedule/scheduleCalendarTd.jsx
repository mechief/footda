import React, { useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import styled from "styled-components";

import ScheduleCalendarCountItem from "./scheduleCalendarCountItem";

const ScheduleCalendarTd = memo(({ dateObj, isCurrentMonth, countArray, focusDate }) => {
  const navigate = useNavigate();
  const scheduleLeaguesFilter = useSelector(state => state.userSetting.scheduleLeaguesFilter);

  const filteredArray = useMemo(() => {
    return scheduleLeaguesFilter.length === 0
      ? countArray.sort((a, b) => a.id - b.id)
      : countArray.filter(countData => scheduleLeaguesFilter.includes(countData.id)).sort((a, b) => a.id - b.id);
  }, [countArray]);

  const onClickDate = () => {
    navigate('/schedule/' + dateObj.format('YYYYMMDD'));
  }

  return (
    <StyledTd>
      <DateButton
        type="button"
        isFocusDate={dateObj.format('YYYY-MM-DD') === focusDate}
        onClick={onClickDate}
      >
        <DateText isCurrentMonth={isCurrentMonth}>
          {dateObj.format('D')}
          { dateObj.isSame(dayjs(), 'day') && 
            <DateToday>Today</DateToday>
          }
        </DateText>
        { filteredArray.map(countData => 
          <ScheduleCalendarCountItem key={`scheduleCountItem_${dateObj.format('YYYY-MM-DD')}_${countData.id}`} countData={countData} />
        )}
      </DateButton>
    </StyledTd>
  );
});

const StyledTd = styled.td`
  height: 80px;
  vertical-align: top;
`;

const DateButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 100%;
  padding: 4px 4px 2px;
  text-align: left;
  min-height: 100%;
  border: none;
  background: ${props => props.isFocusDate ? '#dfebee' : '#fff'};
  &:hover {
    background: ${props => props.isFocusDate ? '#dfebee' : '#fafafa'}
  }
`;
  
const DateText = styled.div`
  position: relative;
  margin-bottom: 5px;
  line-height: 1;
  font-size: 12px;
  color: ${props => props.isCurrentMonth ? '#555' : '#ccc'};
`;

const DateToday = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  color: #55149c;
`;

export default ScheduleCalendarTd;