import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import LiveWidgetItem from "./liveWidgetItem";

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

const LiveWidget = () => {
  const widgetFixtureIds = useSelector((state) => state.liveWidget.widgetFixtureIds);
  const dispatch = useDispatch();

  return (
    <>
      {
        widgetFixtureIds.length > 0 && (
        <LiveWidgetArea>
          { widgetFixtureIds.map(fixtureId => 
            <LiveWidgetItem key={`liveWidget_${fixtureId}`} fixtureId={fixtureId} />
          )}
        </LiveWidgetArea>
      )}
    </>
  );
}

export default LiveWidget;