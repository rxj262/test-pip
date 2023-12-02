import React from 'react'
import {
    useLocation, 
    useParams,
    Link
} from "react-router-dom";

const useBasePath = () => {
    const location = useLocation();
    const params = useParams();

    return Object.values(params).reduce(
        (path, param) => path.replace('/' + param, ''),
        location.pathname,
    );
};
function Page2(props) {
    const basePath = useBasePath();
    console.log(basePath);
    return (
        <div>
            <Link to={`${process.env.PUBLIC_URL}/`}>Page 1</Link>
        </div>
    )
}

export default Page2


