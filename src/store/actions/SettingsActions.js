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
    const isCirclesShow = !getState().settingsStore.worldMap.isCirclesShow;
    dispatch({ type: ActionTypes.UPDATE_WORLD_MAP, payload: { isCirclesShow } });
    SettingsService.updateSettingsLocalStorage(getState().settingsStore);
  }
}

function toggleIsTooltipShow() {
  return async (dispatch, getState) => {
    const isTooltipShow = !getState().settingsStore.worldMap.isTooltipShow;
    dispatch({ type: ActionTypes.UPDATE_WORLD_MAP, payload: { isTooltipShow } });
    SettingsService.updateSettingsLocalStorage(getState().settingsStore);
  }
}

function toggleIsAutoFocus() {
  return async (dispatch, getState) => {
    const isAutoFocus = !getState().settingsStore.worldMap.isAutoFocus;
    dispatch({ type: ActionTypes.UPDATE_WORLD_MAP, payload: { isAutoFocus } });
    SettingsService.updateSettingsLocalStorage(getState().settingsStore);
  }
}

function setCirclesDataKey(circlesDataKey) {
  return async (dispatch, getState) => {
    dispatch({ type: ActionTypes.UPDATE_WORLD_MAP, payload: { circlesDataKey } });
    SettingsService.updateSettingsLocalStorage(getState().settingsStore);
  }
}

function toggleIsGraphShow() {
  return async (dispatch, getState) => {
    const isGraphShow = !getState().settingsStore.worldMap.isGraphShow;
    dispatch({ type: ActionTypes.UPDATE_WORLD_MAP, payload: { isGraphShow } });
    SettingsService.updateSettingsLocalStorage(getState().settingsStore);
  }
}

function toggleIsCountryVoice() {
  return async (dispatch, getState) => {
    const isCountryVoice = !getState().settingsStore.sounds.isCountryVoice;
    dispatch({ type: ActionTypes.UPDATE_SOUNDS, payload: { isCountryVoice } });
    SettingsService.updateSettingsLocalStorage(getState().settingsStore);
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