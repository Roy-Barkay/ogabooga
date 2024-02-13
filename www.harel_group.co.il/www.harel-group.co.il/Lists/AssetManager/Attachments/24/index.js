import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SimpleApp from './SimpleApp';
import ComplexApp from './ComplexApp';
import reportWebVitals from './reportWebVitals';

// Pnina's Kishkushim
const simple = document.getElementById('SimpleCarrousel');
if (simple)
    ReactDOM.render(<SimpleApp />, simple);

const complex = document.getElementById('ComplexCarrousel');
if (complex)
    ReactDOM.render(<ComplexApp />, complex);

//yavgeny's Kishkushim
// ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );

 reportWebVitals();
