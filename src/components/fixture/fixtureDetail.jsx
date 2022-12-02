import React from "react";
import styled from "styled-components";

import FixtureDetailEvent from "./fixtureDetailEvent";

const FixtureDetailWrapper = styled.div`
  width: 500px;
`;

const FixtureDetailTabCont = styled.div`
  min-height: 400px;
  background: #e5e5e5;
`;

const FixtureDetail = () => {
  return (
    <FixtureDetailWrapper>
      <FixtureDetailTabCont>
        <FixtureDetailEvent />
      </FixtureDetailTabCont>
    </FixtureDetailWrapper>
  );
};

export default FixtureDetail;