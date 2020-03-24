import CountriesService from '../../services/CountriesService';
import * as ActionTypes from '../ActionTypes';

function loadCountriesData() {
  return async (dispatch) => {
    const initData = await CountriesService.getData();
    dispatch({ type: ActionTypes.SET_COUNTRIES_DATA, payload: initData })
  }
}

export default {
  loadCountriesData
}