import { findLayer, lat2Zoom } from './deck';

describe('lat2Zoom testing', () => {
  test('Крайнее значение lat = 360', () => {
    expect(lat2Zoom(360)).toBe(0);
  });
  test('Крайнее значение lat = 0', () => {
    expect(lat2Zoom(0)).toBe(25);
  });
  test('Выше крайнего значения lat = 360', () => {
    expect(lat2Zoom(600)).toBe(0);
  });
  test('Ниже крайнего значения lat = 0', () => {
    expect(lat2Zoom(-200)).toBe(25);
  });
});

const layer = { id: 27, type: 'RASTER' };
const layerList = [
  layer,
  { id: 12, type: 'VECTOR' },
  { id: 23, type: 'MODEL' },
];

describe('findLayer testing', () => {
  test('Поиск слоя из тестового массива', () => {
    expect(findLayer(layer, layerList)).toBe(layer);
  });
});
