import React, { useEffect, useState } from "react";
import { parseISO, format, getMonth } from 'date-fns';
import {
	BASE_URL_API_PATH,
	GET_ALL_EVENTS_ENDPOINT,
	CEBP_EVENTS_MID,
	CEBP_EVENTS_START,
	CEBP_EVENTS_END
  } from './constants/Constants';
import './App.css';

const EVENTS_API = BASE_URL_API_PATH + GET_ALL_EVENTS_ENDPOINT + "?" + CEBP_EVENTS_MID + "&" + CEBP_EVENTS_START + "&" + CEBP_EVENTS_END;
const gcfblock = {
	display: "flex",
	marginBottom: "10px"
  };

function eventNameForURL(title, date) {
	return title.replace(/[^a-zA-Z0-9 ]/g,'').replace(/\s+/g, '-').toLowerCase() + "-" + date.replace(/[^a-zA-Z0-9]/g,'-');
}

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch(EVENTS_API)
			.then(res => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setItems(result);
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			)
	}, [])
	
	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<div>
				<div className="rss_section_title">UPCOMING EVENTS</div>
				<div className="gCalFlow flex-1">
					<div className="gcf-item-container-block">
						<div className="gcf-item-block">
							{items.map(item => (
								<div key={item.EventId} className="gcf-item-header-block">
									<div className="gcf-item-date-block">
										<div className="gcf-item-daterange">
											<span className="month">{format(new Date(item.EventStartDate), 'LLLL')}</span><span className="day">{format(new Date(item.EventStartDate), 'd')}</span>
										</div>
										<div class="gcf-item-title-block" style={gcfblock}>
											<div class="gcf-item-title"><a href={"/socialwork/centerforebp/events/id/" + item.EventId + "/" + eventNameForURL(item.EventName, format(new Date(item.EventStartDate), 'P'))} rel="noreferrer">{item.EventName}</a></div>
											{/* {item.EventName} {item.EventStartDate}
											<br />
											<span>{format(new Date(item.EventStartDate), 'EEEE')}</span><br />
											<span>{format(new Date(item.EventStartDate), 'd')}</span><br />
											<span>{format(new Date(item.EventStartDate), 'LLLL')}</span><br />
											<span>{(new Date(item.EventStartDate)).toLocaleString('default', { month: 'long' })}</span><br />
											<span>{getMonth(new Date(item.EventStartDate))}</span><br /> 
											<span>{format(new Date(item.EventStartDate), 'yyyy')}</span><br />*/}
										</div>
									</div>
								</div>
										
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
}

export default App;
