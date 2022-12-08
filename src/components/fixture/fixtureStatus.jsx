import React, { memo } from "react";

import { FIXTURE_STATUS } from "../../service/apiFootballService";

const FixtureStatus = memo(({ shortStatus }) => {
  return (
    <>
      {FIXTURE_STATUS[shortStatus]?.text}
    </>
  );
});

export default FixtureStatus;