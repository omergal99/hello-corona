export function makeShallowCopy(state) {
  return { ...state };
}

export function makeDeepCopy(state) {
  return JSON.parse(JSON.stringify(state));
}

export function getSrc(entityImg) {
  return require(`../assets/gifs/${entityImg}`);
}

export function getImgSrc(entityImg) {
  let src = '';
  try {
    src = require(`../assets/img/${entityImg}`);
  }
  catch (err) { }
  return src
}

export function toTitleCase(string) {
  return string.replace('-', ' ').replace(/\b\w/g, letter => letter.toUpperCase());
}

export function numberWithCommas(number) {
  if (!number) return number;
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export function numberToShortString(number) {
  if (!number) return number;
  if (number < 1_000) return `${number}`;
  if (number < 1_000_000) return _RoundNumWith05(number, 1_000, 'K', 10);
  if (number < 1_000_000_000) return _RoundNumWith05(number, 1_000_000, 'M', 10);
  if (number < 1_000_000_000_000) return _RoundNumWith05(number, 1_000_000_000, 'B', 10);
  return number;
}

export const sleep = ms => new Promise(res => setTimeout(res, ms));

export const getTimestempSubHours = hours => Date.now() - hours * 3_600_000;

export default {
  makeShallowCopy,
  makeDeepCopy,
  getSrc,
  getImgSrc,
  toTitleCase,
  numberWithCommas,
  numberToShortString,
  sleep
}

function _RoundNumWith05 (num, divid, letter, smallerThan) {
  return (num / divid) < smallerThan
    ? `${Math.round((num / divid) * 2) / 2}${letter}`
    : `${(num / divid).toFixed()}${letter}`;
}