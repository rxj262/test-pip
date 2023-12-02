import React from 'react';

const ResearchByTopic = ({topics,btnToggle}) => {
    
    let topicList = []
    
    for (let i=0;i<topics.length;i++) {
        topicList.push(
            <div key={topics[i].Department}>
                <ul id="researchAccordion" className="list-group">
                    <li className="list-group-item">
                        <a onClick={btnToggle}
                        className="collapsed" 
                        href={'#collapse_'+topics[i].Department} 
                        data-parent="#researchAccordion" 
                        data-toggle="collapse" 
                        role="button" 
                        aria-expanded="false" 
                        aria-controls={'#collapse_'+topics[i].Department}>
                            <h2>{topics[i].DisplayName}</h2>
                        </a>
                        <div id={'collapse_'+topics[i].Department} style={{display:'none'}}>
                            <ul>
                                {topics[i].IntellectualContributions.map(dept => (
                                    <li className="list-item" key={dept.IntellectualContributionId}><em>{dept.Title}</em> {"("+dept.Authors.join(', ')+")"}</li>
                                ))}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
    )}
    
    return topicList
}


export default ResearchByTopic;