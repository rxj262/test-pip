import React from 'react';

const Card = ({items}) => {

    let resumes=items
    let cards = []
                
    for (let i=0;i<resumes.length;i++) {
        cards.push(
            <div key={resumes[i].firstName+" "+resumes[i].lastName} id={resumes[i].firstName+" "+resumes[i].lastName}>
                <h4>{resumes[i].firstName} {resumes[i].lastName}</h4>
                <p id="card-text"><strong>Graduation:</strong> {resumes[i].gradDate}<br />
                    <strong>Career Interests:</strong> {resumes[i].careerInterest.join(", ")}<br />
                    <strong>Industry Interests:</strong> {resumes[i].industryInterest.join(", ")}<br />
                    <strong>Region:</strong> {resumes[i].geoInterest.join(", ")}<br />
                    <strong>Job Search Status:</strong> {resumes[i].searchStatus}<br /></p>
                <div><span className="bio"><p id="card-text">{resumes[i].bio}</p></span></div>
                <div className="container-fluid"> 
                    <div className="row">              
                        <div className="col-sm-12 col-md-6 left-col text-center">	   
                            <button id="resume-button"><a id="button-link" href={resumes[i].resumeUpload} rel="noopener noreferrer" target="_blank" title="View Resume">View Resume</a></button>
                        </div>              
                        <div className="col-sm-12 col-md-6 right-col text-center">      
                            <button id="email-button"><a id="button-link" href={'mailto:'+resumes[i].email} rel="noopener noreferrer" target="_blank" title={'Contact'+resumes[i].firstName+' '+resumes[i].lastName}>Contact</a></button>
                        </div>          
                    </div>      
                </div><br />
            </div>
    )}

return cards
}

export default Card;