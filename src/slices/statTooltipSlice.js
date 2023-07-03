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
      state.activeTooltip = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initTooltip.pending, (state, action) => {
      })
      .addCase(initTooltip.fulfilled, (state, action) => {
        if (!state.players.hasOwnProperty(action.payload.player.id)) {
          state.players[action.payload.player.id] = {};
        }

        state.players[action.payload.player.id] = action.payload;
      })
      .addCase(initTooltip.rejected, (state, action) => {
      })
  },
});

export const {
  clickTooltipButton,
  openTooltip,
} = statTooltipSlice.actions;

export default statTooltipSlice;