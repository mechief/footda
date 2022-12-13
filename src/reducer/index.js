import { combineReducers } from '@reduxjs/toolkit';

import currentFixtureSlice from '../slices/currentFixtureSlice';
import fixtureSlice from '../slices/fixtureSlice';
import statTooltipSlice from '../slices/statTooltipSlice';
import liveWidgetSlice from '../slices/liveWidgetSlice';

/**
 * currentFixture: 현재 보고 있는 경기 (상세 정보 포함)
 * fixture: 전체 경기의 리스트 데이터 (fixtures)
 * listWidget: 라이브 경기, 위젯에 노출할 경기의 id 리스트
 */
const reducer = combineReducers({
  currentFixture: currentFixtureSlice.reducer,
  fixture: fixtureSlice.reducer,
  statTooltip: statTooltipSlice.reducer,
  liveWidget: liveWidgetSlice.reducer,
});

export default reducer;