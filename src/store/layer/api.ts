import client from '../../services';

const LayerAPI = {
  async getLayerGroups(projectId: number) {
    return client.get(`/api/project/layer_group/${projectId}`);
  },
};

export default LayerAPI;
