import React from 'react';
import TrackList from '../TrackList/TrackList';
import Button from '../Button/Button';
import './Playlist.css';

class Playlist extends React.Component {
  constructor (props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange (e) {
    const newName = e.target.value;

    this.props.onNameChange(newName);
  }
  
  render () {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} value={this.props.name} />
        <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.tracks} />
        <Button success={this.props.success} handleClick={this.props.onSave} classes={'Playlist-save'} text={'SAVE TO SPOTIFY'} />
      </div>
    );
  }
}

export default Playlist;