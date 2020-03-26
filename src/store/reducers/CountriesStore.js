
import UtilsService from '../../services/UtilsService';
import * as ActionTypes from '../ActionTypes';

const initialState = null;

export default (state = initialState, action) => {
  let copy = UtilsService.makeShallowCopy(state);
  switch (action.type) {
    case ActionTypes.SET_COUNTRIES_DATA:
      return action.payload;
    case ActionTypes.SET_SELECTED_COUNTRY_INDEX:
      const idx = copy.countries.findIndex(country => country.name === action.payload.name);
      copy.selectedCountryIndex = copy.selectedCountryIndex === idx ? null : idx;
      return copy;
    default:
      return state;
  }
}