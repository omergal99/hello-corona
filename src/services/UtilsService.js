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
  return string.replace('-',' ').replace(/\b\w/g, letter => letter.toUpperCase());
}

export default {
  makeShallowCopy,
  makeDeepCopy,
  getImgSrc,
  toTitleCase
}