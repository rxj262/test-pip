import React, { Component } from 'react';
import StudentResumes from './StudentResumes/StudentResumes';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn : false,
            resumes: [],
            filtered: []
        };

        this.getSheet = this.getSheet.bind(this)
        this.removeDuplicates = this.removeDuplicates.bind(this)
        this.sortArr = this.sortArr.bind(this)
        this.split = this.split.bind(this)
        this.gatherActive = this.gatherActive.bind(this)
    }

    sortArr(arr) {
        arr.sort((a,b) => {
            if (a.lastName < b.lastName) {
                return -1
            }
            if (a.lastName > b.lastName) {
                return 1
            }
            return 0
        })
    }    

    removeDuplicates(arr, key) {
        this.sortArr(arr)
        return [...new Map(arr.map(item => [item[key], item])).values()]
    } 

    gatherActive(){
        let r = []
        const data = this.state.resumes
        for (let i=0;i<data.length;i++) {
            if (data[i].active === '1') {r.push(data[i])}
        }
        return this.setState({filtered:this.removeDuplicates(r, 'lastName')})
    }

    split(data) {
        const raw = data.values;
        const resumes = this.state.resumes
        for(var i=1;i<raw.length;i++){
            let obj = {}

            obj.timestamp = raw[i][0]
            obj.firstName = raw[i][1]
            obj.lastName = raw[i][2]
            obj.email = raw[i][3]
            obj.gradDate = raw[i][4]
            obj.degree = raw[i][5]
            obj.searchStatus = raw[i][6]
            obj.careerInterest = raw[i][7].split(",").map(element=>element.trim())
            obj.industryInterest = raw[i][8].split(",").map(element=>element.trim())
            obj.geoInterest = raw[i][9].split(",").map(element=>element.trim())
            obj.bio = raw[i][10]
            obj.resumeUpload = raw[i][11]
            obj.active = raw[i][12]
            resumes.push(obj)
        }
        this.gatherActive(resumes)
        return resumes
    }

    getSheet() {
        const SheetID = "1jjWngkWFimMPLsJMT87NMJkQi6l_ryQAuVF4Gmj0J4E"
        const APIkey = "AIzaSyCpA1HbwDtK4auwwJY0glp5slh8dh_XUOA"
        const url = 'https://sheets.googleapis.com/v4/spreadsheets/'+SheetID+'/values/Form Responses 1!A:M?key='+APIkey

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.split(data)
                this.setState({isSignedIn : true })
            })
            .catch((error) => console.log(error))
    };

    componentDidMount() {
        this.getSheet()
    }

    render() { 
        return this.state.isSignedIn ? <StudentResumes resumeList={this.state.filtered} /> : <div></div> }

};

export default Login;