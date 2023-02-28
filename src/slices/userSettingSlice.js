import { createSlice } from "@reduxjs/toolkit";

const userSettingSlice = createSlice({
  name: 'userSetting',
  initialState: {
    scheduleLeaguesFilter: [],
  },
  reducers: {
    addScheduleLeaguesFilterId: (state, action) => {
      if (!state.scheduleLeaguesFilter.includes(action.payload)) {
        state.scheduleLeaguesFilter = [...state.scheduleLeaguesFilter, action.payload];
      }
    },
    removeScheduleLeaguesFilterId: (state, action) => {
      if (state.scheduleLeaguesFilter.includes(action.payload)) {
        const newLeagueIds = [...state.scheduleLeaguesFilter];
        const targetIdx = newLeagueIds.findIndex(id => id === action.payload);
        newLeagueIds.splice(targetIdx, 1);

        state.scheduleLeaguesFilter = newLeagueIds;
      }
    },
    removeAllScheduleLeaguesFilterId: (state) => {
      state.scheduleLeaguesFilter = [];
    },
  }
});

export const {
  addScheduleLeaguesFilterId,
  removeScheduleLeaguesFilterId,
  removeAllScheduleLeaguesFilterId,
} = userSettingSlice.actions;

export default userSettingSlice;