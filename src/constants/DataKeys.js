import React from 'react';
import BiohazardSVG from '../cmps/helpers/svg-icons/BiohazardSVG';
import TestTubeSVG from '../cmps/helpers/svg-icons/TestTubeSVG';
import HeartbeatSVG from '../cmps/helpers/svg-icons/HeartbeatSVG';
import HeartBrokenSVG from '../cmps/helpers/svg-icons/HeartBrokenSVG';
import SickBedSVG from '../cmps/helpers/svg-icons/SickBedSVG';
import VirusSVG from '../cmps/helpers/svg-icons/VirusSVG';

export const POPULATION = 'population2020';

export const CASES = 'cases';
export const TODAY_CASES = 'todayCases';
export const DEATHS = 'deaths';
export const TODAY_DEATHS = 'todayDeaths';
export const RECOVERED = 'recovered';
export const ACTIVE = 'active';
export const CRITICAL = 'critical';
export const TESTS = 'tests';
export const TESTS_PER_ONE_MILLION = 'testsPerOneMillion';
export const CASES_PER_ONE_MILLION = 'casesPerOneMillion';
export const DEATHS_PER_ONE_MILLION = 'deathsPerOneMillion';

export const getAllDataKeys = () => ([
  { key: POPULATION, title: 'Population', color: 'dodgerblue', colorHEX: '#1e90ff' },
  ...getCoronaDataKeys()
])

export const getCoronaDataKeys = () => ([
  { key: CASES, title: 'Cases', color: 'lightblue', colorHEX: '#add8e6', svgIcon: <BiohazardSVG /> },
  { key: TODAY_CASES, title: 'Today Cases', dividBy: CASES, color: 'lightblue', colorHEX: '#add8e6', svgIcon: <BiohazardSVG /> },
  { key: DEATHS, title: 'Deaths', dividBy: CASES, color: 'firebrick', colorHEX: '#b22222', svgIcon: <HeartBrokenSVG /> },
  { key: TODAY_DEATHS, title: 'Today Deaths', dividBy: 'deaths', color: 'firebrick', colorHEX: '#b22222', svgIcon: <HeartBrokenSVG /> },
  { key: RECOVERED, title: 'Recovered', dividBy: CASES, color: 'mediumseagreen', colorHEX: '#3cb371', svgIcon: <HeartbeatSVG /> },
  { key: ACTIVE, title: 'Active', dividBy: CASES, color: 'orange', colorHEX: '#ffa500', svgIcon: <VirusSVG /> },
  { key: CRITICAL, title: 'Critical', dividBy: CASES, color: 'darkorchid', colorHEX: '#9932cc', svgIcon: <SickBedSVG /> },
  { key: TESTS, title: 'Tests', color: 'dodgerblue', colorHEX: '#1e90ff', svgIcon: <TestTubeSVG /> },
  { key: TESTS_PER_ONE_MILLION, title: 'Tests Per 1M', color: 'dodgerblue', colorHEX: '#1e90ff', svgIcon: <TestTubeSVG /> },
  { key: CASES_PER_ONE_MILLION, title: 'Cases Per 1M', color: 'lightblue', colorHEX: '#add8e6', svgIcon: <BiohazardSVG /> },
  { key: DEATHS_PER_ONE_MILLION, title: 'Deaths Per 1M', color: 'firebrick', colorHEX: '#b22222', svgIcon: <HeartBrokenSVG /> },
])

export const getDataKeysByKeys = keys => {
  return getAllDataKeys().filter(dataKey => keys.some(key => key === dataKey.key));
}

export const getDataKeyByKey = key => {
  return getAllDataKeys().find(dataKey => key === dataKey.key);
}