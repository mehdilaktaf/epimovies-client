import React,  { Component } from 'react';
import { Link } from "react-router-dom";
import { Button} from 'reactstrap';
import WatchMovie from "../movie-lists/watch-movie.component";
import MovieService from "../../services/movie.service";


class MovieDetails extends Component {
	constructor(props) {
		super(props);

        this.state = {
            movie: undefined,
            realease_date: undefined 
        };
        
		
	}
    
    componentDidMount() {
        this.loadMovie(this.props.match.params.movieId);
    }

    loadMovie(movieId) {
        MovieService.getOne(movieId)
        .then(response => {
            this.setState({
                movie: response.data,
                release_date: new Date(response.data.release_date).toLocaleDateString()
            });
            console.log("Response:",response.data)
            console.log("Movie selected:",this.state.movie)
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
                                
                                    <div
                                    onClick={() => this.handler(this.state.movie.id)}
                                    className='overlay d-flex align-items-center justify-content-center'
                                    >
                                    <WatchMovie/> 
                                    </div>
                                </div>  
                                <div className="col-sm">
                                    <h4><strong>Title:</strong> {this.state.movie.title}</h4>
                                    
                                    <p><strong>Release Date:</strong> {this.state.release_date}</p>
                                    <p><strong>Category: </strong>{this.state.movie.category}</p>
                                    <strong>Overview: </strong>
                                    <p>{this.state.movie.description}</p>
                                    
                                </div>
                                </div>
                        </div>
                    ): (
                        <h3>EMPTY</h3>
                    )}
                    
                    
                    
					
                </header>
            </div>

           
		);
	}
}

export default MovieDetails;