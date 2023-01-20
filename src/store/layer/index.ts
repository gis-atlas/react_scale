import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import LayerAPI from './api';

export const getLayerGroups = createAsyncThunk(
  'layer/getLayerGroup',
  async (projectId: number) => {
    const result = await LayerAPI.getLayerGroups(projectId);
    return result.data;
  }
);

export const getLayers = createAsyncThunk(
  'layer/getLayer',
  async (layerGroupId: number) => {
    const result = await LayerAPI.getLayers(layerGroupId);
    return result.data;
  }
);

export const getLayer = createAsyncThunk(
  'layer/getLayer',
  async ({ type, id }: { id: number; type: string | undefined }, thunkApi) => {
    if (type === 'VECTOR') {
      thunkApi.dispatch(getVectorLayer(id));
    } else if (type === 'RASTER') {
      console.log('RASTER LAYER IN getLayer func');
      thunkApi.dispatch(getRasterLayer(id));
    } else {
      console.log('PIZDEZ LAYER IN getLayer func');
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
    openedLayers: [] as any,
  },
  reducers: {
    removeLayer: (state, action) => {
      state.openedLayers = state.openedLayers.filter(
        (openedLayer: any) => openedLayer.id !== action.payload
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(getLayerGroups.fulfilled, (state, action) => {
      state.layerGroups = action.payload.list;
    });
    builder.addCase(getVectorLayer.fulfilled, (state, action) => {
      const newLayer = action.payload.data;
      state.openedLayers.push({
        id: action.payload.id,
        layer: newLayer,
        type: 'VECTOR',
      });
      console.log(state.openedLayers);
    });
    builder.addCase(getRasterLayer.fulfilled, (state, action) => {
      const newLayer = action.payload.data;
      state.openedLayers.push({
        id: action.payload.id,
        layer: newLayer,
        type: 'RASTER',
      });
      console.log(state.openedLayers);
    });
  },
});

export const { removeLayer } = layerSlice.actions;
export default layerSlice.reducer;
