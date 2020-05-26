
import UtilsService from '../../services/UtilsService';
import * as ActionTypes from '../ActionTypes';

const initialState = {
  isInitialized: false,
  isUpdated: false,
  registration: null,
}

export default (state = initialState, action) => {
  let copy = UtilsService.makeShallowCopy(state);
  switch (action.type) {
    case ActionTypes.SW_INIT:
      copy.isInitialized = true;
      // console.log('Service Worker installed, Ready to use Offline.');
      return copy;

    case ActionTypes.SW_UPDATE:
      copy.isUpdated = true;
      copy.registration = action.payload;
      // console.log('Registration', action.payload);
      return copy;

    default:
      return state;
  }
}