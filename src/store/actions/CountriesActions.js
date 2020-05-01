import CountriesService from '../../services/CountriesService';
import * as ActionTypes from '../ActionTypes';

function loadCountriesData() {
  return async (dispatch) => {
    const initData = await CountriesService.getData();
    dispatch({ type: ActionTypes.SET_COUNTRIES_DATA, payload: initData });
  }
}

function selectCountry(country) {
  return async (dispatch) => {
    if (country.alpha2 && !country.history) CountriesService.getCountryHistory(country);
    dispatch({ type: ActionTypes.SET_SELECTED_COUNTRY_INDEX, payload: { country } });
  }
}

function setCountryHistory(country, history) {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SET_COUNTRY_HISTORY, payload: { country, history } });
  }
}

export default {
  loadCountriesData,
  selectCountry,
  setCountryHistory
}