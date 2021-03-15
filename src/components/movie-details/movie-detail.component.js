import React,  { Component } from 'react';
import { Link } from "react-router-dom";
import { Button} from 'reactstrap';
import MovieService from "../../services/movie.service";
import RatingList from "./ratings-list.component";
import MovieListHeading from "../movie-lists/movie-list-heading.component";

class MovieDetails extends Component {
	constructor(props) {
		super(props);

        this.state = {
            movie: undefined,
            realease_date: undefined,
            ratings: [],
            grade: undefined
        };
        
		
	}
    
    componentDidMount() {
        this.loadMovie(this.props.match.params.movieId);
    }

    loadMovie(movieId) {
        MovieService.getOne(movieId)
        .then(response => {
            if(response.status === 200) {
                this.setState({
                    movie: response.data,
                    release_date: new Date(response.data.release_date).toLocaleDateString()
                });
            }
            MovieService.getAllRatings(movieId)
            .then(ratings => {
               
                if(ratings.status === 200) {
                    this.setState({
                        ratings: ratings.data,
                    });
                    MovieService.getAvgGrade(movieId)
                    .then(grade => {
                        if(grade.status === 200) {
                            this.setState({
                                grade: grade.data.avg,
                            });
                        }
                    });
                }
            })
        })
        .catch(
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
        
		return (
			
            <div className="container">
                <Link to='/home'>
                    <Button className="btn" variant="outline-dark" >Back</Button>
                </Link>

                <header className="jumbotron">
                    {this.state.movie !== undefined ? (
                        <div className="container">
                            <div className="row d-flex">
                                <div className='col-md-auto image-container d-flex'
                                >
                                    <img src={this.state.movie.img_url} alt='movie'></img>
                                </div>  
                                <div className="col-sm">
                                    <h4><strong>Title:</strong> {this.state.movie.title}</h4>
                                    
                                    <p><strong>Release Date:</strong> {this.state.release_date}</p>
                                    <p className="grade"><strong>Grade:</strong> {this.state.grade}</p>
                                    <p><strong>Category: </strong>{this.state.movie.category}</p>
                                    <strong>Overview: </strong>
                                    <p>{this.state.movie.description}</p>
                                    
                                </div>
                            </div>
                            <div className="row d-flex ratings">

                                {this.state.ratings.length !== 0 ? (
                                    <>
                                    <MovieListHeading heading='Ratings'/>
                                    <RatingList ratings={this.state.ratings} />
                                    </>
                                ) : (<h3>No ratings yet...</h3>)}
                                
                            </div>
                        </div>
                    ): (
                        <h3>This movie does not exist.</h3>
                    )}
                    
                    
                    
					
                </header>
            </div>

           
		);
	}
}

export default MovieDetails;