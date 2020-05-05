
import UtilsService from '../../services/UtilsService';
import * as ActionTypes from '../ActionTypes';

// const initialState = null;
const initialState = {
  isServiceWorkerInitialized: false,
  isServiceWorkerUpdated: false,
  serviceWorkerRegistration: null,
}

export default (state = initialState, action) => {
  let copy = UtilsService.makeShallowCopy(state);
  switch (action.type) {
    case ActionTypes.SW_INIT:
      console.log('SW_INIT');
      copy.isServiceWorkerInitialized = true;
      return copy;
      
      case ActionTypes.SW_UPDATE:
        console.log('SW_UPDATE');
      console.log(action.payload);
      copy.isServiceWorkerUpdated = true;
      copy.serviceWorkerRegistration = action.payload;
      return copy;

    default:
      return state;
  }
}