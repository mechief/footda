import React, { memo } from "react";

import { FIXTURE_STATUS } from "../../service/apiFootballService";

const FixtureStatus = memo(({ shortStatus }) => {
  return (
    <span>{FIXTURE_STATUS[shortStatus]?.text}</span>
  );
});

export default FixtureStatus;