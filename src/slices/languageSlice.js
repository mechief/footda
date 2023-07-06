import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    'expireTime': {
      teams: null,
    },
    'ko-kr': {
      teams: {},
      teamsLength: 0,
    }
  },
  reducers: {
    setTeams: (state, action) => {
      const lang = action.payload.lang;
      
      state[lang].teams = action.payload.teams;
      state[lang].teamsLength = Object.keys(action.payload.teams).length;
      state.expireTime.teams = Date.now() + 86400; // 1일 후 
    },
  }
});

export const {
  setTeams,
} = languageSlice.actions;

export default languageSlice;