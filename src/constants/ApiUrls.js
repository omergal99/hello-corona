

const CORONA_API = process.env.REACT_APP_CORONA_API_URL;

export const GET_CORONA_COUNTRIES = `${CORONA_API}/countries`;
export const GET_WORLD_DATA = `${CORONA_API}/all`;
export const GET_WORLD_HISTORY = `${CORONA_API}/historical/all`;
export const GET_COUNTRY_HISTORY = `${CORONA_API}/historical/`;