interface ILayerCard {
  id: number;
  name?: string;
  layerType: '3d' | 'demos' | 'relief';
  layerGroupId: number;
}
