import ApiService from './ApiService';
import JSONcoronaCountries from './data/coronaCountries.json';
import countries from './data/countries.json';

import ServiceConfig from '../config/ServiceConfig';

async function getData() {
  const initState = _getEmpty();
  if (ServiceConfig.isServerCountriesConnected) {
    const getCoronaCountries = ApiService.getCoronaCountries();
    const getGlobalData = ApiService.getGlobalData();
    const serverCoronaCountries = await getCoronaCountries;
    const serverGlobalData = await getGlobalData;

    initState.countries = _mergeCoronaData(serverCoronaCountries);
    initState.globalData = serverGlobalData;
  } else {
    initState.countries = _mergeCoronaData(JSONcoronaCountries);
    initState.globalData = { "cases": 1510088, "deaths": 88335, "recovered": 329684 };
  }
  return Promise.resolve(initState);
}

export default {
  getData,
}

const _getEmpty = () => ({
  countries: [],
  selectedCountryIndex: null,
  globalData: null
})

const _mergeCoronaData = coronaCountries => {
  return countries.map(country => {
    const coronaData = coronaCountries.find(corona => corona.country === country.name
      || (corona.country === 'UK' && country.name === 'United Kingdom')
      || (corona.country === 'S. Korea' && country.name === 'South Korea')
      || (corona.country === 'Palestine' && country.name === 'Palestinian Territories')
      || (corona.country === 'DRC' && country.name === 'DR Congo')
      || (corona.country === 'USA' && country.name === 'United States'));
    return {
      ...country,
      cases: coronaData ? coronaData.cases : null,
      todayCases: coronaData ? coronaData.todayCases : null,
      deaths: coronaData ? coronaData.deaths : null,
      todayDeaths: coronaData ? coronaData.todayDeaths : null,
      recovered: coronaData ? coronaData.recovered : null,
      active: coronaData ? coronaData.active : null,
      critical: coronaData ? coronaData.critical : null,
      casesPerOneMillion: coronaData ? coronaData.casesPerOneMillion : null,
      deathsPerOneMillion: coronaData ? coronaData.deathsPerOneMillion : null,
      totalTests: coronaData ? coronaData.totalTests : null,
      testsPerOneMillion: coronaData ? coronaData.testsPerOneMillion : null,
    }
  }).sort((b, a) => (a.cases > b.cases) ? 1 : ((b.cases > a.cases) ? -1 : 0))
}