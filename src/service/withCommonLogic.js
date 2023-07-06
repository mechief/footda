import React from "react";

import useTeamLangs from "../hooks/lang/useTeamLangs";

const withCommonLogic = (WrappedComponent) => {
  const CommonLogicWrapper = (props) => {
    useTeamLangs();
    
    return <WrappedComponent {...props} />;
  };

  return CommonLogicWrapper;
};

export default withCommonLogic;