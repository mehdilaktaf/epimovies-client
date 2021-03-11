import React from 'react';

const MovieList = (props) => {
	const WatchComponent = props.WatchComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.img_url} alt='movie'></img>
					<div
						// onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<WatchComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;