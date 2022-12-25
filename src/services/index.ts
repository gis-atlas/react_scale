import axios from 'axios';

export default axios.create({
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
  proxy: {
    host: 'https://app.gis.earth',
    port: 80,
  },
});
