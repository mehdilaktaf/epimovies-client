import axios from 'axios';
import authHeader from './auth-header';

const config = require('../config')

class MovieService {
  getAllMovies() {
    return axios.get(config.API_URL + '/movies/', { headers: authHeader() });
  }  
  
  getViewedMovies() {
    return axios.get(config.API_URL + '/movies/viewed/', { headers: authHeader() });
  }

  watchMovie(movieId){
    return axios.post(config.API_URL + `/movies/${movieId}`,{body: "anything"}, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(config.API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(config.API_URL + 'admin', { headers: authHeader() });
  }
}

export default new MovieService();