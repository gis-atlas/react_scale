import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer, GeoJsonLayer } from '@deck.gl/layers';
import bbox from '@turf/bbox';
import bboxPolygon from '@turf/bbox-polygon';
import center from '@turf/center';

export const createTileLayer = (mapStyle) => {
  return new TileLayer({
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    ...mapStyle,
    renderSubLayers: (props) => {
      const {
        bbox: { west, south, east, north },
      } = props.tile;

      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north],
      });
    },
  });
};

export const getCenterOfLayer = (bounds) => {
  console.log('bounds', bounds);
  const c = center(bboxPolygon(bounds));
  console.log('c', c);
  return c.geometry.coordinates;
};

export const findLayer = (layer, layerList) => {
  return layerList.filter(
    (layerListItem) =>
      layerListItem.id === layer.id && layerListItem.type === layer.type
  )[0];
};

export const createLayer = (id, type, data) => {
  switch (type) {
    case 'VECTOR':
      return createVectorLayer(id, data);
    case 'RASTER':
      return createRasterLayer(id, data);
    default:
      return null;
  }
};

export const createVectorLayer = (id, data) => {
  return new GeoJsonLayer({
    id,
    data,
    opacity: 0.75,
    stroked: true,
    filled: true,
    filledOpacity: 0.25,
  });
};

export const createRasterLayer = (id, data) => {
  const { minzoom, maxzoom } = data;
  console.log('metadata', data.metadata);
  console.log('data', data);
  return new TileLayer({
    id: id,
    tileSize: 256,
    data: `/api/TMS/${id}/{z}/{x}/{-y}.png`,
    minZoom: minzoom,
    maxZoom: maxzoom,
    loadOptions: {
      fetch: {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      },
    },
    renderSubLayers: (props) => {
      console.log('props', props);
      const {
        bbox: { west, south, east, north },
      } = props.tile;

      return new BitmapLayer(props, {
        data: null,
        image: props.data,
        bounds: [west, south, east, north],
      });
    },
  });
};

const ZOOM_AREA = [
  357.989981115706, 178.9949905578533, 89.49749527892665, 44.74874763946327,
  22.37437381973166, 11.187186909865837, 5.5935934549329, 2.796796727466522,
  1.3983983637333335, 0.6991991818663776, 0.349599590933478,
  0.17479979546558225, 0.08739989773510458, 0.043699948862925414,
  0.021849974431462707, 0.01092498723423886, 0.005462493580104415,
  0.002731246753037193, 0.0013656235245786486, 0.0006828116142292641,
  0.0003414055109943514, 0.0001707027554971757, 0.0000853501932587325,
  0.00004267746555976466, 0.00002133873277988233,
];

export const lat2Zoom = (lat) => {
  var res = 0;

  while (lat < ZOOM_AREA[res]) res++;

  return res + 1;
};
