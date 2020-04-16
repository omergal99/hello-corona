import StorageService from './StorageService';
import { INIT_COLORS, PRIMARY_COLOR, SECONDARY_COLOR } from '../constants/CssVariable';
import { WORLD_MAP_STORAGE_KEY, COLORS_STORAGE_KEY } from '../constants/LocalStorageKeys';

async function getData() {
  _setCssVariableColors();
  const initState = _getEmpty();
  const worldMapLocalStorage = StorageService.load(WORLD_MAP_STORAGE_KEY);
  if (worldMapLocalStorage) initState.worldMap = worldMapLocalStorage;
  return Promise.resolve(initState);
}

function updateWorldMapLocalStorage({ worldMap }) {
  StorageService.store(WORLD_MAP_STORAGE_KEY, worldMap);
}

function updateColorsLocalStorage() {
  const primary = Number(getComputedStyle(document.documentElement).getPropertyValue(PRIMARY_COLOR));
  const secondary = Number(getComputedStyle(document.documentElement).getPropertyValue(SECONDARY_COLOR));
  StorageService.store(COLORS_STORAGE_KEY, { primary, secondary });
}

function resetColorsLocalStorage() {
  const initColors = INIT_COLORS;
  StorageService.store(COLORS_STORAGE_KEY, initColors);
  _setCssVariableColors(initColors);
}

export default {
  getData,
  updateWorldMapLocalStorage,
  updateColorsLocalStorage,
  resetColorsLocalStorage,
}

const _getEmpty = () => ({
  worldMap: {
    viewBox: '',
    isCirclesShow: true,
    circlesDataKey: undefined,
    isAutoFocus: true,
  }
})

const _setCssVariableColors = colors => {
  const colorsLocalStorage = colors || StorageService.load(COLORS_STORAGE_KEY);
  if (!colorsLocalStorage) return;
  document.documentElement.style.setProperty(PRIMARY_COLOR, colorsLocalStorage.primary);
  document.documentElement.style.setProperty(SECONDARY_COLOR, colorsLocalStorage.secondary);
}