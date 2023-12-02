import React, { Component } from 'react';
import Course from './Course'
import Loading from '../Loading/Loading'

class CourseDescription extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseInfo: [],
            courseCode: '',
            timeout: false,
            loading: true
        }
    }
    
    gatherParams() {

       
        let pathArray = window.location.pathname.split('/')
        let courseNumber = pathArray[4].toUpperCase()

        this.setState({courseCode:courseNumber})

        return courseNumber

    }

    componentDidMount() {

        const url = 'https://applications.case.edu/api/wsom/course-info/classlist/'
        
        const courseCode = this.gatherParams()

        fetch(url+courseCode)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                const mostRecent = data.reduce((prev,current)=>{
                    return (prev.term > current.term) ? prev : current
                })

                document.title = this.state.courseCode+" "+mostRecent.title + " | Weatherhead School of Management | Case Western Reserve University"

                this.setState({
                    courseInfo : mostRecent,
                    loading: false
                })
            })
            .catch((error) => {
                this.setState({timeout:true})
                console.log(error)}) 
    }

    
    renderItems() {
        return this.state.loading ? <Loading data={this.state} /> : <Course item={this.state.courseInfo} />
    }
    
    render() {
        return (
            
            <div>
                {this.renderItems()}
            </div>
        )
    }
}
export default CourseDescription;
