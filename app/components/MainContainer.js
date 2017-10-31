import React from 'react';
import { Header } from './header/Header';
import { FormContainer } from './form/FormContainer';
import * as EventAPI from './api/EventAPI';

/*
	AJAX requests should go in the componentDidMount lifecycle event.

	There are a few reasons for this,

	Fiber, the next implementation of React’s reconciliation algorithm, will have the ability to start and stop rendering as needed for performance benefits. One of the trade-offs of this is that componentWillMount, the other lifecycle event where it might make sense to make an AJAX request, will be “non-deterministic”. What this means is that React may start calling componentWillMount at various times whenever it feels like it needs to. This would obviously be a bad formula for AJAX requests.

	You can’t guarantee the AJAX request won’t resolve before the component mounts. If it did, that would mean that you’d be trying to setState on an unmounted component, which not only won’t work, but React will yell at you for. Doing AJAX in componentDidMount will guarantee that there’s a component to update.
*/

export class MainContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			eventData: {
				"src": "https://bibs-frontend-live.herokuapp.com/registration/assets/bibsicon.png",
				"name": "The Galen Registration Test",
				"location": "Los Angeles, CA",
				"timeStartLocal": "10/31/2020 06:00:00 am"
			}
		};
	}

	componentDidMount() {
		console.log("did mount: ", this.props);
		let eventId = parseInt(this.props.match.params.id, 10);
		this.getEventDetail(eventId);
	}

	getEventDetail (eventId) {
        EventAPI.get(eventId).then(info => {
            this.setState({eventData: info});
        });
    }

	render() {
		const eventData = this.state.eventData;
		console.log("event detail: ", eventData);


		if (!eventData) {
			return (
				<div>
					<NotFound />
				</div>
			);
		}

		return (
			<div>
              	<Header name={eventData.name} date={eventData.timeStartLocal} loc={eventData.location} src={eventData.src} />
				<FormContainer />
			</div>
		);
	}
}