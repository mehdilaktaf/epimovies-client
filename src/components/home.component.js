import React, { Component, useState, useEffect } from "react";
import MovieService from "../services/movie.service";
import MovieListHeading from "./movie-lists/movie-list-heading.component";
import MovieList from "./movie-lists/movie-list.component";
import SearchBox from "./movie-lists/search-box.component";
import WatchMovie from "./movie-lists/watch-movie.component";

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    // const [viewed, setViewed] = useState([]);
    this.state = {
        movies: [],
        viewed: [],
        top_viewed: [],
        top_rated: [],
        content: ""
    };

    this.clickWatch = this.clickWatch.bind(this);
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
    var success = false;
    console.log(`Movie ${movieId}`)
    MovieService.watch(movieId)
    .then(response => {
        this.setState({
          viewed: response.data
        })
        console.log(response.data)
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
    // this.retrieveViewedMovies();    
  }

  render() {
    const {movies, viewed, top_viewed, top_rated, content} = this.state;    
    const hasViewed = (viewed === []);
    return (      
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				{/* <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} /> */}
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					handleWatchClick={this.clickWatch}
					WatchComponent={WatchMovie}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
        {hasViewed ? (null): (
          <MovieListHeading heading='Viewed Movies' />
        )}	
			</div>
      <div>
        {hasViewed ? (null): (
          <div className='row'>
            <MovieList
              movies={viewed}
            />
          </div>
        )}
      </div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Popular Movies' />
			</div>
			<div className='row'>
				<MovieList
					movies={top_viewed}
					handleWatchClick={this.clickWatch}
					WatchComponent={WatchMovie}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Top Rated Movies' />
			</div>
			<div className='row'>
				<MovieList
					movies={top_rated}
          handleWatchClick={this.clickWatch}
					WatchComponent={WatchMovie}
				/>
			</div>
		</div>
    );
  }
}