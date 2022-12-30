import client from '../../services';

const ProjectAPI = {
  async getProjects() {
    return client.get('/api/project/project');
  },
};

export default ProjectAPI;
