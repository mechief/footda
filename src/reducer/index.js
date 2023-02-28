import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'

import currentFixtureSlice from '../slices/currentFixtureSlice';
import fixtureSlice from '../slices/fixtureSlice';
import statTooltipSlice from '../slices/statTooltipSlice';
import liveWidgetSlice from '../slices/liveWidgetSlice';
import userSettingSlice from '../slices/userSettingSlice';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['userSetting'],
  // blacklist: [],
};

/**
 * currentFixture: 현재 보고 있는 경기 (상세 정보 포함)
 * fixture: 전체 경기의 리스트 데이터 (fixtures)
 * statTooltip: fixture 내 선수 기록 툴팁
 * listWidget: 라이브 경기, 위젯에 노출할 경기의 id 리스트
 */
const rootReducer = combineReducers({
  currentFixture: currentFixtureSlice.reducer,
  fixture: fixtureSlice.reducer,
  statTooltip: statTooltipSlice.reducer,
  liveWidget: liveWidgetSlice.reducer,
  userSetting: userSettingSlice.reducer,
});

const reducer = persistReducer(rootPersistConfig, rootReducer)

export default reducer;