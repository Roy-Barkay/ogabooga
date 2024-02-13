import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import singleSpaReact from 'single-spa-react';

const lifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: App,
    errorBoundary(err, info, props) {
      console.log('Scannovate - error');
      console.log(err);
        return (
          <div>מצטערים, היתה שגיאה בטעינת הדף.</div>
        );
      }
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;