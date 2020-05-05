import StorageService from './StorageService';
import { INIT_COLORS, PRIMARY_COLOR, SECONDARY_COLOR, BRIGHTNESS } from '../constants/CssVariable';
import { WORLD_MAP, COLORS } from '../constants/LocalStorageKeys';

async function getData() {
  _setCssVariableColors();
  const initState = _getEmpty();
  const worldMapLocalStorage = StorageService.load(WORLD_MAP);
  if (worldMapLocalStorage) initState.worldMap = worldMapLocalStorage;
  return Promise.resolve(initState);
}

function updateWorldMapLocalStorage({ worldMap }) {
  StorageService.store(WORLD_MAP, worldMap);
}

function updateColorsToLocalStorage() {
  const primary = Number(getComputedStyle(document.documentElement).getPropertyValue(PRIMARY_COLOR));
  const secondary = Number(getComputedStyle(document.documentElement).getPropertyValue(SECONDARY_COLOR));
  const brightness = Number(getComputedStyle(document.documentElement).getPropertyValue(BRIGHTNESS));
  StorageService.store(COLORS, { primary, secondary, brightness });
}

function resetColorsLocalStorage() {
  const initColors = INIT_COLORS;
  StorageService.store(COLORS, initColors);
  _setCssVariableColors(initColors);
}

export default {
  getData,
  updateWorldMapLocalStorage,
  updateColorsToLocalStorage,
  resetColorsLocalStorage,
}

const _getEmpty = () => ({
  worldMap: {
    viewBox: '',
    isTooltipShow: true,
    isCirclesShow: true,
    circlesDataKey: undefined,
    isAutoFocus: true,
  }
})

const _setCssVariableColors = colors => {
  const colorsLclStrg = colors || StorageService.load(COLORS);
  if (!colorsLclStrg) return;
  colorsLclStrg.primary && document.documentElement.style.setProperty(PRIMARY_COLOR, colorsLclStrg.primary);
  colorsLclStrg.secondary && document.documentElement.style.setProperty(SECONDARY_COLOR, colorsLclStrg.secondary);
  colorsLclStrg.brightness && document.documentElement.style.setProperty(BRIGHTNESS, colorsLclStrg.brightness);
}