import React from 'react';
import './Track.css';

class Track extends React.Component {
	constructor (props) {
		super(props);

		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.state = {
			isRemoval: false
		}
	}

	/*
		Create a method called renderAction that displays a - anchor tag if the isRemoval property is true, and a + anchor tag if the isRemoval property is false. Set the class name to Track-action.
	*/
	renderAction () {
		return this.state.isRemoval ? '-' : '+';
	}

	addTrack () {
		this.setState = {
			isRemoval: !this.state.isRemoval
		};

		return this.props.onAdd(this.props.id);
	}

	removeTrack() {
		this.setState = {
			isRemoval: !this.state.isRemoval
		};

		return this.props.onRemove(this.props.id);
	}

	render () {
		return (
			<div className="Track">
			  <div className="Track-information">
			    <h3>{ this.props.name }</h3>
			    <p>{ this.props.artist } | { this.props.album }</p>
			  </div>
			  <a className="Track-action" onClick={this.state.isRemoval ? this.removeTrack : this.addTrack }>{ this.renderAction }</a>
			</div>
		);
	}
}

export default Track;