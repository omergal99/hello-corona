function store(key, value) {
  const str = JSON.stringify(value);
  localStorage.setItem(key, str);
}

function load(key) {
  const str = localStorage.getItem(key)
  return JSON.parse(str);
}

export default {
  store,
  load
}