const OSM = {
  id: 1,
  title: 'Open Street Map',
  style: {
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '&copy; OpenStreetMap Contributors',
        maxzoom: 19,
      },
    },
    layers: [
      {
        id: 'osm',
        type: 'raster',
        source: 'osm', // This must match the source key above
      },
    ],
  },
};

const Google = [
  {
    id: 2,
    title: 'Google Sattelite',
    style: 'https://demotiles.maplibre.org/style.json',
  },
];

export const mapData = [OSM, ...Google];
