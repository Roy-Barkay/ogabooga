import React from 'react';

function MessageTime() {
    let message = null;

    let date = new Date();
    if (checkTime(date, 6, 0, 11, 59)) {
        message = "בוקר טוב";
    }
    else if (checkTime(date, 12, 0, 16, 59)) {
        message = "צהריים טובים";
    }
    else if (checkTime(date, 17, 0, 21, 59)) {
        message = "ערב טוב";
    }
    else {
        message = "לילה טוב";
    }
    return (
        <span id="msg">{message} </span>
    );

}
function checkTime(check, fh, fm, th, tm) {

    var from = new Date();
    var to = new Date();
    from.setHours(fh, fm, 0, 0);
    to.setHours(th, tm, 0, 0);
    if ((check.getTime() <= to.getTime() && check.getTime() >= from.getTime()))
        return true;
};
export default MessageTime;