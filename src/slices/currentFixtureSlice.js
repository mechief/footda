import { createSlice } from "@reduxjs/toolkit";

const currentFixtureSlice = createSlice({
  name: 'currentFixture',
  initialState: {
    id: '',
    date: '',
    referee: '',
    status: {},
    venue: {},
    goals: {},
    league: {},
    lineups: [],
    players: [],
    score: {},
    statistics: [],
    events: [],
    teams: {},
  },

  reducers: {
    setId: (state, action) => {
      state.id = action.payload;
    },
    setFixture: (state, action) => {
      state = {...state,
        date: action.payload.fixture.date,
        referee: action.payload.fixture.referee,
        status: action.payload.fixture.status,
        venue: action.payload.fixture.venue,
        goals: action.payload.goals,
        league: action.payload.league,
        lineups: action.payload.lineups,
        players: action.payload.players,
        score: action.payload.score,
        statistics: action.payload.statistics,
        events: action.payload.events,
        teams: action.payload.teams,
      }
      return state;
    },
  }
});

export const {
  setId,
  setFixture,
} = currentFixtureSlice.actions;

export default currentFixtureSlice;