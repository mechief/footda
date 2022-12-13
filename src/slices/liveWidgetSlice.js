import { createSlice } from "@reduxjs/toolkit";

const liveWidgetSlice = createSlice({
  name: 'liveWidget',
  initialState: {
    isSidebarOpened: false,
    liveFixtureIds: [],
    widgetFixtureIds: [],
  },

  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpened = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpened = false;
    },
    addLiveFixtureIds: (state, action) => {
      state.liveFixtureIds = [...state.liveFixtureIds, ...action.payload];
    },
    addWidgetFixtureId: (state, action) => {
      if (!state.widgetFixtureIds.find((fixtureId) => fixtureId === action.payload)) {
        state.widgetFixtureIds = [...state.widgetFixtureIds, action.payload];
      }
    },
    removeWidgetFixtureId: (state, action) => {
      const newFixtureIds = [...state.widgetFixtureIds];
      const targetIdx = newFixtureIds.findIndex(id => id === action.payload);
      
      if (targetIdx >= 0) {
        newFixtureIds.splice(targetIdx, 1);
      }
      state.widgetFixtureIds = newFixtureIds;
    },
  }
});

export const {
  openSidebar,
  closeSidebar,
  addLiveFixtureIds,
  addWidgetFixtureId,
  removeWidgetFixtureId,
} = liveWidgetSlice.actions;

export default liveWidgetSlice;