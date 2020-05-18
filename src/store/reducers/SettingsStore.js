
import UtilsService from '../../services/UtilsService';
import * as ActionTypes from '../ActionTypes';

const initialState = null;

export default (state = initialState, action) => {
  let copy = UtilsService.makeShallowCopy(state);
  switch (action.type) {
    case ActionTypes.SET_SETTING_DATA:
      return action.payload;
    case ActionTypes.UPDATE_WORLD_MAP:
      copy.worldMap = { ...copy.worldMap, ...action.payload };
      return copy;
    case ActionTypes.UPDATE_SOUNDS:
      copy.sounds = { ...copy.sounds, ...action.payload };
      return copy;
    default:
      return state;
  }
}