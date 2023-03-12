import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bbox from '@turf/bbox';
import {
  createRasterLayer,
  createVectorLayer,
  findLayer,
} from '../../utils/deck';
import { addLayer, showLayer } from '../newMap';
import { RootState } from './../reducer';
import LayerAPI from './api';

export const loadLayerGroups = createAsyncThunk(
  'layer/loadLayerGroups',
  async (projectId: number) => {
    const result = await LayerAPI.loadLayerGroups(projectId);
    return result.data;
  }
);

export const loadLayers = createAsyncThunk(
  'layer/loadLayers',
  async (layerGroupId: number) => {
    const result = await LayerAPI.loadLayers(layerGroupId);
    return result.data;
  }
);

export const loadLayer = createAsyncThunk(
  'layer/loadLayer',
  async ({ type, id }: { id: number; type: string | undefined }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const {
      layer: { downloadedLayers },
    } = state;
    console.log(type);
    const cashedLayer = findLayer({ type, id }, downloadedLayers);
    if (cashedLayer) {
      thunkApi.dispatch(setLayer(cashedLayer));
    } else {
      if (type === 'VECTOR') {
        await thunkApi.dispatch(loadVectorLayer(id));
      } else if (type === 'RASTER') {
        await thunkApi.dispatch(loadRasterLayer(id));
      } else if (type === 'MODEL') {
        await thunkApi.dispatch(loadModelLayer(id));
      } else {
        console.log('!Vector !Raster !Model');
      }
    }
  }
);

export const loadVectorLayer = createAsyncThunk(
  'layer/loadVectorLayer',
  async (layerId: number, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const cashedLayer = findLayer({ id: layerId }, state.newMap.layers.opened);
    if (cashedLayer) {
      thunkApi.dispatch(showLayer(layerId));
      return;
    }
    const result = await LayerAPI.loadVectorLayer(layerId);
    const extent = bbox(result.data);
    const layer = createVectorLayer(layerId, {
      ...result.data,
      bounds: extent,
    });
    thunkApi.dispatch(addLayer(layer));
  }
);

export const loadRasterLayer = createAsyncThunk(
  'layer/loadRasterLayer',
  async (layerId: number, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const cashedLayer = findLayer({ id: layerId }, state.newMap.layers.opened);
    if (cashedLayer) {
      thunkApi.dispatch(showLayer(layerId));
      return;
    }
    const result = await LayerAPI.loadRasterLayer(layerId);
    console.log(result.data);
    const layer = createRasterLayer(layerId, result.data);
    thunkApi.dispatch(addLayer(layer));
  }
);

export const loadModelLayer = createAsyncThunk(
  'layer/loadModelLayer',
  async (layerId: number) => {
    const result = await LayerAPI.loadModelLayer(layerId);
    const info = result.data.czml;
    const modelName = result.data.czml[1].model.gltf.split('/').slice(-1)[0];
    const { data: model } = await LayerAPI.loadGLTFModel(layerId, modelName);
    return {
      id: layerId,
      data: { info, model },
    };
  }
);

export const layerSlice = createSlice({
  name: 'user',
  initialState: {
    layerGroups: [],
    downloadedLayers: [] as any,
    openedLayers: [] as any,
  },
  reducers: {
    clearLayers: state => {
      state.openedLayers = [];
    },
    removeLayer: (state, action) => {
      state.openedLayers = state.openedLayers.filter(
        (openedLayer: any) => openedLayer.id !== action.payload
      );
    },
    setLayer: (state, action) => {
      state.openedLayers.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(loadLayerGroups.fulfilled, (state, action) => {
      state.layerGroups = action.payload.list;
    });
    builder.addCase(loadModelLayer.fulfilled, (state, action) => {
      const layerData = {
        id: action.payload.id,
        layer: action.payload.data,
        type: 'MODEL',
      };
      state.openedLayers.push(layerData);
      state.downloadedLayers.push(layerData);
    });
  },
});

export const { removeLayer, setLayer, clearLayers } = layerSlice.actions;
export default layerSlice.reducer;
