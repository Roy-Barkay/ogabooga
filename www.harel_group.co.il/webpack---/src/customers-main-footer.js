import 'react-app-polyfill/ie11';
//import 'react-app-polyfill/stable';
import 'core-js/features/weak-set';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IndependentFooter from "./Footer/IndependentFooter";
import singleSpaReact from 'single-spa-react';
    
const lifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: IndependentFooter,
    errorBoundary(err, info, props) {
        return (
            <div>מצטערים, היתה שגיאה בטעינת הדף.</div>
        );
    }
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;