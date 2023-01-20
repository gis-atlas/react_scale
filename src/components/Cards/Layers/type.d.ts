interface ILayerCard {
  id: number;
  name?: string;
  layerType?: 'VECTOR' | string;
  layerIconType: '3d' | 'demos' | 'relief';
}
