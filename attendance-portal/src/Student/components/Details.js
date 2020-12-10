/** @jsxImportSource @emotion/core */

import { useEffect, useState } from 'react';
import { getStudentDetails } from '../../redux/api';
import ReactJson from 'react-json-viewer'


const Details = () => {
    const [initialState, setInitialState] = useState([])
    useEffect(() => {
        async function fetchData() {
            const res = await getStudentDetails();
            return res.data;
        }
        fetchData().then(jsonResponse => setInitialState(jsonResponse));
        
    }, []);

    return (
        <div>
            <ReactJson json={initialState} />
        </div>
    )
}
export default Details;
