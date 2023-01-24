import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer, GeoJsonLayer } from '@deck.gl/layers';

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
