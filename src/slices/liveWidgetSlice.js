import { createSlice } from "@reduxjs/toolkit";

const liveWidgetSlice = createSlice({
  name: 'liveWidget',
  initialState: {
    sidebarOpened: false,
    liveFixtures: [],
    widgetFixtures: [],
  },

  reducers: {
    openSidebar: (state) => {
      state.sidebarOpened = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpened = false;
    },
    addWidgetFixture: (state, action) => {
      state.widgetFixtures = [...state.widgetFixtures, action.payload];
    },
  }
});

export const {
  openSidebar,
  closeSidebar,
  addWidgetFixture,
} = liveWidgetSlice.actions;

export default liveWidgetSlice;