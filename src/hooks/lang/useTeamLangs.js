import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getLangTeams } from "../../api/lang";
import { setTeams } from "../../slices/languageSlice";

const useTeamLangs = (lang = 'ko-kr') => {
  const dispatch = useDispatch();
  const langTeamsExpireTime = useSelector((state) => state.language?.expireTime?.teams);

  useEffect(() => {
    if (!langTeamsExpireTime || Date.now() > langTeamsExpireTime) {
      const fetchLangTeams = async () => {
        const teams = await getLangTeams(lang);
  
        dispatch(setTeams({ teams, lang }));
      }
      
      fetchLangTeams();
    }
  }, []);
}

export default useTeamLangs;
