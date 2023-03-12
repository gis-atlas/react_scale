import {
  FlyToInterpolator,
  MapView,
  OrbitView,
  OrthographicView,
  _GlobeView,
} from '@deck.gl/core/typed';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mapBaseLayers } from '../../data/baselayers';
import { findLayer, getCenterOfLayer, lat2Zoom } from '../../utils/deck';
import { RootState } from '../reducer';
import { INITIAL_VIEW_STATE, views } from './mapConfig';

export const mapSlice = createSlice({
  name: 'user',
  initialState: {
    view: new MapView({}) as any,
    mode: '',
    drawMode: '',
    subMenuName: '',
    baseLayer: mapBaseLayers[0],
    viewState: INITIAL_VIEW_STATE,
    newDataset: {} as any,
    controls: {
      ruler: {
        state: false,
        type: 'distance',
      },
      view: {
        state: false,
        text: '2D',
        icon: '',
      },
    },
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
    closeSubMenu: state => {
      state.subMenuName = '';
    },
    enableMeasureMode: state => {
      state.mode = 'measuring';
    },
    enableEditMode: state => {
      state.mode = 'editing';
    },
    disableMode: state => {
      state.mode = '';
    },
    setDrawMode: (state, action) => {
      state.drawMode = action.payload;
    },
    setDataset: (state, action) => {
      state.newDataset = action.payload;
    },
    removeFeatureFromDataset: (state, action) => {
      state.newDataset.features.filter(
        (datasetFeature: any) => datasetFeature.id !== action.payload
      );
    },
    toggleRuler: state => {
      state.controls.ruler.state = !state.controls.ruler.state;
    },
    setRulerType: (state, action) => {
      state.controls.ruler.type = action.payload;
    },
    setViewMode: (
      state,
      action: { payload: '2D' | '3D' | 'GLOBE' | 'TERRAIN' }
    ) => {
      const { view, ...viewControl } = views[action.payload] as any;
      state.view = view;
      state.controls.view = viewControl;
    },
    toggleView: state => {
      state.controls.view.state = !state.controls.view.state;
    },
  },
});

export const {
  setBaseLayer,
  setViewState,
  openSubMenu,
  closeSubMenu,
  enableEditMode,
  disableMode,
  setDrawMode,
  setDataset,
  removeFeatureFromDataset,
  toggleRuler,
  setRulerType,
  enableMeasureMode,
  setViewMode,
  toggleView,
} = mapSlice.actions;

export default mapSlice.reducer;
