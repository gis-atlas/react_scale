import client from '../../services';

const UploadAPI = {
  async upload(projectId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return client.post(`/api/upload?projectId=${projectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  async publish(data: any) {
    return client.post('/api/publish', data);
  },
};

export default UploadAPI;
