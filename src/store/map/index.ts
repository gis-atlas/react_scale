import { FlyToInterpolator } from '@deck.gl/core/typed';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { findLayer, getCenterOfLayer, lat2Zoom } from '../../utils/deck';
import { RootState } from './../reducer';
import { mapBaseLayers } from './baseLayers';
import { INITIAL_VIEW_STATE, modes, views } from './mapConfig';

export const flyToSearchedItem = createAsyncThunk(
  'map/flyToSearchedItem',
  async (stringBounds: Array<any>) => {
    const bounds: any = [
      Number(stringBounds[2]),
      Number(stringBounds[0]),
      Number(stringBounds[3]),
      Number(stringBounds[1]),
    ];

    const centerOfItem = getCenterOfLayer(bounds);
    const dx = bounds[2] - bounds[0];
    const dy = bounds[3] - bounds[1];
    const maxDiff = Math.max(dx, dy);

    return {
      centerOfItem,
      maxDiff,
    };
  }
);

export const flyToLayer = createAsyncThunk(
  'map/flyToLayer',
  async ({ id }: any, thunkApi) => {
    const state = thunkApi.getState() as RootState;
    const {
      map: {
        layers: { opened },
      },
    } = state;
    const layer = findLayer({ id }, opened);
    const { bounds } = layer.props;

    let centerOfLayer;
    let maxDiff;

    centerOfLayer = getCenterOfLayer(bounds);
    const dx = bounds[2] - bounds[0];
    const dy = bounds[3] - bounds[1];
    maxDiff = Math.max(dx, dy);

    return { centerOfLayer, maxDiff };
  }
);

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    user: {
      subMenu: {
        name: '',
      },
      selectedLayer: {
        status: false,
        id: 0.5,
        name: '',
      } as any,
    },
    mode: {
      status: 'view',
      mode: modes.view[0],
    },
    layers: {
      opened: [] as any,
      baseTile: mapBaseLayers[3],
    },
    config: {
      view: views[1],
      viewState: INITIAL_VIEW_STATE,
      controller: { doubleClickZoom: false },
    },
    controls: {
      view: {
        status: false,
        mode: views[1],
      },
      ruler: {
        status: false,
        mode: modes.view[0],
      },
      search: {
        status: false,
        text: '',
        searchedItems: [],
      },
    },
    data: {
      createdDataset: {} as any,
    },
  },
  reducers: {
    toggleRuler: state => {
      state.controls.ruler.status = !state.controls.ruler.status;
      if (state.controls.ruler.status) {
        state.mode.status = 'edit';
      } else {
        state.mode.status = 'view';
      }
    },
    setRulerMode: (state, action) => {
      state.controls.ruler.mode = action.payload;
      state.mode.mode = action.payload;
    },
    toggleView: state => {
      state.controls.view.status = !state.controls.view.status;
    },
    setViewMode: (state, action) => {
      console.log(action.payload);
      state.controls.view.mode = action.payload;
      state.config.view = action.payload;
      state.controls.view.status = false;
    },
    addLayer: (state, action) => {
      state.layers.opened.push(action.payload);
    },
    hideLayer: (state, action) => {
      state.layers.opened.forEach((layer: any, index: number) => {
        if (layer.id === action.payload) {
          state.layers.opened[index] = layer.clone({ visible: false });
        }
      });
    },
    showLayer: (state, action) => {
      state.layers.opened.forEach((layer: any, index: number) => {
        if (layer.id === action.payload) {
          state.layers.opened[index] = layer.clone({ visible: true });
        }
      });
    },
    enableEditMode: state => {
      state.mode.status = 'edit';
    },
    disableEditMode: state => {
      state.mode.status = 'view';
    },
    setDrawMode: (state, action) => {
      state.mode.mode = action.payload;
    },
    setDataset: (state, action) => {
      state.data.createdDataset = action.payload;
    },
    setBaseTile: (state, action) => {
      state.layers.baseTile = action.payload;
    },
    setSubMenu: (state, action) => {
      state.user.selectedLayer.status = false;
      state.user.subMenu.name = action.payload;
    },
    closeSubMenu: state => {
      state.user.subMenu.name = '';
    },
    toggleSearch: state => {
      state.controls.search.status = !state.controls.search.status;
    },
    setSearchText: (state, action) => {
      state.controls.search.text = action.payload;
    },
    setSearchItems: (state, action) => {
      state.controls.search.searchedItems = action.payload;
    },
    setSelectedLayer: (state, action) => {
      state.user.subMenu.name = '';
      if (
        state.user.selectedLayer.id === action.payload.id &&
        state.user.selectedLayer.status
      ) {
        state.user.selectedLayer.status = false;
      } else {
        state.user.selectedLayer.id = action.payload.id;
        state.user.selectedLayer.name = action.payload.name;
        state.user.selectedLayer.status = true;
      }
    },
    disableSelectedLayer: state => {
      state.user.selectedLayer = {
        id: 0.5,
        name: '',
        status: false,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(flyToLayer.fulfilled, (state, action) => {
      console.log('act', action.payload);
      const [longitude, latitude] = action.payload.centerOfLayer;
      const maxDiff = action.payload.maxDiff;
      const zoom = lat2Zoom(maxDiff);
      state.config.viewState = {
        pitch: 0,
        bearing: 0,
        transitionDuration: 2000,
        transitionInterpolator: new FlyToInterpolator(),
        latitude,
        longitude,
        zoom,
      };
    });
    builder.addCase(flyToSearchedItem.fulfilled, (state, action) => {
      console.log('act', action.payload);
      const [longitude, latitude] = action.payload.centerOfItem;
      const maxDiff = action.payload.maxDiff;
      const zoom = lat2Zoom(maxDiff);
      state.config.viewState = {
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
  disableSelectedLayer,
  setSelectedLayer,
  disableEditMode,
  enableEditMode,
  setSearchItems,
  setSearchText,
  setRulerMode,
  toggleSearch,
  closeSubMenu,
  setViewMode,
  setDrawMode,
  setBaseTile,
  toggleRuler,
  toggleView,
  setDataset,
  setSubMenu,
  hideLayer,
  showLayer,
  addLayer,
} = mapSlice.actions;

export default mapSlice.reducer;
