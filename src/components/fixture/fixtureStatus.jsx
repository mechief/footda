import React, { memo } from "react";
import styled from "styled-components";

import { FIXTURE_STATUS } from "../../service/apiFootballService";

const FixtureStatusWrapper = styled.div`
  padding-top: 30px;
  font-size: 18px;
  font-weight: 500;
`;

const FixtureStatus = memo(({ shortStatus }) => {
  return (
    <FixtureStatusWrapper>
      {FIXTURE_STATUS[shortStatus]?.text}
    </FixtureStatusWrapper>
  );
});

export default FixtureStatus;