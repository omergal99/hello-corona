import CountriesStore from './CountriesStore';
import SettingsStore from './SettingsStore';
import ServiceWorkerStore from './ServiceWorkerStore';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    countriesStore: CountriesStore,
    settingsStore: SettingsStore,
    serviceWorkerStore: ServiceWorkerStore,
});

export default rootReducer;