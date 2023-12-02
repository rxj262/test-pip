import React, { useEffect, useState } from "react";
import './App.css';

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch("https://lawapps.case.edu/api/msass/cebp/GetAllEvents.aspx")
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
							<div className="gcf-item-header-block">
								{items.map(item => (
									
									<div key={item.EventId}>
									{item.EventName} {item.EventStartDate}
									</div>
								))}
							</div>
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
