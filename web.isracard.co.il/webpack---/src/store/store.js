import { createContext } from 'react';
import { observable, action, runInAction, configure } from 'mobx';

configure({ enforceActions: 'observed' });

class Store {
    @observable initStatus = false;
   
    @observable onlineBankingGeneralText = {};
    @observable isDataHasBeenLoaded = false;
    @observable showModal = false;
    @observable closeModalTemp = true;
    @observable displayOnlineBankingModal = false;
   
    @observable cmsCommonData = {};
    

    @action
    updateStore = (name, value) => {
        this[name] = value;
    }

    
    @action
    setUserOnlineBanking = async () => {
        runInAction(() => {
            this.showModal = this.showModal ? false : true;
        });
    }


    @action closeModal() {
        runInAction(() => {
            this.showModal = false;
        });
    }

   
   


   
    
}


export const store = new Store();
export const storeContext = createContext(store);
// window.cardCancellationStore = store;
