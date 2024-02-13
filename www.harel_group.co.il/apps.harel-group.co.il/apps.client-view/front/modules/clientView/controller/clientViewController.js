var LINK_NAME_START = "link.";

angular.module('hrl')
    .controller('clientViewController', ['$scope', '$timeout', 'clientViewFactory', 'Utils', '$cookies', '$http', function ($scope,$timeout, _clientViewFactory, _utils, $cookies, $http) {

        //init function
        $scope.init = function () {
            $scope.totalComponents = 9;
            $scope.loadedComponents = 0;
            $scope.finishedLoading = false;
            $scope.hasClaims = false;
            $scope.hasRequests = false;
            $scope.hasLoans = false;
            $scope.carData = "";
            $scope.apartmentData = "";
            $scope.migvanSum = "";
            $scope.rowsLimit = 6;
            $scope.isMsgShow = false;
            //$scope.isMsgShow = false;
            $scope.noClaimsFound = false;
            $scope.noStripsToShow = false;
            $scope.showActions = false;
            $scope.showMurshe = false;
            $scope.claimTopicsToShow = "";
            $scope.claimTypeListToShow = "";
            $scope.showClientDetails = true;

            $scope.mursheFullName = "";
            $scope.mursheTz = "";
            $scope.lastPortalEntry= "";
            $scope.userId= "";
            $scope.inboundOffersResponse={};
            $scope.updatePaymentMethodUrl="";
            $scope.ZAcdnPath = "https://napi.harel-group.co.il/cdn/ZoomAnalytics/";
            //apps-t/ZoomAnalytics.js
            $scope.siudInd= false;
            var paramH = "1";
            var paramI = "1";

            if(_utils.getQsParams('h')!=null){
                paramH =_utils.getQsParams('h').substring(0, 1);
            }
            if(_utils.getQsParams('i')!=null){
                paramI =_utils.getQsParams('i').substring(0, 1);
            }
            if((paramH==null || paramH=="" || paramH=="1")){//Need header of page
                $(".hsg-header").css("display","block");
                if((paramI==null || paramI=="" || paramI=="0")){
                    $(".hsg-top").css("display","block");
                }
            }
            else if(paramH!=null && paramH!="" && paramH=="0")
            {
                $(".hsg-header").css("display","none");
                if((paramI!=null && paramI!="" && paramI=="0")){
                    $(".hsg-top").css("display","none");
                }
            }
            //load page links





            //debugger;
            //if (document.cookie.indexOf("JSESSIONID") == -1) {
            //   _utils.showCookiesErrorPage();
            //   return;
            //alert("בדפדפן שלך קיימת חסימת \"עוגיות\".\nלצפייה בדף יש לבטל את החסימה בהגדרות הדפדפן. ");
            //return;
            //}


            /*var cookieVal = getCookie("infoMsgShow");
            if (cookieVal != undefined && cookieVal != null && cookieVal == "1") {
                $scope.isMsgShow = false;
            }
            else
            {
            	$scope.isMsgShow = true;
            }*/


            _clientViewFactory.loadPageLinks(function (status, data) {
                if (status == 200) {
                    $scope.linksMap = data;
                }
            });

            $scope.getCustomerProducts(function () {
                //

            });

            $scope.getClaims(function () {
                //

            });




            $scope.getRequests(function () {
                //

            });

            $scope.getLoans(function () {
                //

            });


            $scope.getPropertiesValue("rowsLimit", function (data) {
                if (data != null && data != undefined && data.length > 0) {
                    $scope.rowsLimit = data;
                }
            });



            $scope.getPropertiesValue("claimTopicsToShow", function (data) {
                if (data != null && data != undefined && data.length > 0) {
                    $scope.claimTopicsToShow = data;
                }
            });

            $scope.getPropertiesValue("claimTypeListToShow", function (data) {
                if (data != null && data != undefined && data.length > 0) {
                    $scope.claimTypeListToShow = data;
                }
            });

            $scope.getPropertiesValue("updatePaymentMethodUrl", function (data) {
                if (data != null && data != undefined && data.length > 0) {
                    $scope.updatePaymentMethodUrl = data;
                }
            });

            $scope.getPropertiesValue("ZA_domain", function (data) {
                if (data != null && data != undefined && data.length > 0) {
                    $scope.zoomAnaliticsDomain = data;

                    var za_script = document.createElement('script');

                    za_script.setAttribute('src',$scope.ZAcdnPath+data+'/ZoomAnalytics.js');

                    document.getElementsByTagName("head")[0].appendChild(za_script);


                }
            });

            /*var x = "Cookies Enabled: " + window.navigator.cookieEnabled ;
             if (console.log){
             console.log(x);
             }
             else
             alert(x);*/


        };

        $scope.convertDate = function (claim) {
            var arr = claim.eventDate.split("/");
            return new Date(parseInt(arr[2]), parseInt(arr[1]), parseInt(arr[0]));
        };

        $scope.isTopicInShowList = function (claim) {
            var lifeClaimType1StartDate = "01/01/2016";
            var lifeClaimType2StartDate = "16/02/2015";
            var healthAndAbroadClaimStartDate = "01/06/2011";
            var index = $scope.claimTopicsToShow.indexOf(claim.areaReportId);
            var indexClaimTypeId = $scope.claimTypeListToShow.indexOf(claim.claimTypeId);
            var eventDate = claim.eventDate;
            if(eventDate != null && eventDate != undefined && eventDate != "")
            {
                var eventDate=eventDate.split("/");
                var ed=new Date(eventDate[2],eventDate[1],eventDate[0]).getTime();

                var lifeDate1=lifeClaimType1StartDate.split("/");
                var edLife1=new Date(lifeDate1[2],lifeDate1[1],lifeDate1[0]).getTime();

                var lifeDate2=lifeClaimType2StartDate.split("/");
                var edLife2=new Date(lifeDate2[2],lifeDate2[1],lifeDate2[0]).getTime();

                var healtDate=healthAndAbroadClaimStartDate.split("/");
                var hd=new Date(healtDate[2],healtDate[1],healtDate[0]).getTime();


                if(index >= 0)
                    if(claim.areaReportId == "10")
                    {
                        if(indexClaimTypeId >= 0 )
                        {
                            if(ed >= edLife1)
                                return true;
                            else
                                return false;
                        }
                        else if(ed >= edLife2)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else if(claim.areaReportId == "30" || claim.areaReportId == "50")
                    {
                        if(ed >= hd)
                        {
                            return true;
                        }
                    }
                    else if(claim.areaReportId == "70" || claim.areaReportId == "40")
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                else
                {
                    return false;
                }
            }
            else
                return false;
        };

        $scope.getClaims = function (callback) {
            _clientViewFactory.getClaims(function (status, data) {
                if (status == 200 && data != null && data != undefined) {
                    $scope.claims = data;
                    if (data.length > 0)
                        $scope.hasClaims = true;
                    else
                        $scope.noClaimsFound = true;

                    callback();
                    $scope.loadedComponents++;
                    $scope.showPageWhenDone();
                } else {
                    //_utils.showErrorPage();
                }
            });
        };

        $scope.getRequests = function (callback) {
            _clientViewFactory.getRequests(function (status, data) {
                if (status == 200) {
                    $scope.requests = data;
                    if (data.length > 0) $scope.hasRequests = true;

                    callback();
                    $scope.loadedComponents++;
                    $scope.showPageWhenDone();
                } else {
                    //_utils.showErrorPage();
                }
            });
        };

        $scope.getLoans = function (callback) {
            /* _clientViewFactory.getLoans(function (status, data) {
                 if (status == 200) {
                     $scope.loans = data;
                     //if (data.length > 0) $scope.hasLoans = true;

                     callback();
                 } else {
                     //_utils.showErrorPage();
                 }
             });*/
        };

        $scope.getCarDetails = function (elementryId, callback) {
            _clientViewFactory.getCarDetails(elementryId, function (status, data) {
                if (status == 200 && data != null && data != undefined) {
                    $scope.carData = data;
                    callback();
                } else {
                    //_utils.showErrorPage();
                }
            });
        };

        $scope.getApartmentDetails = function (elementryId, callback) {
            _clientViewFactory.getApartmentDetails(elementryId, function (status, data) {
                if (status == 200 && data != null && data != undefined) {
                    $scope.apartmentData = data;
                    callback();
                } else {
                    //_utils.showErrorPage();
                }
            });
        };

        $scope.getMigvanSum = function (callback) {
            _clientViewFactory.getMigvanSum(function (status, data) {
                if (status == 200 && data != null && data != undefined) {
                    //debugger;
                    $scope.migvanSum = data;
                    callback();
                } else {
                    //_utils.showErrorPage();
                }
            });
        };

        $scope.getOnlineRestData = function (callback) {
            _clientViewFactory.getOnlineRestData(function (status, data) {
                if (status == 200 && data != null && data != undefined) {
                    //debugger;
                    $scope.onlineRestData = data;
                    callback();
                } else {
                    //_utils.showErrorPage();
                }
            });
        };

        $scope.getCustomerProducts = function (callback) {
            _clientViewFactory.getCustomerProducts(function (status, data) {
                //debugger;
                if (status == 200) {
                    $scope.marshalData(data);
                    //$scope.finishedLoading = true;
                    callback();
                    $scope.loadedComponents++;
                    $scope.showPageWhenDone();



                    _clientViewFactory.getCampainDetails($scope.userId,function (status, data) {
                        //debugger;
                        if (status == 200) {
                            if(data.errorCode==0 && data.offers != undefined && data.offers.length >-1 && data.offers[0]!=undefined && data.offers[0].campaignCd != undefined && data.offers[0].campaignCd !=''){
                                $scope.displayCampain=true;
                                //$scope.isMsgShow=false;
                            }
                            $scope.inboundOffersResponse = data;

                            callback();
                            $scope.loadedComponents++;
                            $scope.showPageWhenDone();
                            if ($scope.displayCampain && $scope.inboundOffersResponse != undefined && $scope.inboundOffersResponse.offers  != undefined && $scope.inboundOffersResponse.offers.length >-1){
                                var names ='';
                                if ($scope.clientDetails.fullName != undefined && $scope.clientDetails.fullName.indexOf(' ')>-1)
                                    names =  $scope.clientDetails.fullName.split(" ");
                                var fname =  '';
                                var lname = '';
                                if (names != undefined && names.length>0)
                                    if (names[0] != undefined)
                                        fname = names[0];
                                if (names[1] != undefined)
                                    lname = names[1];
                                ///to-business-event
                                _clientViewFactory.toBusinessEvent($scope.clientDetails.userId, fname, lname, $scope.clientDetails.mobilephone, $scope.clientDetails.email, $scope.inboundOffersResponse, '1414',function (status, data) { });

                            }

                        }
                    });


                } else {
                    _utils.showErrorPage();
                }
            });
        };




        $scope.getPropertiesValue = function (propertyName, callback) {
            //get user type
            _clientViewFactory.getPropertiesValue(propertyName, function (status, data) {
                if (status == 200) {
                    if (typeof(callback) == 'function') {
                        callback(data);

                    }
                    $scope.loadedComponents++;
                    $scope.showPageWhenDone();
                } else {
                    //_utils.showErrorPage();
                }
            });

        };

        $scope.marshalData = function (data) {
            $scope.updateTopics = [];
            var topics = data.topicsList;

            if (topics != null) {
                for (var i = 1; i <= 6; i++) {
                    if (topics[i] != undefined) {
                        for (var j = 0; j < topics[i].length; j++) {
                            if (topics[i][j].xtopicId == 11 ||
                                (topics[i][j].xtopicId == 21 && topics[i][j].policiesCount == 1) ||
                                (topics[i][j].xtopicId == 22 && topics[i][j].policiesCount == 1)) {
                                //debugger;
                                topics[i][j].policyDetails = " ...";
                                if (topics[i][j].xtopicId == 22) {
                                    var tempCarI = i;
                                    var tempCarJ = j;
                                    /*$scope.getCarDetails(topics[i][j].policySubjectId,function (){
                                     if($scope.carData != "")
                                     {
                                     topics[tempCarI][tempCarJ].policyDetails = $scope.carData ;
                                     }
                                     else
                                     {
                                     topics[tempCarI][tempCarJ].policyDetails = "רכב אחד";
                                     }

                                     });*/

                                    if(data.policiesList !== null && data.policiesList !== undefined && data.policiesList["22"].length > 0)
                                    {
                                        var future = true;

                                        for(var m=0;m<data.policiesList["22"].length;m++)
                                        {
                                            if(data.policiesList["22"][m].policyStartDateFormatted === "")
                                            {
                                                future = false;
                                                break;
                                            }

                                        }

                                        if(future)
                                            topics[tempCarI][tempCarJ].policyDetails = "תחילת ביטוח: "+data.policiesList["22"][0].policyStartDateFormatted;
                                        else
                                            topics[tempCarI][tempCarJ].policyDetails = "רכב אחד";

                                    }
                                    else
                                    {
                                        topics[tempCarI][tempCarJ].policyDetails = "רכב אחד";
                                    }


                                }

                                if (topics[i][j].xtopicId == 21) {
                                    var tempI = i;
                                    var tempJ = j;
                                    /*$scope.getApartmentDetails(topics[i][j].policySubjectId,function (){
                                     if($scope.apartmentData != "")
                                     {
                                     topics[tempI][tempJ].policyDetails = $scope.apartmentData ;
                                     }
                                     else
                                     {
                                     topics[tempI][tempJ].policyDetails =  "פוליסה אחת";
                                     }
                                     });*/
                                    if(data.policiesList !== null && data.policiesList !== undefined && data.policiesList["21"].length > 0)
                                    {
                                        if(data.policiesList["21"][0].policyStartDateFormatted !== "")
                                        {
                                            topics[tempI][tempJ].policyDetails = "תחילת ביטוח: "+data.policiesList["21"][0].policyStartDateFormatted;
                                        }
                                        else
                                        {
                                            topics[tempI][tempJ].policyDetails = "פוליסה אחת";
                                        }
                                    }
                                    else
                                    {
                                        topics[tempI][tempJ].policyDetails = "פוליסה אחת";
                                    }

                                }

                            }
                            else if(topics[i][j].xtopicId == 32)
                            {
                                $scope.siudInd= true;
                            }
                            else if(topics[i][j].xtopicId == 100 || topics[i][j].xtopicId == 101 || topics[i][j].xtopicId == 102){
                                if(topics[i][j].policiesCount == 1)
                                    topics[i][j].policyDetails = "תיק אחד";
                                else if(topics[i][j].policiesCount > 1)
                                    topics[i][j].policyDetails = topics[i][j].policiesCount + " תיקים";
                                else
                                    topics[i][j].policyDetails = "";
                            }
                            else if(topics[i][j].xtopicId == 91){
                                topics[i][j].policyDetails = "";
                            }
                            else if(topics[i][j].xtopicId == 90){
                                if(topics[i][j].policiesCount == 1)
                                    topics[i][j].policyDetails = "הלוואה אחת";
                                else if(topics[i][j].policiesCount > 1)
                                    topics[i][j].policyDetails = topics[i][j].policiesCount + " הלוואות";
                                else
                                    topics[i][j].policyDetails = "";
                            }
                            else if (topics[i][j].policiesCount == 1) {
                                if (i !== 2 && topics[i][j].xtopicId != 63 && topics[i][j].xtopicId != 64 && topics[i][j].xtopicId != 61 && topics[i][j].xtopicId != 62 && topics[i][j].xtopicId != 70){
                                    topics[i][j].policyDetails = " פוליסה אחת";
                                }
                                else
                                {
                                    topics[i][j].policyDetails = "";
                                }
                            }
                            else if (topics[i][j].policiesCount > 1) {
                                /*if(topics[i][j].xtopicId == 21 )
                                 {
                                 topics[i][j].policyDetails = topics[i][j].policiesCount + " דירות";
                                 }
                                 else */
                                if (topics[i][j].xtopicId == 22) {
                                    topics[i][j].policyDetails = topics[i][j].policiesCount + " כלי רכב";
                                }
                                else if (i !== 2 && topics[i][j].xtopicId != 63 && topics[i][j].xtopicId != 64 && topics[i][j].xtopicId != 61 && topics[i][j].xtopicId != 62 && topics[i][j].xtopicId != 70){
                                    topics[i][j].policyDetails = topics[i][j].policiesCount + " פוליסות";
                                }
                                else
                                {
                                    topics[i][j].policyDetails = "";
                                }
                            }


                            if (topics[i][j].xtopicId == 11) {
                                topics[i][j].policyDetails = " ...";
                                var tempMigvanI = i;
                                var tempMIgvanJ = j;
                                $scope.getMigvanSum(function () {
                                    if ($scope.migvanSum != "" && parseFloat($scope.migvanSum) > 0) {
                                        topics[tempMigvanI][tempMIgvanJ].policyDetails = "₪ " + $scope.migvanSum;
                                    }
                                    else {
                                        topics[tempMigvanI][tempMIgvanJ].policyDetails = "";
                                    }
                                });
                            }



                            if (topics[i][j].xtopicId == 61 || topics[i][j].xtopicId == 62 || topics[i][j].xtopicId == 63 || topics[i][j].xtopicId == 64 || topics[i][j].xtopicId == 70) {
                                topics[i][j].policyDetails = " ...";
                                var tempOnlineI = i;
                                var tempOnlineJ = j;
                                $scope.updateTopics.push({ "i" : tempOnlineI ,"j" : tempOnlineJ});

                            }



                        }
                    }
                }


                if(topics[6] !== undefined && topics[6] != null)
                {
                    var lenLoans = topics[6].length;
                    topics[6].unshift({"sectionOrder" : 1, "xTopicName" : "שינוי אמצעי תשלום" , "xtopicId":"100" ,"url" : "/personal-info/my-harel/Pages/personal-info/set-payment-method-client.aspx" ,"policyDetails":"","sectionName":"הכסף שלי"});
                    topics[6][lenLoans+1] = {"sectionOrder" : 3, "xTopicName" : "בדיקת זכאות להלוואה" , "xtopicId":"90" ,"url" : "/personal-info/loans/Pages/reports/loan-eligibility.aspx" ,"policyDetails":""};
                }
                else
                {
                    topics[6] = [];
                    topics[6][0] = {"sectionOrder" : 1, "xTopicName" : "שינוי אמצעי תשלום" , "xtopicId":"100" ,"url" : "/personal-info/my-harel/Pages/personal-info/set-payment-method-client.aspx" ,"policyDetails":"","sectionName":"הכסף שלי"};
                    topics[6][1] = {"sectionOrder" : 2, "xTopicName" : "בדיקת זכאות להלוואה" , "xtopicId":"90" ,"url" : "/personal-info/loans/Pages/reports/loan-eligibility.aspx" ,"policyDetails":"","sectionName":"הכסף שלי"};
                }
            }
            else {
                $scope.hasClaims = false;
                $scope.noClaimsFound = false;
                $scope.hasRequests = false;
            }


            if($scope.updateTopics !== undefined && $scope.updateTopics != null && $scope.updateTopics.length > 0)
            {
                $scope.getOnlineRestData(function () {
                    if ($scope.onlineRestData != undefined && $scope.onlineRestData !== null ) {

                        for(var k=0;k<$scope.updateTopics.length;k++)
                        {
                            var indexI=$scope.updateTopics[k].i;
                            var indexJ=$scope.updateTopics[k].j;
                            if($scope.onlineRestData[topics[indexI][indexJ].xtopicId] !== undefined && $scope.onlineRestData[topics[indexI][indexJ].xtopicId] !== null)
                            {
                                topics[indexI][indexJ].policyDetails = "₪ " + $scope.onlineRestData[topics[indexI][indexJ].xtopicId];
                            }
                            else
                            {
                                topics[indexI][indexJ].policyDetails = "";
                            }
                        }

                    }
                    else {
                        topics[tempOnlineI][tempOnlineJ].policyDetails = "";
                    }
                });
            }



            $scope.products = topics;
            $scope.clientDetails = data.generalDetails;
            $scope.userId = $scope.clientDetails.userId;
            if($scope.clientDetails.email===null){
                $scope.clientDetails.email="";
            }
            if($scope.clientDetails.mobilephone===null){
                $scope.clientDetails.mobilephone="";
            }


            /*if(data.actions != undefined && data.actions.length > 0)
             {
             $scope.actions = [{ topicId : "0" , topicName : "עדכון פרטים" , xTopicId : "0" , xTopicName : 0 , url : "personalInfo" ,title : "עדכון פרטים"}].concat(data.actions);
             }
             else
             {
             $scope.actions = [{ topicId : "0" , topicName : "עדכון פרטים" , xTopicId : "0" , xTopicName : 0 , url : "personalInfo" ,title : "עדכון פרטים"}];
             }*/
            if(data.actions != undefined && data.actions.length > 0) {
                $scope.actions = data.actions;
                $scope.showActions = true;
            }
            else {
                $scope.showActions = false;
            }

            if(data.mursheList != undefined && Object.keys(data.mursheList).length > 0)
            {



                $scope.mursheList=[];
                var keys = [];
                for (var key in data.mursheList) {
                    if (data.mursheList.hasOwnProperty(key)) {
                        keys.push(key);
                    }
                }

                for(var k=0;k<keys.length;k++)
                {
                    var topicObj=data.mursheList[keys[k]];

                    if(topicObj.length > 0)
                    {
                        if(k==0)
                        {
                            var mursheFname="";
                            var mursheLname="";
                            if(topicObj[0].mursheFirstName != undefined && topicObj[0].mursheFirstName != null && topicObj[0].mursheFirstName != "null" )
                            {
                                mursheFname = topicObj[0].mursheFirstName;
                            }

                            if(topicObj[0].mursheLastName != undefined && topicObj[0].mursheLastName != null && topicObj[0].mursheLastName != "null" )
                            {
                                mursheLname = topicObj[0].mursheLastName;
                            }
                            $scope.mursheFullName = mursheFname+" "+mursheLname;
                            $scope.mursheTz =  topicObj[0].mursheUserId;

                            if($scope.clientDetails == undefined || $scope.clientDetails == null || $scope.clientDetails.length == 0)
                            {
                                $scope.lastPortalEntry = data.lastEntryDate;
                            }
                        }
                        if(topicObj.length > 1)
                        {
                            var mursheUrlLobby = $scope.getLinkUrlByName("murshe.default");
                            if(mursheUrlLobby != null && mursheUrlLobby != "")
                            {
                                $scope.mursheList.push({ "firstName" : topicObj[0].firstName , "mursheUserId": topicObj[0].mursheUserId , "userId": topicObj[0].userId, "url" : mursheUrlLobby+"?FilterParams=ChildId|"+topicObj[0].userId});
                            }
                        }
                        else if(topicObj.length == 1)
                        {
                            /*if(topicObj[0].xtopicId == 64)
                            {
                                $scope.mursheList.push({ "firstName" : topicObj[0].firstName  , "mursheUserId": topicObj[0].mursheUserId , "userId": topicObj[0].userId , "url" : "/personal-info/funding-saving-for-children/Pages/reports/children-savings-policy-details.aspx?FilterParams=policySubjectId|"+topicObj[0].policyNumber+"~ChildId|"+topicObj[0].userId});
                            }
                            else if(topicObj[0].xtopicId == 63)
                            {
                                $scope.mursheList.push({ "firstName" : topicObj[0].firstName, "url" : "/personal-info/funding-saving/Pages/reports/funding-saving-policy-details.aspx"});
                            }
                            else
                            {
                                $scope.mursheList.push({ "firstName" : topicObj[0].firstName, "url" : "/personal-info/funding-saving-for-children/Pages/lobby-children-savings.aspx?FilterParams=ChildId|"+topicObj[0].userId});
                            }*/
                            if(topicObj[0].xtopicId != undefined && topicObj[0].xtopicId != "" && topicObj[0].xtopicId != null)
                            {
                                var mursheUrl = $scope.getLinkUrlByName("murshe.xtopic_"+topicObj[0].xtopicId);
                                if(mursheUrl != null && mursheUrl != "")
                                {
                                    $scope.mursheList.push({ "firstName" : topicObj[0].firstName  , "mursheUserId": topicObj[0].mursheUserId , "userId": topicObj[0].userId , "url" : mursheUrl+"?FilterParams=policySubjectId|"+topicObj[0].policyNumber+"~ChildId|"+topicObj[0].userId});
                                }
                            }
                        }
                    }
                }

                $scope.showMurshe = true;

                if(($scope.products == undefined || $scope.products == null || $scope.products.length == 0) && ($scope.clientDetails == undefined || $scope.clientDetails == null || $scope.clientDetails.length == 0))
                {
                    $scope.showClientDetails = false;
                }
                else
                {
                    $scope.showClientDetails = true;
                }


                if($scope.mursheList != undefined && $scope.mursheList.length > 0)
                {
                    var msg = "";
                    for(var t=0;t<$scope.mursheList.length;t++)
                    {
                        msg += "#^#userId"+(t+1)+"="+$scope.mursheList[t].userId;
                        msg += "#^#firstName"+(t+1)+"="+$scope.mursheList[t].firstName;
                    }
                    _clientViewFactory.writeToLog("858",msg );
                }

            }
            else
            {
                $scope.showMurshe = false;
            }





        };

        $scope.getCurrentDate = function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            today = dd + '/' + mm + '/' + yyyy;
            return today;
        };

        $scope.removeLeadingZeros = function (s) {
            s = s.replace(/^0+/, '');
            return s;
        };


        $scope.onCubeClick = function (product) {
            //debugger;
            PostMsg_Redirect(product.url);
        };

        $scope.onLinkPortalClick = function (urlStr) {
            //debugger;
            PostMsg_Redirect(urlStr);
        };

        $scope.onMursheLinkPortalClick = function (murshe) {
            //debugger;
            var msg = "#^#userId="+murshe.userId+"#^#firstName="+murshe.firstName;
            _clientViewFactory.writeToLog("860",msg );

            PostMsg_Redirect(murshe.url);
        };

        /*$scope.closeMsgStrip = function () {
            //debugger;
            //$cookies["infoMsgShow"] = '1';
            //document.cookie="infoMsgShow=1";
            setCookie("infoMsgShow", "1", 500);
            $scope.isMsgShow = false;
        };*/

        $scope.onContactLinkClick = function (urlStr) {
            //debugger;
            PostMsg_Redirect(urlStr);
        };

        $scope.onLinkPortalClickByName = function (urlName) {
            //debugger;
            $scope.onLinkPortalClick($scope.getLinkUrlByName(urlName));
        };




        $scope.onLinkPortalClickByNameWithParams = function (claim,urlName, params) {
            //debugger;
            if(claim !==null && claim.areaReportId === "70")
            {
                params="?FilterParams=CLAIM_ID|"+claim.claimNumber;
                //params="?CLAIM_NUMBER="+claim.claimNumber+"&MISPAR_ZEHUT="+claim.misparTz;
                urlName="pensionClaim";
                $scope.onLinkPortalClick($scope.getLinkUrlByName(urlName) + params);
            }
            else if(claim !==null && claim.areaReportId === "40")
            {
                $scope.onLinkPortalClick($scope.getLinkUrlByName("dentalClaims") );
            }
            else
            {
                $scope.onLinkPortalClick($scope.getLinkUrlByName(urlName) + params);
            }



        };

        //get link from property file by its name
        $scope.getLinkUrlByName = function (linkName) {
            if ($scope.linksMap != null && $scope.linksMap[LINK_NAME_START + linkName] != null && $scope.linksMap[LINK_NAME_START + linkName] != "") {
                return $scope.linksMap[LINK_NAME_START + linkName];
            } else {
                return "";
            }
        };

        $scope.onLinkPorsheySiudlClick = function () {
            _clientViewFactory.getlinkPorsheySiud($scope.clientDetails.userId, $scope.clientDetails.email, $scope.clientDetails.mobilephone,function (status, data) {
                if (status == 200) {
                    //לפתוח חלון
                    if(data!=""){
                        //debugger;
                        PostMsg_Redirect(data);
                        //window.open(data, "_blank");
                        var names ='';
                        if ($scope.clientDetails.fullName != undefined && $scope.clientDetails.fullName.indexOf(' ')>-1)
                            names =  $scope.clientDetails.fullName.split(" ");
                        var fname =  '';
                        var lname = '';
                        if (names != undefined && names.length>0)
                            if (names[0] != undefined)
                                fname = names[0];
                        if (names[1] != undefined)
                            lname = names[1];
                        ///to-business-event
                        _clientViewFactory.toBusinessEvent($scope.clientDetails.userId, fname, lname, $scope.clientDetails.mobilephone, $scope.clientDetails.email, $scope.inboundOffersResponse, '1415',function (status, data) { });

                    }else{
                        window.open(_utils.showErrorPage(), "_blank");
                    }
                } else {
                    window.open(_utils.showErrorPage(), "_blank");
                }
            });
        };

        $scope.showPageWhenDone = function () {
            if ($scope.loadedComponents == $scope.totalComponents) { // loaded all components
                $scope.finishedLoading = true;
                //if (!$(".topicsStrips").find(">div>:visible").length) {
                //	$(this).hide();
                //}
                if ($scope.hasClaims || $scope.hasRequests || ($scope.products != undefined && $scope.products != null)) {
                    $scope.noStripsToShow = true;
                }
            }
        };

        //controller kickoff function / onload    
        $scope.init();



        function setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        }


    }]);