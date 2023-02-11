import client from '../../services';

const ProjectAPI = {
  async getProjects() {
    return client.get('/api/project/project');
  },
  async getProject(projectId: number) {
    return client.get(`/api/project/project/${projectId}`);
  },
  async createProject(projectName: string) {
    return client.post('/api/project/project', {
      name: projectName,
    });
  },
};

export default ProjectAPI;
