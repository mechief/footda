import { combineReducers } from '@reduxjs/toolkit';
import currentFixtureSlice from '../slices/currentFixtureSlice';
import fixtureSlice from '../slices/fixtureSlice';
import statTooltipSlice from '../slices/statTooltipSlice';
import liveWidgetSlice from '../slices/liveWidgetSlice';

const reducer = combineReducers({
  currentFixture: currentFixtureSlice.reducer,
  fixture: fixtureSlice.reducer,
  statTooltip: statTooltipSlice.reducer,
  liveWidget: liveWidgetSlice.reducer,
});

export default reducer;