import { createSlice } from '@reduxjs/toolkit';
import { mapBaseLayers } from '../../data/baselayers';

const INITIAL_VIEW_STATE = {
  longitude: 37.618423,
  latitude: 55.751244,
  zoom: 9,
};

export const mapSlice = createSlice({
  name: 'user',
  initialState: {
    baseLayer: mapBaseLayers[0],
    viewState: INITIAL_VIEW_STATE,
  },
  reducers: {
    setBaseLayer: (state, action) => {
      state.baseLayer = action.payload;
    },
    setViewState: (state, action) => {
      state.viewState = action.payload;
    },
  },
});

export const { setBaseLayer, setViewState } = mapSlice.actions;
export default mapSlice.reducer;
