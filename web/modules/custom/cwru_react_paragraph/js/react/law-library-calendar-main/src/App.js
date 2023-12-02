import React, { Component } from "react";
import { format, parseISO} from 'date-fns'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {loaded:false}
  }
  componentDidMount(){
    fetch('https://lawhome.case.edu/PortalUtilities/DrupalControls/GetLibraryCalendar.aspx')
    .then(results=>results.json())
    .then(hours =>{
      this.setState({hours:hours.items, loaded:true})
      console.log(hours)
    })
  }
  render() {
    if(this.state.loaded)
    {
      return (
        <div id="library-hours-module">
          <div class="calendar-container">
            {this.state.hours.map((day, i)=>{
                  if(day.start.dateTime && day.end.dateTime){
                    return(
                      <div class="calendar-day-wrap clearfix">
                        <div class="calendar-day">{format(parseISO(day.start.dateTime), "EEEE, MMMM d")}</div>
                        <div class="calendar-time">{format(parseISO(day.start.dateTime), "h:mm a")} - {format(parseISO(day.end.dateTime), "h:mm a")}</div>
                      </div>
                    )
                  }
                })}
              <div class="additional-link">
                  <a href="https://calendar.google.com/calendar/embed?src=lawcirculation%40case.edu&ctz=America%2FNew_York" target="_blank">View full schedule</a><br /><br />
              </div>
          </div>
      </div>
      );
    }
    else{
      return(<div></div>)
    }
  }
}
export default App;