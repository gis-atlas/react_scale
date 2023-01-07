import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import LayerAPI from './api';

export const getLayerGroups = createAsyncThunk(
  'layer/getLayerGroup',
  async (projectId: number) => {
    const result = await LayerAPI.getLayerGroups(projectId);
    return result.data;
  }
);

export const layerSlice = createSlice({
  name: 'user',
  initialState: {
    layerGroups: [],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getLayerGroups.fulfilled, (state, action) => {
      state.layerGroups = action.payload.list;
    });
  },
});

export default layerSlice.reducer;
