import 'es7-object-polyfill';
import 'polyfill-array-includes';
import 'array-flat-polyfill';
import 'core-js/es6/set';
import 'core-js/es6/symbol';
import 'array-findindex-polyfill';
import React, { useState, useEffect } from 'react';
import MainLogin from './components/MainLogin/MainLogin';
import { ResourceContext } from './common/context/ResourceContext';
import { getResource } from './common/services/ResourceService';
import { ThemeProvider } from 'harelkit'
import './common/Polypils';
import './App.css';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { globalReducer } from './common/ReduxGeneral';
const store = createStore(globalReducer);


function App() {

  const [resources, setResourses] = useState({}); 
  useEffect(() => {

    getResource().then(
      res => {
        if (res.status == 200) {
          setResourses(res.data);
        }
      });

  }, [setResourses]);

  return (
    
    <ThemeProvider seed="scan" productionPrefix="harel_kit">      
        <ResourceContext.Provider value={resources}>
        <Provider store={store}>
          <MainLogin />
          </Provider>
        </ResourceContext.Provider>    
    </ThemeProvider>
     
  )
}

export default App;