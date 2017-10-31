/*
	display the main form in the center of the page.
*/

import React from 'react';
import { PreRegistration } from './PreRegistration';

export class FormContainer extends React.Component {
	render() {
		return (
			<div>
				<PreRegistration />
			</div>
		);
	}
}