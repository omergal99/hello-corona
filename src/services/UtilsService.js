function makeShallowCopy(state) {
  return { ...state };
}

function makeDeepCopy(state) {
  return JSON.parse(JSON.stringify(state));
}


function getImgSrc(entityImg) {
  let src = '';
  try {
    src = require(`../assets/img/${entityImg}`);
  }
  catch (err) { }
  return src
}

export default {
  makeShallowCopy,
  makeDeepCopy,
  getImgSrc
}