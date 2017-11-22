import React from 'react';
import Button from '../Button/Button';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      term: ""
    };

    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  search () {
    this.props.onSearch(this.state.term);
  }

  handleTermChange (e) {
    this.setState({
      term: e.target.value
    });
  }

  handleEnter (e) {
    if (e.key === 'Enter') {
      this.search();
    }
  }

  render () {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song, Album, or Artist" 
          onChange={this.handleTermChange}
          onKeyDown={this.handleEnter} />
        <Button loading={this.props.loading} handleClick={this.search} text={'SEARCH'} />
      </div>
    );
  }
}

export default SearchBar;