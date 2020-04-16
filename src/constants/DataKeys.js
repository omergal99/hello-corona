

export const CASES = 'cases';
export const TODAY_CASES = 'todayCases';
export const DEATHS = 'deaths';
export const TODAY_DEATHS = 'todayDeaths';
export const RECOVERED = 'recovered';
export const ACTIVE = 'active';
export const CRITICAL = 'critical';
export const CASES_PER_ONE_MILLION = 'casesPerOneMillion';
export const DEATHS_PER_ONE_MILLION = 'deathsPerOneMillion';
export const TOTAL_TESTS = 'totalTests';
export const TESTS_PER_ONE_MILLION = 'testsPerOneMillion';

export const getAllDataKeys = () => ([
  { key: CASES, title: 'Cases', color: 'lightblue', colorHEX: '#add8e6' },
  { key: TODAY_CASES, title: 'Today Cases', dividBy: 'cases', color: 'lightblue', colorHEX: '#add8e6' },
  { key: DEATHS, title: 'Deaths', dividBy: 'cases', color: 'firebrick', colorHEX: '#b22222' },
  { key: TODAY_DEATHS, title: 'Today Deaths', dividBy: 'deaths', color: 'firebrick', colorHEX: '#b22222' },
  { key: RECOVERED, title: 'Recovered', dividBy: 'cases', color: 'mediumseagreen', colorHEX: '#3cb371' },
  { key: ACTIVE, title: 'Active', dividBy: 'cases', color: 'orange', colorHEX: '#ffa500' },
  { key: CRITICAL, title: 'Critical', dividBy: 'cases', color: 'darkorchid', colorHEX: '#9932cc' },
  { key: CASES_PER_ONE_MILLION, title: 'Cases Per 1M' },
  { key: DEATHS_PER_ONE_MILLION, title: 'Deaths Per 1M' },
  { key: TOTAL_TESTS, title: 'Teststed', color: 'dodgerblue', colorHEX: '#1e90ff' },
  { key: TESTS_PER_ONE_MILLION, title: 'Tests Per 1M', color: 'dodgerblue', colorHEX: '#1e90ff' },
])

export const getDataKeysByKeys = keys => {
  return getAllDataKeys().filter(dataKey => keys.some(key => key === dataKey.key));
}

export const getDataKeyByKey = key => {
  return getAllDataKeys().find(dataKey => key === dataKey.key);
}