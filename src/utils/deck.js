import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';

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
