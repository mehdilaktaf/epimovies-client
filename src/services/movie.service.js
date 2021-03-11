import axios from 'axios';
import authHeader from './auth-header';

const {API_URL} = require('../config')

class MovieService {
  getAllMovies() {
    return axios.get(API_URL + '/movies/', { headers: authHeader() });
  }

  getMovieBoard() {
    return axios.get(API_URL + 'Movie', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new MovieService();