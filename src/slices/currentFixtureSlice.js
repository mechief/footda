import { createSlice } from "@reduxjs/toolkit";

const currentFixtureSlice = createSlice({
  name: 'currentFixture',
  initialState: {
    id: undefined,
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
    setFixtureId: (state, action) => {
      state.id = +action.payload;
    },
    setFixture: (state, action) => {
      const sortedEvent = action.payload.events.slice().sort((a, b) => {
        return a.time.elapsed - b.time.elapsed === 0 && (a.time.extra || b.time.extra)
          ? (a.time.extra || 0) - (b.time.extra || 0) 
          : a.time.elapsed - b.time.elapsed;
      });

      state = {
        ...state,
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
        events: sortedEvent,
        teams: action.payload.teams,
      }
      return state;
    },
  }
});

export const {
  setFixtureId,
  setFixture,
} = currentFixtureSlice.actions;

export default currentFixtureSlice;