const initialState = {
  name: 'omer'
}

function getData() {
  return Promise.resolve(initialState)
}

export default {
  getData,
}
