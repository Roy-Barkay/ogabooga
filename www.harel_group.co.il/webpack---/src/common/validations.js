import React, { useEffect } from "react";
export function isMobile(value){    
    var pattern = new RegExp(/^[0][5][0|1|2|3|4|5|6|7|8|9]{1}[-]{0,1}[0-9]{7}$/g);
    return pattern.test(value);          
}