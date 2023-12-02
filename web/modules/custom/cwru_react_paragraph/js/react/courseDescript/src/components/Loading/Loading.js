import React from 'react';
import '../CourseDescription/Course.css'


let Loading = (data) => {
    console.log(data)
    return (
        <div>
            { (data.data.timeout===true) 
            ? <div style={{textAlign:'center', display: 'flex', alignItems: 'center', minHeight: '185px', justifyContent: 'center'}}><span><p>Sorry, No course information is available for {data.data.courseCode} at this time. Please check back at a later date.</p><br /></span></div>
            : <div style={{textAlign:'center', display: 'flex', alignItems: 'center', minHeight: '185px', justifyContent: 'center', backgroundColor: '#D3D3D3'}}><span className='loading'></span></div> 
            }
        </div>
)}

export default Loading;
