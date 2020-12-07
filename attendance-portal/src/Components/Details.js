import React from 'react';
import { useEffect, useState } from 'react';
import { getStudentDetails } from '../redux/api';
import ReactJson from 'react-json-viewer'


const Details = () => {
    const [initialState, setInitialState] = useState([])
    useEffect(() => {
        getStudentDetails().then(res => {
            console.log(res);
            return (
                res.data
            )
        }).then(jsonResponse => setInitialState(jsonResponse))
    }, [])

    return (
        <div>
            <ReactJson json={initialState} />
        </div>
    )
}
export default Details;