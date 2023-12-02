import React, { Component } from 'react';
import EventDetails from './EventDetails';
import {
	BASE_URL_API_PATH,
	GET_EVENT_ENDPOINT
  } from '../../constants/Constants';

const EVENT_API = BASE_URL_API_PATH + GET_EVENT_ENDPOINT + "?";

class EventDetailsContainer extends Component {
	state = {
		eventInfo: [],
		loading: true,
		error: true
	};
	
	async componentDidMount() {
		console.log("Mount" + this.props.match.params.id);
		console.log("ready to fetch " + EVENT_API);
		if (this.props.match.params.id) {
			try {
				fetch(EVENT_API + "id=" + this.props.match.params.id)
					.then(response => response.json())
					.then(result => {
						this.setState({eventInfo: result, loading: false, error: false})
						console.log("fff" + this.state.eventInfo.EventName)
					})
					.catch(e => {
						console.log(e);
						this.setState({loading: false, error: true});
					});
			} catch (err) {
				this.setState({ loading: false, error: true });
			}
		}
	}

	render() {
		const { eventInfo, loading, error } = this.state;
	
		if (error) {
			console.log("err" + error);
			return <div>{error}</div>;
		}
	
		if (loading) {
			console.log("loading");
			return <div>Loading...</div>;
		}

		console.log("render");
		if (this.state.eventInfo.EventName) {
			return (
				<div>
					{console.log("eventInfo.length " + eventInfo[0])}
					<EventDetails item={eventInfo} />;
				</div>
			);
		} else {
			return <div>Event doesn't match</div>;
		}
	};
}

export default EventDetailsContainer;	
