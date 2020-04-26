

const CORONA_API = process.env.REACT_APP_CORONA_API_URL;

export const GET_CORONA_COUNTRIES = `${CORONA_API}/countries`;
export const GET_WORLD_DATA = `${CORONA_API}/all`;
export const GET_CORONA_HISTORY = `${CORONA_API}/historical`;
export const GET_WORLD_DATA_HISTORY = `${CORONA_API}/historical/all`;