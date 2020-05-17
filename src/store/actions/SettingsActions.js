import SettingsService from '../../services/SettingsService';
import * as ActionTypes from '../ActionTypes';

function loadSettingsData() {
  return async (dispatch) => {
    const initData = await SettingsService.getData();
    dispatch({ type: ActionTypes.SET_SETTING_DATA, payload: initData });
  }
}

function toggleIsCirclesShow() {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.WORLD_MAP_TOGGLE_IS_CIRCLES_SHOW });
    SettingsService.updateWorldMapLocalStorage(getState().settingsStore);
  }
}

function toggleIsTooltipShow() {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.WORLD_MAP_TOGGLE_IS_TOOLTIP_SHOW });
    SettingsService.updateWorldMapLocalStorage(getState().settingsStore);
  }
}

function toggleIsAutoFocus() {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.WORLD_MAP_TOGGLE_IS_AUTO_FOCUS });
    SettingsService.updateWorldMapLocalStorage(getState().settingsStore);
  }
}

function setCirclesDataKey(dataKey) {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.WORLD_MAP_SET_CIRCLES_DATA_KEY, payload: dataKey });
    SettingsService.updateWorldMapLocalStorage(getState().settingsStore);
  }
}

function toggleIsGraphShow() {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.WORLD_MAP_TOGGLE_IS_GRAPH_SHOW });
    SettingsService.updateWorldMapLocalStorage(getState().settingsStore);
  }
}

function toggleIsCountryVoice() {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.SOUNDS_COUNTRY_VOICE });
    SettingsService.updateSoundsLocalStorage(getState().settingsStore);
  }
}

export default {
  loadSettingsData,
  toggleIsCirclesShow,
  toggleIsAutoFocus,
  setCirclesDataKey,
  toggleIsTooltipShow,
  toggleIsGraphShow,
  toggleIsCountryVoice,
}