import React from 'react';
import { format } from 'date-fns';
import {
	BASE_URL_API_PATH, CEBP_EVENTS_PAGE
  } from '../../constants/Constants';


function eventNameForURL(title, date) {
	return title.replace(/[^a-zA-Z0-9 ]/g,'').replace(/\s+/g, '-').toLowerCase() + "-" + date.replace(/[^a-zA-Z0-9]/g,'-');
}

const EVENT_DETAIL_SERVER_PATH = "/socialwork/centerforebp"; //'/centerforebp'

const EventList = ({ item }) => (
	<div key={item.EventId}>
		<div className="mb-20 views-row">
			<div className="views-field views-field-nothing">
				<div className="field-content">
					<div className="grid-wrapper text-left">
						<div className="event-date">
							<span className="event-day-of-week">{format(new Date(item.EventStartDate), 'EEEE')}</span><br />
							<span className="event-day-of-month">{format(new Date(item.EventStartDate), 'd')}</span><br />
							<span className="event-month">{format(new Date(item.EventStartDate), 'LLLL')}</span><br />
							<span className="event-year">{format(new Date(item.EventStartDate), 'yyyy')}</span>
						</div>
						<div className="event-time">
							<span className="event-start-time">{format(new Date(item.EventStartDate), 'h:mm aaa')} -</span>
							<span className="event-end-time">{format(new Date(item.EventEndDate), 'h:mm aaa')}</span>
						</div>
						<div className="event-image">
							<div className="media-image-container">
								<div className="field field--name-field-image field--type-image field--label-hidden field--item">  
									<img src={BASE_URL_API_PATH + item.EventImageURL} width="380" height="420" alt={item.EventImageCaption} typeof="Image" className="img-responsive" />
								</div> 
							</div>
						</div>
						<div className="event-details">
							<span className="event-title"><a href={EVENT_DETAIL_SERVER_PATH + "/" + CEBP_EVENTS_PAGE + "/id/" + item.EventId + "/" + eventNameForURL(item.EventName, format(new Date(item.EventStartDate), 'P'))} rel="noopener noreferrer">{item.EventName}</a></span>
							<span className="event-speaker"><p>{item.EventSummary}</p></span>
							<span className="event-cle-hours">{item.CEUs} CEUs</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
)
  
export default EventList
