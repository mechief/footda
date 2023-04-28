import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getLangTeams } from "../api/lang";
import { setTeams } from "../slices/languageSlice";

const withCommonLogic = (WrappedComponent) => {
  const CommonLogicWrapper = (props) => {
    const dispatch = useDispatch();
    const langTeamsLength = useSelector((state) => state.language['ko-kr'].teamsLength);

    useEffect(() => {
      if (langTeamsLength === 0) {
        fetchLangTeams();
      }
    }, []);

    const fetchLangTeams = async () => {
      const teams = await getLangTeams();

      dispatch(setTeams(teams));
    }
    
    return <WrappedComponent {...props} />;
  };

  return CommonLogicWrapper;
};

export default withCommonLogic;