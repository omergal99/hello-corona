







function makeShallowCopy(state) {
  return { ...state };
}

function makeDeepCopy(state) {
  return JSON.parse(JSON.stringify(state));
}

export default {
  makeShallowCopy,
  makeDeepCopy
}