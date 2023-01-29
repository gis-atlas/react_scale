import { RootState } from './../reducer';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import LayerAPI from './api';
import { findLayer } from '../../utils/deck';

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
    const cashedLayer = findLayer({ type, id }, downloadedLayers);
    if (cashedLayer) {
      thunkApi.dispatch(setLayer(cashedLayer));
    } else {
      if (type === 'VECTOR') {
        await thunkApi.dispatch(loadVectorLayer(id));
      } else if (type === 'RASTER') {
        await thunkApi.dispatch(loadRasterLayer(id));
      } else {
        console.log('not VECTOR or RASTER');
      }
    }
  }
);

export const loadVectorLayer = createAsyncThunk(
  'layer/loadVectorLayer',
  async (layerId: number) => {
    const result = await LayerAPI.loadVectorLayer(layerId);
    const box = await LayerAPI.getVectorBounds(layerId);
    const {
      data: { ymin, ymax, xmin, xmax },
    } = box;
    const extent = [xmin, ymin, xmax, ymax];
    return {
      id: layerId,
      data: { ...result.data, bounds: extent },
    };
  }
);

export const loadRasterLayer = createAsyncThunk(
  'layer/loadRasterLayer',
  async (layerId: number) => {
    const result = await LayerAPI.loadRasterLayer(layerId);
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
    builder.addCase(loadLayerGroups.fulfilled, (state, action) => {
      state.layerGroups = action.payload.list;
    });
    builder.addCase(loadVectorLayer.fulfilled, (state, action) => {
      const layerData = {
        id: action.payload.id,
        layer: action.payload.data,
        type: 'VECTOR',
      };
      state.openedLayers.push(layerData);
      state.downloadedLayers.push(layerData);
    });
    builder.addCase(loadRasterLayer.fulfilled, (state, action) => {
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
