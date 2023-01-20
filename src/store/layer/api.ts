import client from '../../services';

const LayerAPI = {
  async getLayerGroups(projectId: number) {
    return client.get(`/api/project/layer_group/${projectId}`);
  },
  async getLayers(layerGroupId: number) {
    return client.get(`/api/project/layer/${layerGroupId}`);
  },
  async getVectorLayer(layerId: number) {
    return client.get(`/api/vector/${layerId}`);
  },
  async getRasterLayer(layerId: number) {
    return client.get(`/api/TMS/${layerId}/metadata`);
  },
};

export default LayerAPI;
