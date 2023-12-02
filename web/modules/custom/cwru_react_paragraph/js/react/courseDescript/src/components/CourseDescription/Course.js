import React from 'react';

const Course = ({item}) => (
 
    
        <div className="col-md-12">
            <div id="title">
                <h1>{item.title}</h1>
            </div>
            <div className="clearFix" id="mainCol">
                <p>{item.crHrs} credit hours</p>
                <p>{item.description}</p> 
            </div> 
            {item.lastName != null &&
                <div className="clearFix" id="sideCol">
                <p>Recent instructor: <b>{item.firstName} {item.lastName}</b> <small>({item.semesterLong})</small></p>    
                </div>
            }
        </div>
);

export default Course;
