/**
 * Author:      Danny Shraga
 * Date:        05/09/2018
 * Description: Injects client scripts which are not bundled, and handles hidden glassbox elements
 */
(function () {
    //declare global module variables
    /**
     * IN CASE OF NO GULP: place here the comma-separated list of DOM elements ids to be masked.
     */
    var SENSITIVE_FIELDS_IDS = "";
    /**
     * IN CASE OF NO GULP: increment the version of the script before each build.
     */
    var SCRIPTS_VERSION = "1.01.02";
    /**
     * IN CASE OF NO GULP: place here the current date and time in the following format 'dd-MM-yyyy HH:mm:ss'.
     * If you do NOT place a value here, the script will dynamically set the current date and time FOR EACH SCRIPT LOAD AT RUNTIME.
     */
    var WEBAPP_DATE = "24-10-2018 17:32:00";
    /**
     * IN CASE OF NO GULP: do nothing and the script will get the context name from the browser's URL,
     * or place here the name of your web application.
     */
    var WEBAPP_NAME = "APP_SERVER_CONTEXT";

    var WEBAPP_VERSION = SCRIPTS_VERSION;
    var SCRIPTS_TO_REMOVE = ["detector-dom.min.js"];
    var SCRIPTS_TO_INJECT = ["detector-dom.min.js"];
    var SCRIPTS_TO_INJECT_ATTRIBUTES = [];
    var SCRIPTS_PATH = "https://napi.harel-group.co.il/cdn/";
    var HIDDEN_ELEMENTS_IDS = ["app_id","version_id","version_date"];
    var HIDDEN_ELEMENTS_VALUES = [];

    function wrapClientScripts() {
        //declare locals
        var startTime = new Date().getTime();

        //replace static values
        replaceStaticValues();

        //inject scripts
        injectScripts();

        //generate hidden elements
        generateHiddens();

        //log the execution duration
        if (window.console && window.console.log) {
            window.console.log("Finished handling client-scripts. Duration took: [" + getDurationString(startTime) + "]");
        }
    }

    function replaceStaticValues() {
        //declare locals
        var glassboxConfig = null;

        //check for static values
        if (WEBAPP_NAME=="APP_SERVER_CONTEXT") {
            WEBAPP_NAME = getWebAppName();
        }
        if (WEBAPP_DATE=="WEBAPP_DATE") {
            WEBAPP_DATE = formatDate(new Date().getTime(),true,false);
        }

        //fix static values
        WEBAPP_VERSION = WEBAPP_NAME + " " + WEBAPP_DATE;

        //fix the global array
        HIDDEN_ELEMENTS_VALUES = [WEBAPP_NAME, WEBAPP_VERSION, WEBAPP_DATE];

        //handle special values
        SENSITIVE_FIELDS_IDS = string2Array(SENSITIVE_FIELDS_IDS);
        if (isEmpty(SENSITIVE_FIELDS_IDS)) {
            SENSITIVE_FIELDS_IDS = "";
        }
        else {
            SENSITIVE_FIELDS_IDS = "maskList=" + array2String(SENSITIVE_FIELDS_IDS) + ";";
        }

        glassboxConfig = "reportURI=https://gbx.harel-group.co.il/glassbox/reporting/cls_report;recordErrors=true;recordScrolls=true;recordMouseMoves=true;" + SENSITIVE_FIELDS_IDS;
        SCRIPTS_TO_INJECT_ATTRIBUTES = [{"id":"_cls_detector","async":"true","data-clsconfig":glassboxConfig}];
    }

    function getDurationString(startTime) {
        //declare locals
        var retVal = "";
        var units = "";
        var duration = 0;
        var endTime = null;

        //check for a valid number
        if (isEmpty(startTime)) {
            return retVal;
        }
        if (isNaN(startTime)) {
            return retVal;
        }

        //set the duration
        endTime = new Date().getTime();
        duration = endTime - startTime;

        //check the duration
        units = "milliseconds";
        if (duration>1000) {
            duration = (duration/1000);
            units = "seconds";
            if (duration>60) {
                duration = (duration/60);
                units = "minutes";
            }
        }

        //set the return value
        retVal = duration + " " + units;

        //return the method's value
        return retVal;
    }

    function isEmpty(input) {
        //declare locals
        var retVal = false;
        var type = "";

        //check the input
        if (input==null || input==undefined || input=="undefined") {
            return true;
        }

        //get the input's type
        type = typeof(input);
        type = type.toLowerCase();

        //check the type and act accordingly
        switch (type) {
            case "string":
                if (input=="null" || input=="undefined" || input=="") {
                    retVal = true;
                }
                break;
            case "boolean":
            case "function":
            case "number":
            case "object":
            default:
                retVal = false;
                break;
        }

        //return the method's value
        return retVal;
    }

    function isInDOM(elementId) {
        //declare locals
        var retVal = false;
        var comp = null;

        if (isEmpty(elementId)) {
            return retVal;
        }

        //get DOM elements by their ids
        comp = document.getElementById(elementId);

        if (isEmpty(comp)) {
            return retVal;
        }

        //return the method's value
        return true;
    }

    function string2Array(input) {
        //declare locals
        var retVal = null;
        var delimiters = new Array(" ",",",";");
        var delimiterIndex = -1;
        var item = null;
        var delimiter = null;

        if (isEmpty(input)) {
            return retVal;
        }

        //get the delimiter
        for (var i=0;i<delimiters.length;i++) {
            //get the current delimiter
            item = delimiters[i];
            delimiterIndex = input.indexOf(item);
            if (delimiterIndex==-1) {
                continue;
            }

            //set the delimiter
            delimiter = item;
            break;
        }

        //check for a delimiter
        if (isEmpty(delimiter)) {
            retVal = new Array(input);
        }
        else {
            retVal = input.split(delimiter);
        }

        //return the method's value
        return retVal;
    }

    function array2String(array) {
        //declare locals
        var retVal = "";
        var delimiter = ",";

        if (isEmpty(array)) {
            return retVal;
        }

        //loop through the array
        for (var i=0;i<array.length;i++) {
            //add a delimiter if necessary
            if (i>0) {
                retVal += delimiter;
            }
            retVal += array[i];
        }

        //return the method's value
        return retVal;
    }

    function getDatePartValue(date,part) {
        //declare locals
        var partValue = "";

        //check for nulls
        if (isEmpty(date)) {
            return partValue;
        }
        if (isEmpty(part)) {
            return partValue;
        }

        //check the part's value
        switch (part) {
            case "d":
            case "dd":
                partValue = String(date.getDate());
                break;
            case "h":
            case "hh":
            case "H":
            case "HH":
                partValue = String(date.getHours());
                break;
            case "m":
            case "mm":
                partValue = String(date.getMinutes());
                break;
            case "M":
            case "MM":
                partValue = String(date.getMonth() + 1);
                break;
            case "s":
            case "ss":
                partValue = String(date.getSeconds());
                break;
            case "S":
            case "SS":
            case "SSS":
                partValue = String(date.getMilliseconds());
                break;
            case "yyyy":
                partValue = String(date.getFullYear());
                break;
        }

        //complete the length of the value, according to the given part
        while (partValue.length<part.length) {
            partValue = "0" + partValue;
        }

        //return the method's value
        return partValue;
    }

    function formatDate(timestamp,showSeconds,showMilliseconds) {
        //declare locals
        var date = null;
        var dateDelimiter = "-";
        var timeDelimiter = ":";
        var dateFormatParts = ["dd","MM","yyyy"];
        var timeFormatParts = ["HH","mm"];
        var datePart = "";
        var timePart = "";
        var formattedDate = "";

        //check for nulls
        if (isEmpty(timestamp)) {
            date = new Date();
        }
        else if (isNaN(timestamp)) {
            date = new Date();
        }
        else {
            date = new Date(timestamp);
        }

        //set defaluts if necessary
        if (isEmpty(showSeconds)) {
            showSeconds = false;
        }
        if (isEmpty(showMilliseconds)) {
            showMilliseconds = false;
        }

        //loop through the format parts
        for (var i=0;i<dateFormatParts.length;i++) {
            if (i>0) {
                datePart += dateDelimiter;
            }
            datePart += getDatePartValue(date,dateFormatParts[i]);
        }
        for (var i=0;i<timeFormatParts.length;i++) {
            if (i>0) {
                timePart += timeDelimiter;
            }
            timePart += getDatePartValue(date,timeFormatParts[i]);
        }
        if (showSeconds==true) {
            timePart += timeDelimiter + getDatePartValue(date,"ss");
        }
        if (showMilliseconds==true) {
            timePart += timeDelimiter + getDatePartValue(date,"SSS");
        }

        //set the return value
        formattedDate = datePart + " " + timePart;

        //return the method's value
        return formattedDate;
    }

    function getWebAppName() {
        //declare locals
        var href = window.location.href;
        var webappName = null;
        var pathDelimiter = "/";
        var startIndex = -1;
        var endIndex = -1;

        //check for valid values
        if (isEmpty(href)) {
            return webappName;
        }

        //check for the first path delimiter
        startIndex = href.indexOf(pathDelimiter,9);
        if (startIndex==-1) {
            return webappName;
        }

        //get the next delimiter
        endIndex = href.indexOf(pathDelimiter,startIndex+1);
        if (startIndex==-1) {
            webappName = href.substring(startIndex+1);
        }
        else {
            webappName = href.substring(startIndex+1,endIndex);
        }

        //return the method's value
        return webappName;
    }

    function isBrowserIE() {
        //declare local variables
        var ua = window.navigator.userAgent;
        var msie = -1;

        //check for nulls
        if (isEmpty(ua)) {
            //browsers which do not have a userAgent support are treated as problematic browsers (like IE)
            return true;
        }

        //check for an IE browser
        msie = ua.indexOf("MSIE ");

        //return the method's value
        return ((msie == -1) ? false : true);
    }

    function scriptIsInDOM(src) {
        var script = getScriptBySource(src);
        if (isEmpty(script)) {
            return false;
        }
        return true;
    }

    function getScriptBySource(src) {
        //declare locals
        var scripts = document.getElementsByTagName("script");
        var script = null;
        var currSrc = null;
        var retVal = null;

        //check for nulls
        if (isEmpty(scripts)) {
            return retVal;
        }

        //loop through them
        for (var i=0;i<scripts.length;i++) {
            //get the current item
            script = scripts[i];

            //get the script's src attribute
            if (script.src) {
                currSrc = script.src;
                if (currSrc.indexOf(src) != -1) {
                    retVal = script;
                    break;
                }
            }
        }

        //return the method's value
        return retVal;
    }

    function injectScripts() {
        //declare locals
        var parent = document.getElementsByTagName("head")[0];
        var domElem = null;
        var elemSrc = null;
        var atts = null;
        var scriptVersion = "?v=" + SCRIPTS_VERSION;

        //check for nulls
        if (parent==null || parent=="undefined") {
            return;
        }

        /**
         * set the version according to the browser.
         * Since IE has cache problems, we will use timestamp, to force him to always fetch the script from the server.
         * Other browser will fetch the script from the server, according to the HTTP response code (200 OK, or 304 Not Modified)
         **/
        if (isBrowserIE()) {
            scriptVersion = "?v=" + formatDate(new Date().getTime(),true,false);
        }

        //loop through the ids
        for (var i=0;i<SCRIPTS_TO_INJECT.length;i++) {
            //get the current item's src and attributes
            elemSrc = SCRIPTS_PATH + SCRIPTS_TO_INJECT[i];
            atts = SCRIPTS_TO_INJECT_ATTRIBUTES[i];

            //check if the script already exists
            if (scriptIsInDOM(elemSrc)) {
                continue;
            }

            //create a new element
            domElem = document.createElement("script");
            domElem.setAttribute("src",elemSrc + scriptVersion);

            //check for attributes
            if (atts!=null) {
                //loop through the attributes
                for (var prop in atts) {
                    domElem.setAttribute(prop,atts[prop]);
                }
            }

            //append the new element to the parent
            parent.appendChild(domElem);
        }
    }

    function generateHiddens() {
        //declare locals
        var parent = document.getElementsByTagName("body")[0];
        var domElem = null;
        var elemId = null;

        //check for nulls
        if (parent==null || parent=="undefined") {
            return;
        }

        //loop through the ids
        for (var i=0;i<HIDDEN_ELEMENTS_IDS.length;i++) {
            //get the current id
            elemId = HIDDEN_ELEMENTS_IDS[i];

            //check if the element exists
            if (!isInDOM(elemId)) {
                //create a new element
                domElem = document.createElement("input");
                domElem.setAttribute("id",elemId);
                domElem.setAttribute("name",elemId);
                domElem.setAttribute("type","hidden");
                domElem.setAttribute("value",HIDDEN_ELEMENTS_VALUES[i]);

                //append the new element to the parent
                parent.appendChild(domElem);
            }
        }
    }

    wrapClientScripts();

})();
