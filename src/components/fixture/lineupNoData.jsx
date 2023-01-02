import React, { memo } from "react";

import { LineupWrapper } from "./fixtureStyled";

const LineupNoData = memo(() => {
  return (
    <LineupWrapper>라인업 발표 전 입니다.</LineupWrapper>
  );
});

export default LineupNoData;