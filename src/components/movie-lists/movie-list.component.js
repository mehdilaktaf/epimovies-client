import React,  { Component } from 'react';


class MovieList extends Component {
	constructor(props) {
		super(props);
		this.WatchComponent = props.WatchComponent;
		this.handler = this.props.handleWatchClick;
	}
	render() {
		return (
			<>
				{this.props.movies.map((movie, index) => (
					<div className='image-container d-flex justify-content-start m-2'>
						<img src={movie.img_url} alt='movie'></img>
						{this.WatchComponent ? (
							<div
							key={index}
							onClick={() => this.handler(movie.id)}
							className='overlay d-flex align-items-center justify-content-center'
							>
							<this.WatchComponent /> 
							</div>
						) : ( null )}
						
							
						
					</div>
				))}
			</>
		);
	}
}

export default MovieList;