import { createSlice } from '@reduxjs/toolkit';
import { mapBaseLayers } from '../../data/baselayers';

export const mapSlice = createSlice({
  name: 'user',
  initialState: {
    mapInfo: {
      ...mapBaseLayers[1],
    },
  },
  reducers: {
    setMapInfo: (state, action) => {
      state.mapInfo = action.payload;
    },
  },
});

export const { setMapInfo } = mapSlice.actions;
export default mapSlice.reducer;
