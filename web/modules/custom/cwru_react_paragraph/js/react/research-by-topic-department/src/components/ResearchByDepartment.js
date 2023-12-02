import React from 'react';

const ResearchByDepartment = ({departments,btnToggle}) => {

        let departmentList = []

        for (let i=0;i<departments.length;i++) {
            departmentList.push(
                <div key={departments[i].Department}>
                    <ul id="researchAccordion" className="list-group">
                        <li className="list-group-item">
                            <a onClick={btnToggle}
                            className="collapsed" 
                            href={'#collapse_'+departments[i].Department} 
                            data-parent="#researchAccordion" 
                            data-toggle="collapse" 
                            role="button" 
                            aria-expanded="false" 
                            aria-controls={'#collapse_'+departments[i].Department}>
                                <h2>{departments[i].DisplayName}</h2>
                            </a>
                            <div id={'collapse_'+departments[i].Department} style={{display:'none'}}>
                                <ul>
                                    {departments[i].IntellectualContributions.map(dept => (
                                        <li className="list-item" key={dept.IntellectualContributionId}><em>{dept.Title}</em> {"("+dept.Authors.join(', ')+")"}</li>))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
        )}
    
    return departmentList
    }

export default ResearchByDepartment;