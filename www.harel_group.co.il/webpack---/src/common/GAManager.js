import React, { useEffect } from "react";
export function GALogin(){    
    var dataLayer = window["dataLayer"];
        if (dataLayer !== undefined) {
                dataLayer.push({
                GA_EventCategory: "Login and Registrarion",
                GA_EventAction:"Successful Registration",               
                event: 'GTM event To GA'
              });
            }             
}
export function GAClick(Component, data){    
    //log data
    // this.dataLayer = window["dataLayer"];
    //     if (this.dataLayer !== undefined) {
    //        {
    //           this.dataLayer.push({
    //             GA_EventCategory: data["category"] || "",
    //             GA_EventAction:data["action"] || "",
    //             GA_EventLabel:datas["label"] || "",
    //             event: 'GTM event To GA'
    //           });
    //         }
    //       }
    console.log(data);
}
export function GAImpression(Component, data){
    const GAI = (props) => {
useEffect(()=>{
    //log data
  
    // this.dataLayer = window["dataLayer"];
    //     if (this.dataLayer !== undefined) {
    //        {
    //           this.dataLayer.push({
    //             GA_EventCategory: data["category"] || "",
    //             GA_EventAction:data["action"] || "",
    //             GA_EventLabel:datas["label"] || "",
    //             event: 'GTM event To GA'
    //           });
    //         }
    //       }
    console.log(data);
},[]);
    return <Component {...props}/>
    }
    return GAI;
}
