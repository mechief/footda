import { combineReducers } from '@reduxjs/toolkit';
import currentFixtureSlice from '../slices/currentFixtureSlice';
import fixtureSlice from '../slices/fixtureSlice';
import statTooltipSlice from '../slices/statTooltipSlice';

const reducer = combineReducers({
  currentFixture: currentFixtureSlice.reducer,
  fixture: fixtureSlice.reducer,
  statTooltip: statTooltipSlice.reducer,
});

export default reducer;