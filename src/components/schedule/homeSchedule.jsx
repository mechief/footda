import React from "react";
import styled, { css } from "styled-components";

import useExistsDate from "../../hooks/schedule/useExistsDate";

import HomeScheduleSection from "./homeScheduleSection";

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

const HomeSchedule = () => {
  const { 
    data, 
    isInitialLoading, 
    fetchNextPage, 
    isFetchingNextPage 
  } = useExistsDate();

  if (isInitialLoading) {
    return <></>;
  }

  return (
    <>
      { data.pages.map(date => 
        <HomeScheduleSection key={`fixtures_${date}`} date={date} />
      )}
      <div>
        <LoadButton onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          { isFetchingNextPage 
            ? '불러오는 중...' 
            : '다음 일정 보기'
          }
        </LoadButton>
      </div>
    </>
  );
}

export default HomeSchedule;