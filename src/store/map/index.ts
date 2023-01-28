import { RootState } from './../reducer';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mapBaseLayers } from '../../data/baselayers';
import { findLayer, getCenterOfLayer, lat2Zoom } from '../../utils/deck';
import { FlyToInterpolator } from '@deck.gl/core/typed';

const INITIAL_VIEW_STATE = {
  longitude: 37.618423,
  latitude: 55.751244,
  zoom: 9,
} as any;

export const flyToLayer = createAsyncThunk(
  'map/flyToLayer',
  async ({ id, layerType }: any, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const {
      layer: { openedLayers },
    } = state;
    console.log('opened ', id, ' ', openedLayers);
    const { layer } = findLayer({ id: id, type: layerType }, openedLayers);
    const centerOfLayer = getCenterOfLayer(layer.bounds);
    const dx = layer.bounds[2] - layer.bounds[0];
    const dy = layer.bounds[3] - layer.bounds[1];
    const maxDiff = dx > dy ? dx : dy;
    return { centerOfLayer, maxDiff };
  }
);

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
  extraReducers(builder) {
    builder.addCase(flyToLayer.fulfilled, (state, action) => {
      const [longitude, latitude] = action.payload.centerOfLayer;
      const maxDiff = action.payload.maxDiff;
      const zoom = lat2Zoom(maxDiff);
      state.viewState = {
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
        latitude,
        longitude,
        zoom,
      };
    });
  },
});

export const { setBaseLayer, setViewState } = mapSlice.actions;
export default mapSlice.reducer;
