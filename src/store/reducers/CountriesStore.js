
import UtilsService from '../../services/UtilsService';
import * as ActionTypes from '../ActionTypes';

const initialState = null;

export default (state = initialState, action) => {
  let copy = UtilsService.makeShallowCopy(state);
  switch (action.type) {
    case ActionTypes.SET_COUNTRIES_DATA:
      return action.payload;
    case ActionTypes.SET_SELECTED_COUNTRY_INDEX:
      const idx = copy.countries.findIndex(country => country.name === action.payload.country.name);
      copy.selectedCountryIndex = idx > -1 && copy.selectedCountryIndex !== idx ? idx : null;
      if (action.payload.history) copy.countries[idx].history = action.payload.history;
      return copy;
    // case ActionTypes.SET_COUNTRY_HISTORY:
    //   const idx2 = copy.countries.findIndex(country => country.name === action.payload.country.name);
    //   copy.countries[idx2].history = action.payload.history;
    //   return copy;
    default:
      return state;
  }
}