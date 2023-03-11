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

      // state.controls.view.text = text;
    },
    toggleView: state => {
      state.controls.view.state = !state.controls.view.state;
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
