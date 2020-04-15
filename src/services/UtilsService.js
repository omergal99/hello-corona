export function makeShallowCopy(state) {
  return { ...state };
}

export function makeDeepCopy(state) {
  return JSON.parse(JSON.stringify(state));
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

function numberWithCommas(number) {
  if (!number) return number;
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

function numberToShortString(number) {
  if (!number) return number;
  if (number < 1_000) return `${number}`;
  if (number < 1_000_000) return `${(number / 1_000).toFixed()}K`;
  if (number < 1_000_000_000) return `${(number / 1_000_000).toFixed()}M`;
  if (number < 1_000_000_000_000) return `${(number / 1_000_000_000).toFixed()}B`;
  return number;
}

export default {
  makeShallowCopy,
  makeDeepCopy,
  getImgSrc,
  toTitleCase,
  numberWithCommas,
  numberToShortString
}