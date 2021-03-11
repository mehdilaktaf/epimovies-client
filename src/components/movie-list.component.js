import React from 'react';

const MovieList = (props) => {
	const WatchComponent = props.WatchComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.img_url} alt='movie'></img>
					{WatchComponent ? (
						<div
						onClick={() => props.handleWatchClick(movie.id)}
						className='overlay d-flex align-items-center justify-content-center'
						>
						<WatchComponent /> 
						</div>
					) : ( <br/> )}
					
						 
					
				</div>
			))}
		</>
	);
};

export default MovieList;