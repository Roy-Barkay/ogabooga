import axios from "axios";

export function getResource() {
    const url = `/_vti_bin/webapi/Scanovate/GetContentIdentification/`;
    return new Promise((resolve, reject)=>{

        axios.get(url)
            .then(res => {
                 if (res && res.status == 200) {
                     for (var key in res.data) {
                         var val = res.data[key];
                         res.data[key] = val ;//? val.replace('-', '-\u2060'): val;
                     }
                 }
                resolve(res);
            })
            .catch(error => {console.log(error); reject(error)});
    })
}