/** @jsxImportSource @emotion/core */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchAddStudentDetails } from '../../redux/triggers';
import JSONView from 'react-json-viewer';

const Details = () => {
    const details = useSelector(store => {
        return store.studentData.details;
    })
    const dispatch = useDispatch();
    useEffect(() => {
        dispatchAddStudentDetails()(dispatch)
        
    }, [dispatch]);

    return (
        <div>
            <JSONView json={details} />
        </div>
    )
}
export default Details;
