import React from 'react';
import { format } from 'date-fns';
import {
	BASE_URL_API_PATH
  } from '../../constants/Constants';

function eventNameForURL(title, date) {
	return title.replace(/[^a-zA-Z0-9 ]/g,'').replace(/\s+/g, '-').toLowerCase() + "-" + date.replace(/[^a-zA-Z0-9]/g,'-');
}

const EventDetails = ({ item }) => (
	<div key={item.EventId}>
		<div className="content">
			<div className="row">
				<div className="main-information-wrapper col-md-8">
					<h1 className="page-header"><div className="field field--name-field-event-title field--type-string field--label-hidden field--item">{item.EventName}</div></h1>
					<div className="flex top-box-wrapper">
						<div className="calendar-holder hidden-md hidden-xs">
							<i className="fa fa-calendar"></i>
						</div>
						<div className="col-xs-12 col-md-8 basic-details-wrapper">	
							<div>
								<div className="bold">
									<p>
										{format(new Date(item.EventStartDate), 'EEEE')}, {format(new Date(item.EventStartDate), 'LLLL')} {format(new Date(item.EventStartDate), 'd')}, {format(new Date(item.EventStartDate), 'yyyy')}<br />
										{format(new Date(item.EventStartDate), 'h:mm aa')} - {format(new Date(item.EventEndDate), 'h:mm aa')}
									</p>
								</div>
							</div>
							{/* <div className="field field--name-field-add-to-calendar-button field--type-add-to-calendar-field field--item">iCAL</div> */}
							<div className="field field--name-field-event-registration-url field--type-link field--item">
								<a className="button-blue" href={BASE_URL_API_PATH + "/CEBP/Events/PageId/SignUpToEvent/EventId/" + item.EventId + "/e/" + eventNameForURL(item.EventName, format(new Date(item.EventStartDate), 'P'))} target="_blank" rel="noreferrer"><i class="fa fa-pencil-square-o"></i> Register</a>
							</div>
						</div>
						<div className="col-xs-12 col-md-4 cle-hours-and-social">
							<div className="cle-credit-display">
								{/* CEUs */}
								<b>Continuing Education Units (CEUs)</b><br />
								{item.CustomAttributes && item.CustomAttributes.map((attribute, i) => {
									return ((attribute.Name.includes("CEUs - ") && attribute.Value !== "") ? (
										<div key={i}> 
											{attribute.Name.replace("CEUs - ", "")}: {attribute.Value}
										</div>
									) : (
										null
									));
								})}
							</div>
							{/* <div className="social-media-share-buttons">Share</div> */}
						</div>
					</div>
					<h2>Event Description</h2>
					<div className="field field--name-field-event-desc-long field--type-text-with-summary field--item" dangerouslySetInnerHTML={ { __html: item.Description } }></div>
					<div className="event-location-wrapper mt-20 mb-10">
						<h2>Event Location</h2>
						<div className="field field--name-field-event-location mb-20 field--item">
							<p>{item.Locations}</p>

							{/* Who Should Attend */}
							{item.Tabs.map((tab, i) => {
								return ((tab.Name.includes("Who should attend") && tab.Content !== "") ? (
									<div key={i} dangerouslySetInnerHTML={ { __html: "<b>Who Should Attend</b><br />" + tab.Content + "<br /><br />" } }></div>
								) : (
									null
								));
							})}


							{/* ENTITIES */}
							{/* This is how to handle Custom Attributes and Entities */}
							{/* {item.CustomEntities.map((entity, i) => {
								return (
									<div key={i}>
										<p>name: {entity.Name}</p>
										<p>values: {entity.Values}</p>
										<p>selections: {entity.Selections}</p>
									</div>
								);
							})} */}

							{/* ATTRIBUTES */}
							{/* This is how to handle Custom Attributes and Entities */}
							{/* {item.CustomAttributes.map((attribute, i) => {
								return (
									<div key={i}>
										<p>name: {attribute.Name}</p>
										<p>value: {attribute.Value}</p>
									</div>
								);
							})} */}
						</div>
					</div>
				</div>
				
				<div className="event-aside-wrapper col-md-4">
					<div className="image-speaker-list-wrapper">
						<div className="field field--name-field-event-image field--type-entity-reference field--label-hidden field--item">
							<div className="media-image-container">
								<div className="field field--name-field-image field--type-image field--label-hidden field--item">
									<img src={BASE_URL_API_PATH + item.EventImageURL} width="540" height="305" alt={item.EventImageCaption} typeof="foaf:Image" className="img-responsive" />
								</div>
								<div className="field field--name-field-photo-caption field--type-string field--label-hidden field--item">
									{/* Keynote Speaker */}
									{item.CustomEntities.map((entity, i) => {
										return (entity.Name === "Keynote Speaker" ? (
											<div key={i} dangerouslySetInnerHTML={ { __html: "<b>Keynote:</b> " + entity.Content + "<br /><br />" } }></div>
										) : (
											null
										));
									})}
								</div>
							</div>
						</div>
					</div>
					<div className="field field--name-field-for-more-information field--type-entity-reference-revisions field--label-hidden field--items">
						<div className="field--item">  
							<div className="paragraph paragraph--type--aside paragraph--view-mode--default">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
	</div>
)

export default EventDetails