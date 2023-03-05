import { MapView, _GlobeView } from '@deck.gl/core/typed';

export const INITIAL_VIEW_STATE = {
  longitude: 37.618423,
  latitude: 55.751244,
  zoom: 9,
} as any;

export const views = {
  '2D': {
    text: '2D',
    type: '2D',
    view: new MapView({}),
  },
  '3D': {
    text: '3D',
    type: '3D',
    view: new MapView({}),
  },
  TERRAIN: {
    icon: '/images/icons/map/terrain.svg',
    type: 'TERRAIN',
    view: new MapView({}),
  },
  GLOBE: {
    icon: '/images/icons/map/globe.svg',
    type: 'GLOBE',
    view: new _GlobeView({}),
  },
};
