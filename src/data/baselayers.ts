const OSM = {
  title: 'Open Street Map',
  imageSrc: '/images/map/open-street-maps.jpg',
  layer: {
    id: 'OSM',
    type: 'TileLayer',
    data: 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
  },
};

const GoogleMaps = [
  {
    title: 'Google Hybrid',
    imageSrc: '/images/map/google-maps.jpg',
    layer: {
      id: 'Hybrid',
      type: 'TileLayer',
      data: [
        'https://mt0.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        'https://mt1.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        'https://mt2.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
        'https://mt3.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      ],
    },
  },
  {
    title: 'Google Sattelite',
    imageSrc: '/images/map/google-maps.jpg',
    layer: {
      id: 'Sattelite',
      type: 'TileLayer',
      data: [
        'https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        'https://mt2.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
        'https://mt3.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      ],
    },
  },
  {
    title: 'Google Streets',
    imageSrc: '/images/map/google-maps.jpg',
    layer: {
      id: 'Streets',
      type: 'TileLayer',
      data: [
        'https://mt0.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        'https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        'https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      ],
    },
  },
  {
    title: 'Google Terrain',
    imageSrc: '/images/map/google-maps.jpg',
    layer: {
      id: 'Terrain',
      type: 'TileLayer',
      data: [
        'https://mt0.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
        'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
        'https://mt2.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
        'https://mt3.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      ],
    },
  },
];

export const mapBaseLayers = [OSM, ...GoogleMaps];
