import axios from 'axios';
import authHeader from './auth-header';
const config = require('../config');

class UserService {
  getPublicContent() {
    return axios.get(config.api_url + '/test/all');
  }

  getUserBoard() {
    return axios.get(config.api_url + '/test/user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(config.api_url + '/test/mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(config.api_url + '/test/admin', { headers: authHeader() });
  }
}

export default new UserService();