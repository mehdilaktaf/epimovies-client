import React, { Component } from "react";

import MovieService from "../services/movie.service";
import MovieListHeading from "./movie-list-heading.component";
import MovieList from "./movie-list.component";
import SearchBox from "./search-box.component";
import WatchMovie from "./watch-movie.component";

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        movies: [],
        viewed: [],
        content: ""
    };
  }

  componentDidMount() {
    this.retrieveMovies();
    this.retrieveViewedMovies();
  }
  

  retrieveMovies(){
    MovieService.getAllMovies()
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
    MovieService.getViewedMovies()
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

  clickWatch(movieId) {
    MovieService.watchMovie(movieId)
    .then(response => {
        console.log(response)
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
    const {movies, viewed, content} = this.state;
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
				<MovieListHeading heading='Viewed' />
			</div>
			<div className='row'>
				<MovieList
					movies={viewed}
					// handleFavouritesClick={removeFavouriteMovie}
					// WatchComponent={WatchMovie}
				/>
			</div>
		</div>
    );
  }
}