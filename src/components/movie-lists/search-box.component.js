import React, { Component } from 'react';

class SearchBox extends Component {
	render() {
		return (
			<div className='col col-sm-4'>
				<input
					className='form-control'
					onChange={this.props.search_handler}
					placeholder='Type to search...'
				></input>
			</div>
		);
	};
}
export default SearchBox;