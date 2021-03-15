import axios from 'axios';
import authHeader from './auth-header';

const config = require('../config');

class MovieService {

// ----# POST ROUTES #---- //

  create(movie) {
    return axios.post(config.api_url + '/movies/', movie, { headers: authHeader() });
  }

  watch(movieId){
    return axios.post(config.api_url + `/movies/${movieId}`,{body: "anything"}, { headers: authHeader() });
  }
  
  rate(movieId, movie) {
    return axios.post(config.api_url + `/movies/${movieId}/ratings`, movie, { headers: authHeader() });
  }
  
// ----# PUT ROUTES #---- //

  updateMovie(movieId, movie) {
    return axios.put(config.api_url + `/movies/${movieId}`, movie, { headers: authHeader() });
  }

  updateOwnRating(movieId, rating) {
    return axios.put(config.api_url + `/movies/${movieId}/ratings`, rating, { headers: authHeader() });
  }
  
  updateRating(movieId, userId, rating) {
    return axios.put(config.api_url + `/movies/${movieId}/ratings/${userId}`, rating, { headers: authHeader() });
  }

// ----# GET ROUTES #---- //

  getAll() {
    return axios.get(config.api_url + '/movies/', { headers: authHeader() });
  }  
  
  getOne(movieId){
    return axios.get(config.api_url + `/movies/${movieId}`, { headers: authHeader() });
  }
  
  getOwnViewed() {
    return axios.get(config.api_url + '/movies/viewed/', { headers: authHeader() });
  }  

  getAllViewed() {
    return axios.get(config.api_url + '/movies/views/', { headers: authHeader() });
  }

  getTopViewed() {
    return axios.get(config.api_url + '/movies/views/top', { headers: authHeader() });
  }

  filterMovies(search_text){
    return axios.get(config.api_url + `/movies/search/${search_text}`, { headers: authHeader() });
  }

  getAllRatings(movieId){
    return axios.get(config.api_url + `/movies/${movieId}/ratings`, { headers: authHeader() });
  }

  getOwnRatings(movieId){
    return axios.get(config.api_url + `/movies/${movieId}/rated`, { headers: authHeader() });
  }

  getAvgGrade(movieId){
    return axios.get(config.api_url + `/movies/${movieId}/avg_grade`, { headers: authHeader() });
  }

  getTopRated(){
    return axios.get(config.api_url + `/movies/ratings/top`, { headers: authHeader() });
  }

}

export default new MovieService();