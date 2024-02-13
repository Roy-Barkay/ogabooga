import React, { Component } from 'react';
import {TimeLine} from './timeline';
import {Exhibitions} from './exhibitions'

const History  = ({translation}) =>  {
        return <div>
                    <div className='timeline'>                        
                        <TimeLine translation={translation}></TimeLine>
                    </div>
                    <div className="exhibitons">
                        <Exhibitions></Exhibitions>
                    </div>
                </div>

}
 
export default History;