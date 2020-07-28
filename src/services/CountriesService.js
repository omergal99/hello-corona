import ApiService from './ApiService';

import JSONcoronaCountries from './data/coronaCountries.json';
import JSONcoronaWorld from './data/coronaWorld.json';
import JSONcoronaWorldHistory from './data/coronaWorldHistory.json';
import JSONcoronaCountriesHistory from './data/coronaCountriesHistory.json';
import countries from './data/countries.json';
import countriesPopulation from './data/countriesPopulation.json';

import {
  CASES, TODAY_CASES, DEATHS, TODAY_DEATHS, RECOVERED, ACTIVE, CRITICAL, CASES_PER_ONE_MILLION,
  DEATHS_PER_ONE_MILLION, TESTS, TESTS_PER_ONE_MILLION, CONTINENT, HISTORY, POPULATION, RANK
} from '../constants/DataKeys';

import StorageService from './StorageService';
import { getTimestempSubHours } from './UtilsService';
import { COUNTRIES_STATE, LAST_TIME_GET_COUNTRIES } from '../constants/LocalStorageKeys';

import ServiceConfig from '../config/ServiceConfig';
import actions from '../store/actions';
import store from '../store/AppStore';

const EXPIRED_LCL_STRG_HOURS = 4;

async function getData() {
  const initState = _getEmpty();
  let coronaCountries = JSONcoronaCountries;
  let coronaWorld = JSONcoronaWorld;
  let coronaWorldHistory = JSONcoronaWorldHistory;
  if (ServiceConfig.isServerCountriesConnected) {
    const countriesLclStrg = StorageService.load(COUNTRIES_STATE);
    if (countriesLclStrg) {
      if (countriesLclStrg.coronaCountries) coronaCountries = countriesLclStrg.coronaCountries;
      if (countriesLclStrg.coronaWorld) coronaWorld = countriesLclStrg.coronaWorld;
      if (countriesLclStrg.coronaWorldHistory) coronaWorldHistory = countriesLclStrg.coronaWorldHistory;
    }
    if (_isLclStrgExpired()) {
      const dataAPI = await _getStateDataAPI();
      if (dataAPI) {
        if (dataAPI.coronaCountries) coronaCountries = dataAPI.coronaCountries;
        if (dataAPI.coronaWorld) coronaWorld = dataAPI.coronaWorld;
        if (dataAPI.coronaWorldHistory) coronaWorldHistory = dataAPI.coronaWorldHistory;
        StorageService.store(COUNTRIES_STATE, dataAPI);
        StorageService.store(LAST_TIME_GET_COUNTRIES, Date.now());
      }
    }
  }
  initState.countries = _mergeCoronaData(coronaCountries);
  initState.worldData = _createWorldData(coronaWorld, coronaWorldHistory);
  return Promise.resolve(initState);
}

async function getCountryHistory(country) {
  let serverCountryHistory = JSONcoronaCountriesHistory.find(his => his.country === country.name);
  const { isGraphShow } = store.getState().settingsStore.worldMap;
  if (ServiceConfig.isServerCountriesConnected && isGraphShow) {
    const getCountryHistory = ApiService.getCountryHistory(country.numericCode);
    serverCountryHistory = await getCountryHistory;

    const countriesLclStrg = StorageService.load(COUNTRIES_STATE);
    if (countriesLclStrg) {
      const countries = countriesLclStrg.coronaCountries || [];
      const idx = countries.findIndex(corona => corona.countryInfo._id === country.numericCode);
      if (idx > -1) countriesLclStrg.coronaCountries[idx][HISTORY] = serverCountryHistory;
      StorageService.store(COUNTRIES_STATE, { ...countriesLclStrg });
    }
  }
  store.dispatch(actions.setCountryHistory(country, serverCountryHistory));
}

export default {
  getData,
  getCountryHistory,
}

const _getEmpty = () => ({
  countries: [],
  selectedCountryIndex: null,
  worldData: null
})

const _isLclStrgExpired = () => {
  const lastTimeAskCountries = StorageService.load(LAST_TIME_GET_COUNTRIES);
  return lastTimeAskCountries < getTimestempSubHours(EXPIRED_LCL_STRG_HOURS);
}

const _getStateDataAPI = async () => {
  const getCoronaCountries = ApiService.getCoronaCountries();
  const getCoronaWorld = ApiService.getCoronaWorld();
  const getWorldHistory = ApiService.getWorldHistory();
  const coronaCountries = await getCoronaCountries;
  const coronaWorld = await getCoronaWorld;
  const coronaWorldHistory = await getWorldHistory;
  if (!coronaCountries || !coronaWorld || !coronaWorldHistory) {
    alert('There is problem with data access.\nDisplays latest system data.');
  }
  const resObj = { coronaCountries, coronaWorld, coronaWorldHistory };
  const isEmpty = Object.keys(resObj).length === 0 && resObj.constructor === Object;
  return !isEmpty ? resObj : null;
}

const _mergeCoronaData = (coronaCountries = []) => {
  const sortBy = ACTIVE;
  return countries.map(country => {
    const coronaObj = { ...country };
    const coronaArrKeys = [CASES, TODAY_CASES, DEATHS, TODAY_DEATHS, RECOVERED, ACTIVE, CRITICAL, CASES_PER_ONE_MILLION,
      DEATHS_PER_ONE_MILLION, TESTS, TESTS_PER_ONE_MILLION, CONTINENT, HISTORY, RANK];
    const coronaData = coronaCountries.find(corona => corona.countryInfo._id === country.numericCode);
    coronaArrKeys.forEach(key => coronaObj[key] = coronaData ? coronaData[key] : null);
    return coronaObj;
  })
    .sort((b, a) => a[sortBy] > b[sortBy] ? 1 : (b[sortBy] > a[sortBy] ? -1 : 0))
    .map((item, idx) => ({ ...item, [RANK]: idx }))
}

const _createWorldData = (coronaWorld, worldHistory) => {
  const populationWorld = countriesPopulation.find(pop => pop.officialName === 'World');
  return {
    ...coronaWorld,
    name: 'World',
    gifName: 'earth',
    [POPULATION]: populationWorld.populationInThousands2020 * 1000,
    history: { timeline: worldHistory },
  };
}
