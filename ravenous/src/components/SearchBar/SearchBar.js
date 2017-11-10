import React from 'react';
import './SearchBar.css';

const sortByOptions = {
	"Best Match": "best_match",
	"Rating": "rating",
	"Review Count": "review_count",
	"Distance": "distance"
};

class SearchBar extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			term: '',
			location: '',
			sortBy: 'best_match'
		};

		this.handleTermChange = this.handleTermChange.bind(this);
		this.handleLocationChange = this.handleLocationChange.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleSortByChange = this.handleSortByChange.bind(this);
	}

	/*
		Now let's store the object values in a variable. Inside of the callback function, access the sortByOptions values using the sortByOption parameter of the callback function. Store values in variable called sortByOptionValue.
	*/
	renderSortByOptions () {
		return Object.keys(sortByOptions).map(sortByOption => {
			let sortByOptionValue = sortByOptions[sortByOption];
			/*
				On the next line, return a <li> element. The list item should have an attribute called key set to sortByOptionValue (don't forget to use curly braces to inject JavaScript). The content of the list item should be sortByOption. Again, use curly braces to achieve the JavaScript injection.
			*/
			return <li onClick={() => this.handleSortByChange(sortByOptionValue)} className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>;
		});
	}

	getSortByClass (sortByOption) {
		if (this.state.sortBy === sortByOption) {
			return 'active';
		} 

		return '';
	}

	handleSortByChange (sortByOption) {
		this.setState({
			sortBy: sortByOption
		});
	}

	handleTermChange (e) {
		this.setState({
			term: e.target.value
		});
	}

	handleLocationChange (e) {
		this.setState({
			location: e.target.value
		});
	}

	handleSearch (e) {
		e.preventDefault();

		this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
	}

	render () {
		return (
			<div className="SearchBar">
			  <div className="SearchBar-sort-options" >
			    <ul>
			      { this.renderSortByOptions() }
			    </ul>
			  </div>
			  <div className="SearchBar-fields">
			    <input onChange={this.handleTermChange} placeholder="Search Businesses" />
			    <input onChange={this.handleLocationChange} placeholder="Where?" />
			  </div>
			  <div className="SearchBar-submit" onClick={this.handleSearch}>
			    <a>Let's Go</a>
			  </div>
			</div>
		);
	}
}

export default SearchBar;