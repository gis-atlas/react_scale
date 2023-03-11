import { createSlice } from '@reduxjs/toolkit';
// import { mapBaseLayers } from './baseLayers';
import { mapBaseLayers } from '../../data/baselayers';
import { INITIAL_VIEW_STATE, views } from './mapConfig';

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
  },
  reducers: {},
});

export default mapSlice.reducer;
