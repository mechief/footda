import { createSlice } from "@reduxjs/toolkit";

const fixtureSlice = createSlice({
  name: 'fixture',
  initialState: {
    fixtures: [],
  },

  reducers: {
    addFixtures: (state, action) => {
      const newFixtures = action.payload.filter(item => {
        return state.fixtures.findIndex(v => v.fixture.id === item.fixture.id) === -1 ? true : false;
      });
      state.fixtures = [...state.fixtures, ...newFixtures];
    },
  }
});

export default fixtureSlice;