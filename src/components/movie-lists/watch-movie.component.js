import React from 'react';

const WatchMovie = () => {
	return (
		<>
			<span className='mr-2'>Watch movie</span>
			<svg
				width='1em'
				height='1em'
				viewBox='0 0 16 16'
				class='bi bi-eye-fill'
				fill='grey'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					fill-rule='evenodd'
					d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"
				/>
				
				<path
					fill-rule='evenodd'
					d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
				/>
				
			</svg>
		</>
	);
};

export default WatchMovie;