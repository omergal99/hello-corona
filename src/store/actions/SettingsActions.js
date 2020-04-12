import SettingsService from '../../services/SettingsService';
import * as ActionTypes from '../ActionTypes';

function loadSettingsData() {
  return async (dispatch) => {
    const initData = await SettingsService.getData();
    dispatch({ type: ActionTypes.SET_SETTING_DATA, payload: initData })
  }
}

function toggleIsCirclesShow() {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.WORLD_MAP_TOGGLE_IS_CIRCLES_SHOW })
  }
}

function toggleIsAutoFocus() {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.WORLD_MAP_TOGGLE_IS_AUTO_FOCUS })
  }
}

export default {
  loadSettingsData,
  toggleIsCirclesShow,
  toggleIsAutoFocus,
}