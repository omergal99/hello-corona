import StorageService from './StorageService';

const WORLD_MAP_STORAGE_KEY = 'WORLD_MAP_STORAGE_KEY';
const COLORS_STORAGE_KEY = 'COLORS_STORAGE_KEY';

async function getData() {
  const initState = _getEmpty();
  const worldMapLocalStorage = StorageService.load(WORLD_MAP_STORAGE_KEY);
  const colorsLocalStorage = StorageService.load(COLORS_STORAGE_KEY);
  if (worldMapLocalStorage) initState.worldMap = worldMapLocalStorage;
  if (colorsLocalStorage) initState.colors = colorsLocalStorage;
  return Promise.resolve(initState);
}

export default {
  getData,
}

const _getEmpty = () => ({
  worldMap: {
    viewBox: '',
    isCirclesShow: true,
    isAutoFocus: true,
  },
  colors: {
    primary: 200,
    secondary: 35,
  }
})