import React, {Component} from 'react'
import { format } from 'date-fns';
import EventList from './EventList';
import {
	BASE_URL_API_PATH,
	GET_ALL_EVENTS_ENDPOINT,
	CEBP_EVENTS_MID,
	LAW_EVENTS_MID,
	CEBP_EVENTS_START,
	CEBP_EVENTS_END
  } from '../../constants/Constants';

var displayMonth = "";
function getModuleId(location) {
	switch(location){
		case 'case.edu.centerforebp.dd': return CEBP_EVENTS_MID;
		case 'case.edu/socialwork/centerforebp': return CEBP_EVENTS_MID;
		case 'case.edu.law.dd': return LAW_EVENTS_MID;
		case 'case.edu/law': return LAW_EVENTS_MID;
		case 'localhost': return CEBP_EVENTS_MID;
		default: return CEBP_EVENTS_MID
	}	
}
var moduleId = getModuleId(window.location.hostname);
const EVENTS_API = BASE_URL_API_PATH + GET_ALL_EVENTS_ENDPOINT + "?" + moduleId + "&" + CEBP_EVENTS_START + "&" + CEBP_EVENTS_END;

class EventsListContainer extends Component {
	state = {
		isFetching: false,
        events: []
	};
	
    async componentDidMount() {
        this.fetchEvents();
		console.log("MMMmmm" + this.state.events.length);
		console.log("fetch url " + EVENTS_API);
    }

    fetchEventsWithFetchAPI = () => {
        this.setState({...this.state, isFetching: true});
        fetch(EVENTS_API)
            .then(response => response.json())
            .then(result => {
                this.setState({events: result, isFetching: false})
				console.log("fff" + this.state.events.length)
            })
            .catch(e => {
                console.log(e);
                this.setState({...this.state, isFetching: false});
            });
    };

    fetchEvents = this.fetchEventsWithFetchAPI

	showMonthHeader(eventMonth) {
		if (!(displayMonth === eventMonth)) {
			displayMonth = eventMonth
			return <h3>{displayMonth}</h3>;
		}
	}

	renderItems = () => {
		const { events, isLoading, error } = this.state;
	
		if (error) {
		  return <div>{error}</div>;
		}
	
		if (isLoading) {
		  return <div>Loading...</div>;
		}
	
		return (
			<div>
				{events.map(event => (
					<div key={event.EventId}>
						<div className="field field--name-field-robust-3-page-ref field--type-entity-reference-revisions field--label-hidden field--items">
							<div className="field--item"> 
								<div className="paragraph paragraph--type--view paragraph--view-mode--default">
									<div className="field field--name-field-view-viewfield field--type-viewfield field--label-hidden">
										<div className="field__item field__item-label-hidden">
											<div className="views-element-container form-group">
												<div className="view view-full-events-listing view-id-full_events_listing view-display-id-block_1 js-view-dom-id-8e1352e6adfaacd701e242e230c7dea440cedd45dbf872dda3aca9be2db4175d">
													<div className="view-content">
														{this.showMonthHeader(format(new Date(event.EventStartDate), 'LLLL'))}
														<EventList item={event} />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				))}
			</div>
		);
	};
	
	render() {
		return <div>{this.renderItems()}</div>;
	}
}

export default EventsListContainer
