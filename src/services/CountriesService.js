import ApiService from './ApiService';
import JSONcoronaCountries from './data/coronaCountries.json';
import countries from './data/countries.json';
import countriesPopulation from './data/countriesPopulation.json';
import * as DataKeys from '../constants/DataKeys';

import ServiceConfig from '../config/ServiceConfig';

async function getData() {
  const initState = _getEmpty();
  let coronaCountries = JSONcoronaCountries;
  if (ServiceConfig.isServerCountriesConnected) {
    const getCoronaCountries = ApiService.getCoronaCountries();
    const serverCoronaCountries = await getCoronaCountries;
    if (serverCoronaCountries) coronaCountries = serverCoronaCountries;
    else alert('There is problem with data access.\nDisplays latest system data.');
  }
  initState.countries = _mergeCoronaData(coronaCountries);
  initState.worldData = _createWorldData(coronaCountries);
  return Promise.resolve(initState);
}

export default {
  getData,
}

const _getEmpty = () => ({
  countries: [],
  selectedCountryIndex: null,
  worldData: null
})

const _mergeCoronaData = coronaCountries => {
  const sortBy = DataKeys.CASES;
  return countries.map(country => {
    const coronaData = coronaCountries.find(corona => corona.country === country.name
      || (corona.country === 'UK' && country.name === 'United Kingdom')
      || (corona.country === 'S. Korea' && country.name === 'South Korea')
      || (corona.country === 'Palestine' && country.name === 'Palestinian Territories')
      || (corona.country === 'DRC' && country.name === 'DR Congo')
      || (corona.country === 'USA' && country.name === 'United States'));
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
      [DataKeys.TOTAL_TESTS]: coronaData ? coronaData.totalTests : null,
      [DataKeys.TESTS_PER_ONE_MILLION]: coronaData ? coronaData.testsPerOneMillion : null,
    }
  }).sort((b, a) => (a[sortBy] > b[sortBy]) ? 1 : ((b[sortBy] > a[sortBy]) ? -1 : 0))
}

const _createWorldData = coronaCountries => {
  const coronaWorld = coronaCountries.find(corona => corona.country === 'World');
  const populationWorld = countriesPopulation.find(pop => pop.officialName === 'World');
  return {
    ...coronaWorld,
    name: 'World',
    gifName: 'earth',
    [DataKeys.POPULATION]: populationWorld.populationInThousands2020 * 1000,
  };
}
