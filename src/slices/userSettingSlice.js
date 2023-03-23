import { createSlice } from "@reduxjs/toolkit";

const userSettingSlice = createSlice({
  name: 'userSetting',
  initialState: {
    scheduleAsideType: 0,
    scheduleLeaguesFilter: [],
  },
  reducers: {
    setScheduleAsideType: (state, action) => {
      state.scheduleAsideType = action.payload;
    },
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
  setScheduleAsideType,
  addScheduleLeaguesFilterId,
  removeScheduleLeaguesFilterId,
  removeAllScheduleLeaguesFilterId,
} = userSettingSlice.actions;

export default userSettingSlice;