import CountriesStore from './CountriesStore';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    countriesStore: CountriesStore,
});

export default rootReducer;