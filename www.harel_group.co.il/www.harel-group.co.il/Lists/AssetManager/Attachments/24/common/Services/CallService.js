import axios from "axios";

export function GetComplexItems() {
    var data={};
    const url = `/_vti_bin/webapi/Carrousel/GetComplexCarrouselItems`;
    return new Promise((resolve, reject)=>{
    console.log("url:"+url)
        axios.get(url)
            .then(res => {  
                 resolve(res);
            })
            .catch(error => {console.log(error); reject(error)});
    })
}


export function GetCarrouselItems() {
  //  const url = `https://www-dev.harel-group.co.il/_vti_bin/webapi/Carrousel/GetItems/`;
  const url = `/_vti_bin/webapi/Carrousel/GetSimpleCarrouselItems`;
  // console.log("url: "+ url);

    return new Promise((resolve, reject)=>{

        axios.get(url)
            .then(res => {
                resolve(res);
                //console.log("GetCarrouselItems "+res);
            })
            .catch(error => {console.log("GetCarrouselItems "+error); reject(error)});
    })
}