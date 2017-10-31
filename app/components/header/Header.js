/*
	display the main form in the center of the page.
*/

import React from 'react';
import { Logo } from './Logo'
import { EventTitle } from './EventTitle'
import { EventLocation } from './EventLocation'
import { EventDate } from './EventDate'

export class Header extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
			    <Logo src={this.props.src} />
			    <EventTitle name={ this.props.name } />
			    <EventLocation loc={ this.props.loc } />
			    <EventDate date={ this.props.date } />
			</div>
		);
	}
}