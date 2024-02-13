import React, { Component } from 'react';
import axios from 'axios';

async function callCustomerAction(action, system, record_title, record_path, record_type_code) {
    let url = '/_vti_bin/webapi/ElasticLog/AddCustomerAction'
    // let url = 'https://www-dev.harel-group.co.il/_vti_bin/webapi/ElasticLog/AddCustomerAction'
    
    //////////////////////////////////////////////////////////////////////////////////////////
    // // create a new XMLHttpRequest
    // var xhr = new XMLHttpRequest()
    // // get a callback when the server responds
    // xhr.addEventListener('load', () => {
    //   // update the state of the component with the result here
    //   console.log(xhr.responseText)
    // });
    // // open the request with the verb and the url
    // //xhr.open('GET', url);
    // xhr.open('POST', url);
    // // send the request
    // xhr.send(JSON.stringify({ action: action }));
    ///////////////////////////////////////////////////////////////////////////////////////////

    let cleanRecordPath = encodeURIComponent(record_path);
    //let cleanRecordTitle = encodeURIComponent(record_title);

    axios.post(
        url,
        {"action_id": action, "system_code": system, "record_title": record_title, "record_path": cleanRecordPath, "record_type_code": record_type_code},
        { headers: { 'Content-Type': 'application/json' } }
      ).then(res => {}) //console.log(res + '\n' + res.status)
      .catch(error => {}); //console.log(error)

      return true;
}

export default callCustomerAction;