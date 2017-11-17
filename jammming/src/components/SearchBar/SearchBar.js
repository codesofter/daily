import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      term: ""
    };

    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.search = this.search.bind(this);
  }

  search () {
    this.props.onSearch(this.state.term);
  }

  handleTermChange (e) {
    this.setState = {
      term: e.target.value
    };
  }

  handleEnter (e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  render () {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} onKeyDown={this.handleEnter} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.props.onSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;