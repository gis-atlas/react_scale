import { createSlice } from '@reduxjs/toolkit';
import { mapBaseLayers } from './baseLayers';
import { INITIAL_VIEW_STATE, modes, views } from './mapConfig';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    layers: {
      opened: [],
      cashed: [],
      baseTile: mapBaseLayers[3],
    },
    config: {
      view: views[1],
      viewState: INITIAL_VIEW_STATE,
      controller: true,
    },
    controls: {
      view: {
        status: false,
        mode: views[1],
      },
      ruler: {
        status: false,
        mode: modes.measure[0],
      },
    },
  },
  reducers: {
    toggleRuler: state => {
      state.controls.ruler.status = !state.controls.ruler.status;
    },
    setRulerMode: (state, action) => {
      console.log(action.payload);
      state.controls.ruler.mode = action.payload;
      state.controls.ruler.status = false;
    },
    toggleView: state => {
      state.controls.view.status = !state.controls.view.status;
    },
    setViewMode: (state, action) => {
      console.log(action.payload);
      state.controls.view.mode = action.payload;
      state.config.view = action.payload;
      state.controls.view.status = false;
    },
  },
});

export const { toggleRuler, setRulerMode, toggleView, setViewMode } =
  mapSlice.actions;

export default mapSlice.reducer;
