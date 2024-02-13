import React from 'react';
import BreadCrumbs from '../components/general/bread-crumbs';
import { useParams, useSearchParams } from 'react-router-dom';
import PositionsDashboard from '../components/positions/positions-dashboard';
import { useState } from 'react';

function PositionsPage(props) {
        const {id} = useParams();
        const [searchParams] = useSearchParams();
        const searchTerm = searchParams.get('searchTerm');
        const department = searchParams.getAll('department');
        const positionPrecentage = searchParams.getAll('positionPrecentage');
        const [breadCrumbs, changeBreadCrumbs] = useState([{
            title: "משרות",
            titleEN: "Positions",
            link: "/"
          }])
        return <div className='page-content'>
                    <BreadCrumbs translation={props.translation} breadCrumbsObj={breadCrumbs}></BreadCrumbs>
                    <PositionsDashboard id={id} searchString={searchTerm} searchDepartment={department} searchPositionPrecentage={positionPrecentage} handleSave={props.handleSave} savedPositions={props.savedPositions} translation={props.translation}></PositionsDashboard>
                </div>;
    
}
 
export default PositionsPage;