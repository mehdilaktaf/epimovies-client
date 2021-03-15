import React,  { Component } from 'react';
import { Link } from "react-router-dom";

class RatingList extends Component {
	
	render() {
		return (
			<>
            <div className='container'>       
				{this.props.ratings.map((rating, index) => (
					
                        <div className='ratings-row row container d-flex' key={index}>
                            <Link className='link col' to={'/ratings/'+ rating.id}>
                            <h5>{rating.rating_title}</h5>
                            </Link>
							<p className='col'>{new Date(rating.updatedAt).toUTCString()}</p> 
							<div className='w-100'/>
                            <p className='col'>{rating.comment}</p>
							<p className='col grade'><strong>Grade:</strong> {rating.grade}</p>	 
                        </div>
						
					
					
				))}
                </div>
			</>
		);
	}
}

export default RatingList;