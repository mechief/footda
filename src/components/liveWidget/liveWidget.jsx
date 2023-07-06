import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getScheduleFixturesByIds } from "../../api/scheduleFixture";

import LiveWidgetItem from "./liveWidgetItem";

const liveWidgetQuery = (widgetFixtureIds) => ({
  queryKey: ['liveWidget', widgetFixtureIds.join('-')],
  queryFn: async () => getScheduleFixturesByIds(widgetFixtureIds),
  keepPreviousData: true,
  staleTime: 15000,
  cacheTime: 15000,
});

const LiveWidget = () => {
  const widgetFixtureIds = useSelector((state) => state.liveWidget.widgetFixtureIds);

  const { data, isError, error } = useQuery(liveWidgetQuery(widgetFixtureIds));

  if (isError) {
    console.error(error);
    return <></>;
  }

  return (
    <>
      { data && (
        <LiveWidgetArea>
          { data.map(fixtureData => 
            <LiveWidgetItem key={`liveWidget_${fixtureData.fixture.id}`} fixtureData={fixtureData} />
          )}
        </LiveWidgetArea>
      )}
    </>
  );
}

const LiveWidgetArea = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  right: 10px;
  bottom: 10px;
  z-index: 50;
  width: 300px;
`;

export default LiveWidget;