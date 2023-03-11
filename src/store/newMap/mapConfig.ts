import { MapView, OrthographicView, _GlobeView } from '@deck.gl/core/typed';
import { MeasureAngleMode, MeasureAreaMode } from 'nebula.gl';

export const INITIAL_VIEW_STATE = {
  longitude: 37.618423,
  latitude: 55.751244,
  zoom: 9,
} as any;

// icon === true ? (оставляем shortName, но ставим src до картинки)
// : (оставляем shortName без src)

export const views: any = [
  {
    name: '2D',
    shortName: '2D',
    icon: false,
    mode: new OrthographicView({}),
  },
  {
    name: '3D',
    shortName: '3D',
    icon: false,
    mode: new MapView({}),
  },
  {
    name: 'Terrain',
    icon: true,
    src: '/images/icons/map/terrain.svg',
    view: new MapView({}),
  },
  {
    name: 'Глобус',
    shortName: 'Globe',
    icon: true,
    src: '/images/icons/map/globe.svg',
    mode: new _GlobeView({}),
  },
];

export const modes = {
  measure: [
    {
      label: 'Расстояние',
      units: 'км',
      mode: MeasureAngleMode,
    },
    {
      label: 'Площадь',
      units: 'км',
      mode: MeasureAreaMode,
    },
  ],
};
