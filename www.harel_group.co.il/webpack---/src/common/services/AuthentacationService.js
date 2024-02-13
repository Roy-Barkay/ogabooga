import axios from "axios";

export function sendAuth(actionName, data) {
    const url = `/_vti_bin/webapi/CustomersAuthentication/PostAuthenticate/${actionName}`;
    return new Promise((resolve, reject)=>{

        axios.post(url, data)
            .then(res => {
       
                resolve(res);
            })
            .catch(error => {console.log(error); reject(error)});
    })
}