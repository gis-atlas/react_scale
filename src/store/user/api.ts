import client from '../../services';
import { ILogin, IProfileUpdate, IRegister } from './type';

const UserAPI = {
  async login({ email, password }: ILogin) {
    return client.post('/api/auth/login', {
      email,
      password,
    });
  },
  async register({ email, password, confirm_password }: IRegister) {
    return client.post('/api/auth/signup', {
      email,
      pwd: password,
      confirm: confirm_password,
    });
  },
  async getProfileData() {
    return client.get('/api/auth/profile');
  },
  async updateProfileData({
    firstName,
    lastName,
    telegram,
    city,
    birthday,
  }: IProfileUpdate) {
    return client.put('/api/auth/profile', {
      firstName,
      lastName,
      telegram,
      city,
      birthday,
    });
  },
};

export default UserAPI;
