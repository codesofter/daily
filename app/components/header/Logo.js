/*
	display the main form in the center of the page.
*/

import React from 'react';

export class Logo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<img src={this.props.src} />
		);
	}
}