import React, { Component } from "react";
import MovieService from "../services/movie.service";
import MovieListHeading from "./movie-lists/movie-list-heading.component";
import MovieList from "./movie-lists/movie-list.component";
import SearchBox from "./movie-lists/search-box.component";
import WatchMovie from "./movie-lists/watch-movie.component";

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        movies: [],
        viewed: [],
        top_viewed: [],
        top_rated: [],
        content: "",
        movie: {},
        showMovie: true
    };

    this.clickWatch = this.clickWatch.bind(this);
    this.search_handler = this.search_handler.bind(this);

  }


  componentDidMount() {
    this.retrieveMoviesLists();
  }
  
  retrieveMoviesLists() {
    this.retrieveMovies();
    this.retrieveViewedMovies();
    this.retrieveTopViewedMovies();
    this.retrieveTopRatedMovies();
  }

  retrieveMovies(){
    MovieService.getAll()
    .then(response => {
        this.setState({
            movies: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  retrieveViewedMovies(){
    MovieService.getOwnViewed()
    .then(response => {
        this.setState({
            viewed: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  retrieveTopViewedMovies(){
    MovieService.getTopViewed()
    .then(response => {
        this.setState({
            top_viewed: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  retrieveTopRatedMovies(){
    MovieService.getTopRated()
    .then(response => {
        this.setState({
          top_rated: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  clickWatch(movieId) {
    MovieService.watch(movieId)
    .then(response => {
        this.setState({
          viewed: response.data
        })
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );     
  }

  search_handler(element){
    var query = element.target.value
    if(element.target.value === "" || element.target.value === " ")
      query = "$-*empty*-$"

    MovieService.filterMovies(query)
    .then(response => {
        this.setState({
            movies: response.data
        });
        
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const {movies, viewed, top_viewed, top_rated} = this.state;    
    var hasViewed = (viewed === []);
    return (      
		<div className='container-fluid movie-app'>
        <div>
          <div className='movies-row row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Movies' />
            <SearchBox search_handler={this.search_handler} />
          </div>
          <div className='movies-row row'>
            <MovieList
              movies={movies}
              handleWatchClick={this.clickWatch}
              WatchComponent={WatchMovie}
            />
          </div>
          <div className='movies-row row d-flex align-items-center mt-4 mb-4'>
            {this.hasViewed ? (null): (
              <MovieListHeading heading='Last Seen Movies' />
            )}	
          </div>
          <div>
            {hasViewed ? (null): (
              <div className='movies-row row'>
                <MovieList
                  movies={viewed}
                />
              </div>
            )}
          </div>
          <div className='movies-row row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Popular Movies' />
          </div>
          <div className='movies-row row'>
            <MovieList
              movies={top_viewed}
              handleWatchClick={this.clickWatch}
              WatchComponent={WatchMovie}
            />
          </div>
          <div className='movies-row row d-flex align-items-center mt-4 mb-4'>
            <MovieListHeading heading='Top Rated Movies' />
          </div>
          <div className='movies-row row'>
            <MovieList
              movies={top_rated}
              handleWatchClick={this.clickWatch}
              WatchComponent={WatchMovie}
            />
          </div>
        </div>
        
        
		</div>
    );
  }
}
