import { createSlice } from '@reduxjs/toolkit';

export const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    layerId: null,
    layerName: '',
    layerGroupId: null,
    srs: {},
  },
  reducers: {
    setUploadData(state, action) {
      const { layerId, layerName, layerGroupId, srs } = action.payload;
      console.log(layerId, layerName, layerGroupId, srs);
      state.layerGroupId = layerGroupId;
      state.layerName = layerName;
      state.layerId = layerId;
      state.srs = srs;
    },
  },
});

export const { setUploadData } = uploadSlice.actions;
export default uploadSlice.reducer;
