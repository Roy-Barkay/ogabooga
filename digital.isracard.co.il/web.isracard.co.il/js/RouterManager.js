var RouterManager = (function () {
    var self = {};
    self.routerConfig = [];
    self.isLoggedIn = false;
    let idleAppWarningId = "idleApp";

    //var checkUseDebugConfig = () => {
    //    let useDebugConfig = localStorage.getItem('useDebugConfig');
    //    if (useDebugConfig && useDebugConfig === "true") {
    //        return true;
    //    }
    //    return false;
    //}

    addEventListener("navigationEvent", function (event) { console.log('navigationEvent', event.detail.url); silkrouter.router.set(event.detail.url); });
    addEventListener('unauthenticatedEvent', function () { console.log('401ErrorEvent'); loadApp401(); });
    addEventListener('unauthorizedEvent', function () { console.log('403ErrorEvent'); loadApp403(); });
    addEventListener('serverErrorEvent', function () { console.log('serverErrorEvent'); loadApp500(); });
    addEventListener('idleAppWarningEventShow', function () { console.log('idleAppWarningEventShow'); loadIdleApp(); });
    addEventListener('idleAppWarningEventHide', function () { console.log('idleAppWarningEventHide'); unLoadIdleApp(); });
    addEventListener('attemptRecoverFromErrorEvent', function () { console.log('attemptRecoverFromErrorEvent'); attemptRecoverFromErrorEvent(); });
    addEventListener('openErrorModal', function () { openModal(); });
    addEventListener('openOnlineBankingModal', function () { displayOnlineBankingModal(); });


    self.isSilkRouterRouteExists = false;

    self.setRouterConfig = function (routerConfig) {
        // initError();
        self.routerConfig = routerConfig;
        self.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' ? true : false;
        //self.environment = localStorage.getItem('env').toLowerCase() === 'development' ? 'dev' : 'prod';

        if (!self.isSilkRouterRouteExists) {
            try {
                silkrouter.route(function (e) {
                    resetError();
                    unloadAllApps();
                    doNavigation(e);
                });
            }
            catch (err) {
                // loadApp404();
            }
            self.isSilkRouterRouteExists = true;
        }
    }

    var doNavigation = function (e) {
        currentApplication = undefined;
        if (e.route === '/') {
            window.location.href = window.legacyDomain + '/personalarea/Login';
            return;
        }
        else {
            var appRoute = "/" + e.route.split("/")[1];
            var currApp = self.routerConfig.find(x => x.navigateUrl.toLowerCase() === appRoute.toLowerCase());

            currentApplication = currApp;
        }

        if (currentApplication) {
            if (currentApplication.requireAuth) {
                if (self.isLoggedIn) {
                    loadApp(currentApplication);
                }
                else {
                    window.location.href = window.legacyDomain + '/personalarea/Login?returnUrl=' + window.location.href;
                }
            }
            else {
                loadApp(currentApplication);
            }
        }
        else {
            loadApp404();
        }
    }

    var unloadAllApps = function () {
        if (typeof (currentApplication) !== 'undefined') {

            PubSubService.publish(currentApplication.appName + ".Dispose");
            PubSubService.unsubscribeByAppName(currentApplication.appName);
        }
        var root = document.getElementById("app");
        root.innerHTML = "";
    }

    var loadApp = function (appSettings) {
        //debugConsole.log('loadApp', appSettings.appName)
        //debugConsole.log('loadApp', appSettings)
        window.document.title = appSettings.title;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function (response) {

            if (response.target.readyState === 4 && response.target.status === 200) {

                var manifest = JSON.parse(response.target.responseText);
                var root = document.getElementById("app");
                var documentFragment = document.createDocumentFragment();

                var div = document.createElement("div");
                div.id = appSettings.reactRootElemendId;
                documentFragment.appendChild(div);

                var script = document.createElement("script");

                script.src = appSettings.assetsPath + '/' + manifest[appSettings.bundleName];
                script.id = "script-" + appSettings.reactRootElemendId;
                script.setAttribute("async", "");
                script.onerror = function (scriptError) { console.error(scriptError) };
                documentFragment.appendChild(script);;

                if (manifest[appSettings.stylesName]) {
                    var styleFile = document.createElement('link');
                    styleFile.type = 'text/css';
                    styleFile.id = "style-" + appSettings.reactRootElemendId;
                    styleFile.rel = 'stylesheet';
                    styleFile.href = appSettings.assetsPath + '/' + manifest[appSettings.stylesName];
                    styleFile.onerror = function (styleError) { console.error(styleError) };

                    documentFragment.appendChild(styleFile)
                }

                root.appendChild(documentFragment);

                dispatchEvent(new CustomEvent('windowPathChangedEvent', { detail: { 'url': appSettings.navigateUrl } }));
            }
            if (response.target.readyState === 4 && (response.target.status === 500 || response.target.status === 503)) {

                dispatchEvent(new Event('serverErrorEvent'));
            }
        };
        var manifestFullSrc =/* appSettings.basePath + */ appSettings.assetsPath + '/manifest.json?noCache=' + Math.random();
        xhttp.withCredentials = true;
        xhttp.open("GET", manifestFullSrc, false); //false means synchronous
        xhttp.send();
    }

    var loadApp401 = function () {
        //DOTO change add to appsetting
        //  dispatchEvent(new CustomEvent('navigationEvent', { detail: { 'url': '/account/login?returnUrl=' + window.location.href } }));
        window.location.href = window.loginUrl + "?returnUrl=" + window.location.href;
    };


    var initError = function () {
        document.getElementById("generalErrorTextSpan").innerText = window['siteContainerContent'].generalError;
        document.getElementById("pagenotfoundErrorTextSpan").innerText = window['siteContainerContent'].error404;
        document.getElementById("premissionsErrorTextSpan").innerText = window['siteContainerContent'].error403;
        document.getElementById("goToHomepageButtonText").innerText = window['siteContainerContent'].buttonText;
    };

    var resetError = function () {
        document.getElementById("errorsview-general").style.display = "none";

        document.getElementById("pagenotfoundError").style.display = "none";
        document.getElementById("generalError").style.display = "none";
        document.body.classList.remove('error-scrren');
    };

    var loadApp403 = function () {
        document.body.classList.add('error-scrren');
        document.getElementById("errorsview-general").style.display = "flex";
        document.getElementById("premissionsError").style.display = "block";
    };

    var loadApp404 = function () {
        document.body.classList.add('error-scrren');
        document.getElementById("errorsview-general").style.display = "flex";
        document.getElementById("pagenotfoundError").style.display = "block";
    };


    var loadApp500 = function () {
        document.body.classList.add('error-scrren');
        document.getElementById("errorsview-general").style.display = "flex";
        document.getElementById("generalError").style.display = "block";
    };

    var loadIdleApp = function () {
        var idleApp = document.getElementById(idleAppWarningId);
        idleApp.innerHTML = `<style>.idle-wrapper {top: 0px;width: 100%;height: 100%;display: flex;align-items: center;flex-direction: column;justify-content: center;z-index: 999;background-color: rgb(250, 250, 250,0.8);text-align: center;font-weight: 600;line-height: 1.4;min-height: 100vh;color: #4a4453;font-size: 18px;position: fixed;}.idle-content {transform: translate(0, -30px);width: 100%;}.idle-text {padding: 0 0 15px 0;display: block;}.idle-bar {border: 1px solid #afa8ba;height: 10px;width: calc(100% - 30px);border-radius: 3px;background-color: #ffffff;max-width: 429px;margin: 0 auto;}.idle-bar .fyd-increment {animation: fill 30s linear 1;height: 100%;background-color: #352aff;}@keyframes fill {0% {width: 0%;}100% {width: 100%;}}</style> <div class="idle-wrapper"> <div class="idle-content"><span class="idle-text"> כבר כמה דקות לא בוצעה פעולה <br/> כדי לשמור על פרטיותך, ננתק אותך מהמערכת בעוד 30 שניות<br> אם יש פה מישהו, זה הזמן להזיז קצת את העכבר, שנדע </span><div class='idle-bar'> <div class='fyd-increment'></div></div></div></div>`;
    };

    var unLoadIdleApp = function () {
        var idleApp = document.getElementById(idleAppWarningId);
        idleApp.innerHTML = "";
    };

    var attemptRecoverFromErrorEvent = function () {
        // Figure out whether JSESSIONID have died or it's a one time exception.
        fetch('/keepAlive', { method: 'post' })
            .then(
                function (response) {
                    if (response.status === 204) {
                        // If we are recieveing the exception on homepage, preform logout, as if we'd forward back to homepage, we are creating a loop.
                        if (window.location.pathname.toLowerCase() === '/') {
                            window.dispatchEvent(new Event('LogoutEvent'));
                        } else {
                            window.dispatchEvent(new CustomEvent('navigationEvent', { detail: { 'url': '/' } }));
                        }
                    } else {
                        window.dispatchEvent(new Event('LogoutEvent'));
                    }
                }
            )
            .catch(function (err) {
                window.dispatchEvent(new Event('LogoutEvent'));
            });
    };

    var modal = document.getElementById("errorModal");
    var closeBtn = document.getElementById("closeBtn");

    openModal = function () {
        modal.style.display = "block";
    };

    displayOnlineBankingModal = function () {

        localStorage.setItem('displayOnlineBankingModal', true);
        localStorage.setItem('closeModalTemp', true);

    };

    closeBtn.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    return self;
})();