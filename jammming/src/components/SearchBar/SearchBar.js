import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      term: ""
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.search = this.search.bind(this);
  }

  search (searchValue) {
    this.props.onSearch(searchValue);
  }

  handleTermChange (e) {
    /*
      Accepts an event argument
      Sets the state of the search bar's term to the event target's value.
    */
    this.setState = {
      term: e.target.value
    };
  }

  render () {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.props.onSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;