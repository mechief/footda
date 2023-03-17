import { createSlice } from "@reduxjs/toolkit";

const liveWidgetSlice = createSlice({
  name: 'liveWidget',
  initialState: {
    isSidebarOpened: false,
    widgetFixtureIds: [],
  },

  reducers: {
    openSidebar: (state) => {
      state.isSidebarOpened = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpened = false;
    },
    addLiveWidget: (state, action) => {
      if (!state.widgetFixtureIds.find((fixtureId) => fixtureId === action.payload)) {
        state.widgetFixtureIds = [...state.widgetFixtureIds, action.payload];
      }
    },
    removeLiveWidget: (state, action) => {
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
  addLiveWidget,
  removeLiveWidget,
} = liveWidgetSlice.actions;

export default liveWidgetSlice;