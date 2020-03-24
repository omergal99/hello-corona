
// import UtilsService from '../../services/UtilsService';
import * as ActionTypes from '../ActionTypes';

const initialState = null;

export default (state = initialState, action) => {
  // let copy = UtilsService.makeShallowCopy(state);
  switch (action.type) {
    case ActionTypes.SET_COUNTRIES_DATA:
      return action.payload;
    default:
      return state;
  }
}