import React from 'react';
import PropTypes from "prop-types";

export class EventDate extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>{this.props.date}</div>
		);
	}
}

EventDate.propTypes = {
	date: PropTypes.string.isRequired
}