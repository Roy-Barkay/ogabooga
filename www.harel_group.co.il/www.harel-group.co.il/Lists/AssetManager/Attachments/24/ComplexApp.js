import './App.css';
import ComplexCategory from './ComplexCarrousel/ComplexCategory/ComplexCategory';
import {BaseLayoutProvider} from 'common-ui';
function ComplexApp() {
  return (
    <div >
         <BaseLayoutProvider>
      <header>
       <ComplexCategory/>
      </header>
      </BaseLayoutProvider>
    </div>
  );
}

export default ComplexApp;
