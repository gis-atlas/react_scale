import { RootState } from './../reducer';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import LayerAPI from './api';
import { findLayer } from '../../utils/deck';

export const getLayerGroups = createAsyncThunk(
  'layer/getLayerGroup',
  async (projectId: number) => {
    const result = await LayerAPI.getLayerGroups(projectId);
    return result.data;
  }
);

export const getLayers = createAsyncThunk(
  'layer/getLayers',
  async (layerGroupId: number) => {
    const result = await LayerAPI.getLayers(layerGroupId);
    return result.data;
  }
);

export const getLayer = createAsyncThunk(
  'layer/getLayer',
  async ({ type, id }: { id: number; type: string | undefined }, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const {
      layer: { downloadedLayers },
    } = state;
    const cashedLayer = findLayer({ type, id }, downloadedLayers);
    console.log(cashedLayer);
    if (cashedLayer) {
      thunkApi.dispatch(setLayer(cashedLayer));
    } else {
      if (type === 'VECTOR') {
        thunkApi.dispatch(getVectorLayer(id));
      } else if (type === 'RASTER') {
        thunkApi.dispatch(getRasterLayer(id));
      } else {
        console.log('not not not not');
      }
    }
  }
);

export const getVectorLayer = createAsyncThunk(
  'layer/getVectorLayer',
  async (layerId: number) => {
    const result = await LayerAPI.getVectorLayer(layerId);
    return {
      id: layerId,
      data: result.data,
    };
  }
);

export const getRasterLayer = createAsyncThunk(
  'layer/getRasterLayer',
  async (layerId: number) => {
    const result = await LayerAPI.getRasterLayer(layerId);
    return {
      id: layerId,
      data: result.data,
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
    builder.addCase(getLayerGroups.fulfilled, (state, action) => {
      state.layerGroups = action.payload.list;
    });
    builder.addCase(getVectorLayer.fulfilled, (state, action) => {
      const layerData = {
        id: action.payload.id,
        layer: action.payload.data,
        type: 'VECTOR',
      };
      state.openedLayers.push(layerData);
      state.downloadedLayers.push(layerData);
    });
    builder.addCase(getRasterLayer.fulfilled, (state, action) => {
      const layerData = {
        id: action.payload.id,
        layer: action.payload.data,
        type: 'RASTER',
      };
      state.openedLayers.push(layerData);
      state.downloadedLayers.push(layerData);
    });
  },
});

export const { removeLayer, setLayer } = layerSlice.actions;
export default layerSlice.reducer;
