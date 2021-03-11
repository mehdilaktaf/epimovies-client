import axios from 'axios';
import authHeader from './auth-header';

const config = require('../config');

class MovieService {
  getAllMovies() {
    
    return axios.get(config.api_url + '/movies/', { headers: authHeader() });
  }  
  
  getViewedMovies() {
    return axios.get(config.api_url + '/movies/viewed/', { headers: authHeader() });
  }

  watchMovie(movieId){
    return axios.post(config.api_url + `/movies/${movieId}`,{body: "anything"}, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(config.api_url + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(config.api_url + 'admin', { headers: authHeader() });
  }
}

export default new MovieService();