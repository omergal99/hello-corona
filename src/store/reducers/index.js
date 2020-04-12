import CountriesStore from './CountriesStore';
import SettingsStore from './SettingsStore';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    countriesStore: CountriesStore,
    settingsStore: SettingsStore,
});

export default rootReducer;