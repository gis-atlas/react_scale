import { MapView, OrthographicView, _GlobeView } from '@deck.gl/core/typed';

export const INITIAL_VIEW_STATE = {
  longitude: 37.618423,
  latitude: 55.751244,
  zoom: 9,
} as any;

// icon === true ? (вместо shortName ставим src до картинки)
// : (оставляем shortName без src)

export const views: any = [
  {
    name: '2D',
    shortName: '2D',
    icon: false,
    view: new OrthographicView({}),
  },
  {
    name: '3D',
    shortName: '3D',
    icon: false,
    view: new MapView({}),
  },
  // {
  //   name: 'Terrain',
  //   icon: true,
  //   src: '/images/icons/map/terrain.svg',
  //   view: MapView,
  // },
  {
    name: 'Глобус',
    icon: true,
    src: '/public/images/icons/map/globe.svg',
    view: new _GlobeView({}),
  },
];

