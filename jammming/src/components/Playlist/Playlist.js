import React from 'react';
import TrackList from '../TrackList/TrackList';
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
			  <input onChange={this.handleNameChange} defaultValue={'New Playlist'} />
			  <TrackList tracks={this.props.tracks} />
			  <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
			</div>
		);
	}
}

export default Playlist;