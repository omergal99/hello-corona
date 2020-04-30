import ApiService from './ApiService';
import JSONcoronaCountries from './data/coronaCountries.json';
import JSONcoronaWorld from './data/coronaWorld.json';
import JSONcoronaWorldHistory from './data/coronaWorldHistory.json';
import JSONcoronaCountriesHistory from './data/coronaCountriesHistory.json';
import countries from './data/countries.json';
import countriesPopulation from './data/countriesPopulation.json';
import * as DataKeys from '../constants/DataKeys';

import ServiceConfig from '../config/ServiceConfig';

async function getData() {
  const initState = _getEmpty();
  let coronaCountries = JSONcoronaCountries;
  let coronaWorld = JSONcoronaWorld;
  let coronaWorldHistory = JSONcoronaWorldHistory;
  if (ServiceConfig.isServerCountriesConnected) {
    const getCoronaCountries = ApiService.getCoronaCountries();
    const getCoronaWorld = ApiService.getCoronaWorld();
    const getWorldHistory = ApiService.getWorldHistory();
    const serverCoronaCountries = await getCoronaCountries;
    const serverCoronaWorld = await getCoronaWorld;
    const serverCoronaWorldHistory = await getWorldHistory;
    if (serverCoronaCountries) coronaCountries = serverCoronaCountries;
    if (serverCoronaWorld) coronaWorld = serverCoronaWorld;
    if (serverCoronaWorldHistory) coronaWorldHistory = serverCoronaWorldHistory;
    if (!serverCoronaCountries || !serverCoronaCountries || !serverCoronaCountries) {
      alert('There is problem with data access.\nDisplays latest system data.');
    }
  }
  initState.countries = _mergeCoronaData(coronaCountries);
  initState.worldData = _createWorldData(coronaWorld, coronaWorldHistory);
  return Promise.resolve(initState);
}
async function getCountryHistory(country) {
  let serverCountryHistory = JSONcoronaCountriesHistory.find(his => his.country === country.name);
  if (ServiceConfig.isServerCountriesConnected) {
    const getCountryHistory = ApiService.getCountryHistory(country.numericCode);
    serverCountryHistory = await getCountryHistory;
  }
  return serverCountryHistory;
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

const _mergeCoronaData = coronaCountries => {
  const sortBy = DataKeys.CASES;
  return countries.map(country => {
    const coronaData = coronaCountries.find(corona => corona.countryInfo._id === country.numericCode);
    return {
      ...country,
      [DataKeys.CASES]: coronaData ? coronaData.cases : null,
      [DataKeys.TODAY_CASES]: coronaData ? coronaData.todayCases : null,
      [DataKeys.DEATHS]: coronaData ? coronaData.deaths : null,
      [DataKeys.TODAY_DEATHS]: coronaData ? coronaData.todayDeaths : null,
      [DataKeys.RECOVERED]: coronaData ? coronaData.recovered : null,
      [DataKeys.ACTIVE]: coronaData ? coronaData.active : null,
      [DataKeys.CRITICAL]: coronaData ? coronaData.critical : null,
      [DataKeys.CASES_PER_ONE_MILLION]: coronaData ? coronaData.casesPerOneMillion : null,
      [DataKeys.DEATHS_PER_ONE_MILLION]: coronaData ? coronaData.deathsPerOneMillion : null,
      [DataKeys.TESTS]: coronaData ? coronaData.tests : null,
      [DataKeys.TESTS_PER_ONE_MILLION]: coronaData ? coronaData.testsPerOneMillion : null,
      [DataKeys.CONTINENT]: coronaData ? coronaData.continent : null,
    }
  }).sort((b, a) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0))
}

const _createWorldData = (coronaWorld, worldHistory) => {
  const populationWorld = countriesPopulation.find(pop => pop.officialName === 'World');
  return {
    ...coronaWorld,
    name: 'World',
    gifName: 'earth',
    [DataKeys.POPULATION]: populationWorld.populationInThousands2020 * 1000,
    history: { timeline: worldHistory }
  };
}
