import { createSlice } from "@reduxjs/toolkit";

const fixtureSlice = createSlice({
  name: 'fixture',
  initialState: {
    fixtures: [],
  },

  reducers: {
    addFixtures: (state, action) => {
      state.fixtures = [...state.fixtures, ...action.payload];
    },
  }
});

export default fixtureSlice;