import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'

import currentFixtureSlice from '../slices/currentFixtureSlice';
import statTooltipSlice from '../slices/statTooltipSlice';
import liveWidgetSlice from '../slices/liveWidgetSlice';
import userSettingSlice from '../slices/userSettingSlice';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['userSetting'],
  // blacklist: [],
};

const liveWidgetPersistConfig = {
  key: 'liveWidget',
  storage: storage, 
  whiteList: ['widgetFixtureIds'],
}

/**
 * currentFixture: 현재 보고 있는 경기 (상세 정보 포함)
 * statTooltip: fixture 내 선수 기록 툴팁
 * listWidget: 라이브 경기, 위젯에 노출할 경기의 id 리스트
 * userSetting: 유저 설정
 */
const rootReducer = combineReducers({
  currentFixture: currentFixtureSlice.reducer,
  statTooltip: statTooltipSlice.reducer,
  liveWidget: persistReducer(liveWidgetPersistConfig, liveWidgetSlice.reducer),
  userSetting: userSettingSlice.reducer,
});

const reducer = persistReducer(rootPersistConfig, rootReducer)

export default reducer;