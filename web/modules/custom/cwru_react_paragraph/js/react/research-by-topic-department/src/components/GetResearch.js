import React, { Component } from 'react';
import ResearchByDepartment from './ResearchByDepartment';
import ResearchByTopic from './ResearchByTopic';
import $ from "jquery";


class GetResearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredDepartments: [],
            filteredTopics: [],
            fetchSucceed: false
        };

        this.getResearch = this.getResearch.bind(this)
        this.btnToggle = this.btnToggle.bind(this);
        this.organizeDepartments = this.organizeDepartments.bind(this);
        this.organizeTopics = this.organizeTopics.bind(this);
        this.componentRender = this.componentRender.bind(this);
    }



    getResearch() {
        const uri = 'https://applications.case.edu/api/wsom/faculty-research'
        const researchByDepartmentUri = `${uri}/Service.svc/by-dept`
        const researchByTopicUri = `${uri}/Service.svc/by-topic`

        if(window.location.pathname==='/weatherhead/research-and-centers/research-by-department'){
            fetch(researchByDepartmentUri)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.organizeDepartments(data.DataByDepartment)
                    this.setState({fetchSucceed:true})
                })
                .catch((error) => console.log(error))
            } 
        else if(window.location.pathname==='/weatherhead/research-and-centers/research-by-topic'){
            fetch(researchByTopicUri)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.organizeTopics(data.DataByTopic)
                    this.setState({fetchSucceed:true})
                })
                .catch((error) => console.log(error))
        }

    };


    organizeDepartments = (data) => {
        let filtered = []
        let departments = data
        for(let i=0;i<departments.length;i++) {
            let obj = {}
            obj.DisplayName = departments[i].Department
            obj.Department = departments[i].Department.replace(/[^a-zA-Z0-9 ]/g, '').split(" ").join("")
            obj.IntellectualContributions = departments[i].IntellectualContributions
            filtered.push(obj)
        };

        return this.setState({filteredDepartments:filtered});
    };

    organizeTopics = (data) => {
        let filtered = []
        let topics = data
        for(let i=0;i<topics.length;i++) {
            let obj = {}
            obj.DisplayName = topics[i].Topic
            obj.Department = topics[i].Topic.replace(/[^a-zA-Z0-9 ]/g, '').split(" ").join("")
            obj.IntellectualContributions = topics[i].IntellectualContributions
            filtered.push(obj)
        };

        return this.setState({filteredTopics:filtered});
    };

    btnToggle(e) {
        e.preventDefault()
        $(e.target.parentElement.hash).toggle()
    }

    componentRender(){
        if (this.state.filteredDepartments.length>0){
            return <ul><ResearchByDepartment departments={this.state.filteredDepartments} btnToggle={this.btnToggle}/></ul>}
        else if (this.state.filteredTopics.length>0){
            return <ul><ResearchByTopic topics={this.state.filteredTopics} btnToggle={this.btnToggle}/></ul>}

    }

    componentDidMount() {
        this.getResearch();
    }

    render() {
        return this.state.fetchSucceed ? this.componentRender() : <div></div> 
    }
};

export default GetResearch;