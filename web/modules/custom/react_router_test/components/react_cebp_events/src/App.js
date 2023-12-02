import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import EventListContainer from './components/EventList/EventListContainer';
import EventDetails from './components/EventDetails/EventDetailsContainer';
import {
	CEBP_EVENTS_PAGE
  } from './constants/Constants';
import './App.css';

export default function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path={"/socialwork/centerforebp/" + CEBP_EVENTS_PAGE + "/id/:id/:name"} component={EventDetails} />
					<Route exact component={EventListContainer} />
				</Switch>
			</div>
		</Router>
	);
}
    

  
