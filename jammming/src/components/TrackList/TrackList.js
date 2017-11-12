import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<div className="TrackList">
			    { this.props.tracks.map(track => {
			    	return <Track isRemoval={true} onAdd={this.props.onAdd} onRemove={this.props.onRemove} name={track.name} artist={track.artist} album={track.album} />
			    }) }
			</div>
		);
	}
}

export default TrackList;