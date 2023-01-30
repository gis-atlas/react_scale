import client from '../../services';

const LayerAPI = {
  async loadLayerGroups(projectId: number) {
    return client.get(`/api/project/layer_group/${projectId}`);
  },
  async loadLayers(layerGroupId: number) {
    return client.get(`/api/project/layer/${layerGroupId}`);
  },
  async loadVectorLayer(layerId: number) {
    return client.get(`/api/vector/${layerId}`);
  },
  async loadRasterLayer(layerId: number) {
    return client.get(`/api/TMS/${layerId}/metadata`);
  },
  async loadModelLayer(layerId: number) {
    return client.get(`/api/model/${layerId}/czml`);
  },
  async getVectorBounds(layerId: number) {
    return client.get(`/api/vector/${layerId}/box`);
  },
  async loadGLTFModel(layerId: number, modelName: string) {
    return client.get(`/api/model/${layerId}/${modelName}`);
  },
};

export default LayerAPI;
