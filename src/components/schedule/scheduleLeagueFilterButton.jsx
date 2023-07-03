import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { 
  addScheduleLeaguesFilterId,
  removeScheduleLeaguesFilterId,
  removeAllScheduleLeaguesFilterId,
} from "../../slices/userSettingSlice"

import { getLeagueNameKr } from "../../utils/league"

import { DummyLeagueLogo, DummyAllLeagueLogo } from "../icons/footballIcons";

const FilterButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: ${props => props.isAll ? '6px' : '3px'};
  padding: 6px 16px;
  border: none;
  background: ${props => props.isActive ? '#bce3ec' : '#fff'};
  border-radius: 4px;
  &:hover {
    background: ${props => props.isActive ? '#dfebee' : '#dfebee'};
  }
`;

const LogoWrap = styled.span`
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-right: 20px;
  text-align: center;
`;

// const LogoImg = styled.img`
//   display: block;
//   height: 100%;
//   margin: 0 auto;
// `;

const LeagueName = styled.span`
  font-size: 14px;
`;

const ScheduleLeagueFilterButton = ({ leagueId }) => {
  const scheduleLeaguesFilter = useSelector(state => state.userSetting.scheduleLeaguesFilter);
  const dispatch = useDispatch();

  const isActive = leagueId === 'all'
    ? scheduleLeaguesFilter.length === 0
    : scheduleLeaguesFilter.includes(leagueId);
  
  const btnName = useMemo(() => {
    return leagueId === 'all' 
      ? '전체 대회' 
      : getLeagueNameKr(leagueId);
  }, []);

  const onClickButton = () => {
    if (leagueId === 'all') {
      setAll();
    } else {
      toggleLeagueFilter();
    }
  }

  const setAll = () => {
    if (scheduleLeaguesFilter.length > 0) {
      dispatch(removeAllScheduleLeaguesFilterId());
    }
  }

  const toggleLeagueFilter = () => {
    if (scheduleLeaguesFilter.includes(leagueId)) {
      dispatch(removeScheduleLeaguesFilterId(leagueId));
    } else {
      dispatch(addScheduleLeaguesFilterId(leagueId));
    }
  }

  return (
    <FilterButton 
      onClick={() => onClickButton()}
      isAll={leagueId === 'all'}
      isActive={isActive}
      >
      <LogoWrap>
        { leagueId !== 'all' 
          ? <>
            {/* <LogoImg src={`https://media-1.api-sports.io/football/leagues/${leagueId}.png`} alt="" /> */}
            <DummyLeagueLogo size='100%' />
          </>
          : <DummyAllLeagueLogo size='100%' />
        }
      </LogoWrap>
      <LeagueName>{btnName}</LeagueName>
    </FilterButton>
  );
}

export default ScheduleLeagueFilterButton;