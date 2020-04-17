
import UtilsService from '../../services/UtilsService';
import * as ActionTypes from '../ActionTypes';

const initialState = null;

export default (state = initialState, action) => {
  let copy = UtilsService.makeShallowCopy(state);
  switch (action.type) {
    case ActionTypes.SET_SETTING_DATA:
      return action.payload;
    case ActionTypes.WORLD_MAP_TOGGLE_IS_CIRCLES_SHOW:
      copy.worldMap.isCirclesShow = !copy.worldMap.isCirclesShow;
      return copy;
    case ActionTypes.WORLD_MAP_TOGGLE_IS_TOOLTIP_SHOW:
      copy.worldMap.isTooltipShow = !copy.worldMap.isTooltipShow;
      return copy;
    case ActionTypes.WORLD_MAP_TOGGLE_IS_AUTO_FOCUS:
      copy.worldMap.isAutoFocus = !copy.worldMap.isAutoFocus;
      return copy;
    case ActionTypes.WORLD_MAP_SET_CIRCLES_DATA_KEY:
      copy.worldMap.circlesDataKey = action.payload;
      return copy;
    default:
      return state;
  }
}