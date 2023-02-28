import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer, GeoJsonLayer } from '@deck.gl/layers';
import { ScenegraphLayer } from '@deck.gl/mesh-layers';
import { load } from '@loaders.gl/core';
import { GLTFLoader } from '@loaders.gl/gltf';
import { EditableGeoJsonLayer } from '@nebula.gl/layers';
import bboxPolygon from '@turf/bbox-polygon';
import center from '@turf/center';

// layers

export const createTileLayer = mapStyle => {
  return new TileLayer({
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    ...mapStyle,
    renderSubLayers: props => {
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

export const createLayer = async (id, type, data) => {
  switch (type) {
    case 'VECTOR':
      return await createVectorLayer(id, data);
    case 'RASTER':
      return await createRasterLayer(id, data);
    case 'MODEL':
      return await createModelLayer(id, data);
    default:
      return null;
  }
};

export const createVectorLayer = (id, data) => {
  return new GeoJsonLayer({
    id: `vector-${id}`,
    data,
    opacity: 0.75,
    stroked: true,
    filled: true,
    filledOpacity: 0.25,
  });
};

export const createRasterLayer = (id, data) => {
  const { minzoom, maxzoom } = data;
  return new TileLayer({
    id: `raster-${id}`,
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
    renderSubLayers: props => {
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

export const createModelLayer = async (id, data) => {
  console.log(data);

  const urlToModel = data.info[1].model.gltf;
  const coordinates = data.info[1].position.cartographicDegrees;
  const sizeScale = data.info[1].model.scale || 500;
  const { heading, tilt, roll } = data.info[1].orientation;

  const model = await load(`/api${urlToModel}`, GLTFLoader, {
    fetch: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    },
  });
  console.log(data);
  return new ScenegraphLayer({
    id,
    sizeScale,
    scenegraph: model,
    data: [{ coordinates }],
    pickable: true,
    _lighting: 'pbr',
    getPosition: d => d.coordinates,
    getOrientation: d => [heading, tilt, roll + 90],
    getTranslation: [0, 0, 10 * coordinates[2]],
  });
};

// ----------------------------------------------------------------

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

export const lat2Zoom = lat => {
  var res = 0;

  while (lat < ZOOM_AREA[res]) res++;

  return res;
};

export const getCenterOfLayer = bounds => {
  const centerOfLayer = center(bboxPolygon(bounds));
  return centerOfLayer.geometry.coordinates;
};

export const findLayer = (layer, layerList) => {
  return layerList.filter(
    layerListItem =>
      layerListItem.id === layer.id && layerListItem.type === layer.type
  )[0];
};
