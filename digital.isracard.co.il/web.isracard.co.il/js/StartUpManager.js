
var StartUpManager = (() => {

    addEventListener('LoginEvent', () => {
        init(); //startUp is a synchronous function
    });

    addEventListener('LogoutEvent', () => {
        AjaxHelper.postData('/Logout').then((result) => {
            init(); //startUp is a synchronous function
            dispatchEvent(new CustomEvent('navigationEvent', { detail: { 'url': '/' } }));
            document.getElementById('idleApp').innerHTML = '';
        });
    });

    addEventListener('SetScreenTitle', (e) => {
        var element = document.getElementsByTagName('welcome-back-wrapper')[0];

        if (element !== null && e.detail && e.detail.title) {
            element.setAttribute("title", e.detail.title);
        }
    });

    var init = async () => {
       
        var { initData, isSuccess } = await AjaxHelper.getData('/Init').catch((e) => { dispatchEvent(new Event('serverErrorEvent')); });
        var res = initData;
        if (!isSuccess)
            window.location.href = initData.legacyDomain + "/personalarea/Login/?returnUrl=" + window.location.href;

        window.legacyDomain = res.legacyDomain;
        localStorage.setItem('isLoggedIn', res.isLoggedIn);
        RouterManager.setRouterConfig(res.appRouteConfig);

        window.userDetails = res.userDetails;
        window.HeaderData = JSON.parse(res.headerDataSource);
        window.FooterData = JSON.parse(res.footerDataSource);
        window.generalData = JSON.parse(res.generalDataSource);
        window.commonData = JSON.parse(res.commonDataSource);
        window.loginUrl = res.loginUrl;
        window.digitalData = res.digitalData;
        window.env = res.env;

        unloadMenus();

        await loadHeaderMenuApp(res.isLoggedIn);

        if (window.currentApplication.displaySidebarMenu) {
            await loadSideBarMenuApp(res.isLoggedIn);
        }

        await loadFooterMenuApp(res.isLoggedIn);

        if (window.currentApplication.requireOnlineBanking && localStorage.getItem('isLoggedIn') === 'true') {

            localStorage.removeItem('closeModalTemp', false);
            localStorage.removeItem('displayOnlineBankingModal', false);
            var onlineBankingResres = await AjaxHelper.postData('/OnlineBankingCheckBeService').catch((e) => { dispatchEvent(new Event('serverErrorEvent')); });
            if (onlineBankingResres.data.internetCommCode === '0' || onlineBankingResres.data.internetCommCode === '1' || onlineBankingResres.data.internetCommCode === '3') {

                dispatchEvent(new Event('openOnlineBankingModal'));
            }
        }


        await loadOnlineBankingModalApp(res.isLoggedIn);

        if (res.isLoggedIn) {
            $('.digital--main').prepend('<welcome-back-wrapper></welcome-back-wrapper>');
            setLoggedInBehavior();
        }
        else {
            setLoggedoutBehavior();
        }

    };

    var checkOnlineBanking = async () => {
        var res = await AjaxHelper.getData('/CheckOnlineBanking').catch((e) => { dispatchEvent(new Event('serverErrorEvent')); });
        await loadOnlineBankingModalApp(res.isLoggedIn);
    };

    var setLoggedoutBehavior = () => {
        //    Idle.startPreLoginIdler();
    };

    var setLoggedInBehavior = () => {
        Idle.startPostLoginIdler();
    };

    var unloadMenus = () => {
        document.getElementById('headerApp').innerHTML = '';
        document.getElementById('headerApp').className = '';
        document.getElementById('footerApp').innerHTML = '';
        document.getElementById('footerApp').className = '';
    };

    var loadFooterMenuApp = async (isLoggedIn) => {
        var element = document.getElementById('footerApp');
        var documentFragment = await getDocumentFragment("Footer");
        element.appendChild(documentFragment);
    };

    var loadSideBarMenuApp = async (isLoggedIn) => {
        var element = document.getElementById('sideBarApp');
        var documentFragment = await getDocumentFragment("SideBar");
        element.appendChild(documentFragment);
    };

    var loadHeaderMenuApp = async (isLoggedIn) => {
        var element = document.getElementById('headerApp');
        var documentFragment = await getDocumentFragment("Header");
        element.appendChild(documentFragment);
    };

    var loadOnlineBankingModalApp = async (isLoggedIn) => {
        var element = document.getElementById('onlineBankingModalApp');
        var documentFragment = await getDocumentFragment("OnlineBankingModal");
        element.appendChild(documentFragment);
    };

    var getDocumentFragment = async (appName) => {

        var basePath = `/Digital.SiteContainer.${appName}/${window.env}/`;
        var manifestFullSrc = basePath + '/manifest.json?noCache=' + Math.random();

        var manifest = await AjaxHelper.getData(manifestFullSrc);

        var documentFragment = document.createDocumentFragment();
        const div = document.createElement('div');
        div.id = `Digital.SiteContainer.${appName}`;

        const script = document.createElement('script');
        script.src = basePath + manifest[`Digital.SiteContainer.${appName}.js`];
        script.setAttribute('async', '');
        script.onerror = () => { alert(JSON.stringify(scriptError)) };

        documentFragment.appendChild(div);
        documentFragment.appendChild(script);

        var cssFilePath = manifest[`Digital.SiteContainer.${appName}.css`];
        if (cssFilePath) {
            var styleFile = document.createElement('link');
            styleFile.type = 'text/css';
            styleFile.rel = 'stylesheet';
            styleFile.href = basePath + manifest[`Digital.SiteContainer.${appName}.css`];
            documentFragment.appendChild(styleFile);
        }

        return documentFragment;
    };

    window.onload = init;
})();



