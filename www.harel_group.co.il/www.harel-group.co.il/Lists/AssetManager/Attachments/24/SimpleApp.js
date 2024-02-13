import './App.css';
import SimpleCarrousel from './SimpleCarrousel/SimpleCarrousel';
import {BaseLayoutProvider} from 'common-ui';
function SimpleApp() {
  return (
    <div >
         <BaseLayoutProvider>
      <header>
       <SimpleCarrousel/>
      </header>
      </BaseLayoutProvider>
    </div>
  );
}

export default SimpleApp;
