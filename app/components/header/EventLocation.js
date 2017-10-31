/*
	display the main form in the center of the page.

	functional components for containers
	http://www.andreasreiterer.at/web-development/react-functional-components/
*/

import React from 'react';
import PropTypes from "prop-types";

export const EventLocation = ({loc}) => (
	<div>{loc}</div>
);

EventLocation.propTypes = {
	loc: PropTypes.string.isRequired
}