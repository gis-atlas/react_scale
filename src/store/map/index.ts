import { createSlice } from '@reduxjs/toolkit';
import { mapData } from '../../components/Map/Menu/Tabs/Maps/mapData';

export const mapSlice = createSlice({
  name: 'user',
  initialState: {
    mapData: mapData[0],
  },
  reducers: {
    setMapData: (state, action) => {
      state.mapData = action.payload;
    },
  },
  extraReducers(builder) {},
});

export const { setMapData } = mapSlice.actions;
export default mapSlice.reducer;
