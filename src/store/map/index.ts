import { RootState } from './../reducer';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mapBaseLayers } from '../../data/baselayers';
import { findLayer, getCenterOfLayer, lat2Zoom } from '../../utils/deck';
import { FlyToInterpolator } from '@deck.gl/core/typed';

const TEST_INITIAL_VIEW_STATE = {
  longitude: 37.5097025333,
  latitude: 55.9520638334,
  zoom: 13,
} as any;

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
    const { layer } = findLayer({ id: id, type: layerType }, openedLayers);

    let centerOfLayer;
    let maxDiff;

    if (layerType === 'MODEL') {
      const [dx, dy] = layer.info[1].position.cartographicDegrees.slice(0, 2);
      centerOfLayer = [dx, dy];
      maxDiff = 0.02;
    } else {
      console.log('pizdez2');
      centerOfLayer = getCenterOfLayer(layer.bounds);
      const dx = layer.bounds[2] - layer.bounds[0];
      const dy = layer.bounds[3] - layer.bounds[1];
      maxDiff = Math.max(dx, dy);
    }

    return { centerOfLayer, maxDiff };
  }
);

export const mapSlice = createSlice({
  name: 'user',
  initialState: {
    baseLayer: mapBaseLayers[0],
    viewState: TEST_INITIAL_VIEW_STATE,
    subMenuName: '',
    mode: '',
  },
  reducers: {
    setBaseLayer: (state, action) => {
      state.baseLayer = action.payload;
    },
    setViewState: (state, action) => {
      state.viewState = action.payload;
    },
    openSubMenu: (state, action) => {
      state.subMenuName = action.payload;
    },
    closeSubMenu: (state) => {
      state.subMenuName = '';
    },
    enableEditMode: (state) => {
      state.mode = 'editing';
    },
    disableEditMode: (state) => {
      state.mode = '';
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

export const {
  setBaseLayer,
  setViewState,
  openSubMenu,
  closeSubMenu,
  enableEditMode,
  disableEditMode,
} = mapSlice.actions;
export default mapSlice.reducer;
