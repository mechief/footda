import { createSlice } from "@reduxjs/toolkit";

import { initTooltip } from "../actions/statTooltip";

const statTooltipSlice = createSlice({
  name: 'statTooltip',
  initialState: {
    players: {},
    activeTooltip: null,
  },

  reducers: {
    openTooltip: (state, action) => {
      console.log('open tooltip!');
      state.activeTooltip = action.payload;
    }
  },
  extraReducers: {
    [initTooltip.pending]: (state, action) => {
      console.log('pending...');
    },
    [initTooltip.fulfilled]: (state, action) => {
      console.log('fulfilled...');
      if (!state.players.hasOwnProperty(action.payload.player.id)) {
        state.players[action.payload.player.id] = {};
      }

      state.players[action.payload.player.id] = action.payload;
    },
    [initTooltip.rejected]: (state, action) => {
      console.log('rejected...');
    },
  }
});

export const {
  clickTooltipButton,
  openTooltip,
} = statTooltipSlice.actions;

export default statTooltipSlice;