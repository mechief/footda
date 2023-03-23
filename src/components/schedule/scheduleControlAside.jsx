import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { setScheduleAsideType } from "../../slices/userSettingSlice";

import { GrFilter, GrCalendar } from "react-icons/gr";

import ScheduleCalendar from "./scheduleCalendar";
import ScheduleLeagueFilter from "./scheduleLeagueFilter";

const StyledControlAside = styled.aside`
  flex: 0 0 auto;
  width: ${props => props.tab === 0 ? '25%' : '55%'};
  min-width: 280px;
  padding: 12px 16px;
  background: #f5f5f5;
  transition: width 0.5s;
`;

const TabWrapper = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const TabButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 92px;
  height: 40px;
  border: none;
  vertical-align: top;
  background: ${props => props.active ? '#bce3ec' : '#e5e5e5'};
  &:first-child {
    border-radius: 20px 0 0 20px;
  }
  &:last-child {
    border-radius: 0 20px 20px 0;
  }
  svg {
    margin-right: 6px;
  }
`;

const ScheduleControlAside = ({ focusDate }) => {
  const dispatch = useDispatch();
  const tab = useSelector(state => state.userSetting.scheduleAsideType);

  const onClickTab = (tabNum) => {
    dispatch(setScheduleAsideType(tabNum));
  }

  return (
    <StyledControlAside tab={tab}>
      <TabWrapper>
        <TabButton onClick={() => onClickTab(0)} active={tab === 0}><GrFilter size='1.2em' /> <span>리그</span></TabButton>
        <TabButton onClick={() => onClickTab(1)} active={tab === 1}><GrCalendar size='1.2em' /> <span>달력</span></TabButton>
      </TabWrapper>
      { tab === 0 &&
        <ScheduleLeagueFilter />
      }
      { tab === 1 &&
        <ScheduleCalendar focusDate={focusDate} />
      }
    </StyledControlAside>
  );
}

export default ScheduleControlAside;