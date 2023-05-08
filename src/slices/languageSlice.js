import { createSlice } from "@reduxjs/toolkit";

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    'ko-kr': {
      teams: {},
      teamsLength: 0,
    }
  },
  reducers: {
    setTeams: (state, action) => {
      console.log(action.payload, Object.keys(action.payload).length);
      state['ko-kr'].teams = action.payload;
      state['ko-kr'].teamsLength = Object.keys(action.payload).length;
    },
  }
});

export const {
  setTeams,
} = languageSlice.actions;

export default languageSlice;