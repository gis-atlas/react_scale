import { declOfNum, findMatch, formatFileSize } from '.';

describe('formatFileSize testing', () => {
  test('file size = 1551859712 bytes', () => {
    expect(formatFileSize(1551859712)).toBe('1.45 GB');
  });
  test('file size = 1.445281982421875 bytes', () => {
    expect(formatFileSize(1.445281982421875)).toBe('1.45 B');
  });
  test('file size = -10000000000000000000000000000 bytes', () => {
    expect(formatFileSize(-10000000000000000000000000000)).toBe('0 B');
  });
});

const textVariables = ['слой', 'слоя', 'слоёв'];

describe('declOfNum testing', () => {
  test('Отображение слова "слой" при n < 0', () => {
    expect(declOfNum(-10, textVariables)).toBe('слоёв');
  });
  test('Отображение слова "слой" при n = 1', () => {
    expect(declOfNum(1, textVariables)).toBe('слой');
  });
  test('Отображение слова "слой" при n = 2', () => {
    expect(declOfNum(2, textVariables)).toBe('слоя');
  });
  test('Отображение слова "слой" при n = 5', () => {
    expect(declOfNum(5, textVariables)).toBe('слоёв');
  });
  test('Отображение слова "слой" при n = 10', () => {
    expect(declOfNum(10, textVariables)).toBe('слоёв');
  });
  test('Отображение слова "слой" при n > 10', () => {
    expect(declOfNum(100, textVariables)).toBe('слоёв');
  });
});

const array = [
  { id: 1, name: 'Проектик', notificationChanel: 'string' },
  { id: 2, name: 'Ачом', notificationChanel: 'string' },
  { id: 3, name: 'Проject', notificationChanel: 'string' },
  { id: 4, name: 'Атом', notificationChanel: 'string' },
  { id: 5, name: 'Проеыы', notificationChanel: 'string' },
  { id: 6, name: 'Проект', notificationChanel: 'string' },
  { id: 7, name: 'Казань', notificationChanel: 'string' },
];

describe('findMatch testing', () => {
  test('Поиск элементов, в названии которых есть "Прое"', () => {
    expect(findMatch(array, 'Прое')).toEqual([
      { id: 1, name: 'Проектик', notificationChanel: 'string' },
      { id: 5, name: 'Проеыы', notificationChanel: 'string' },
      { id: 6, name: 'Проект', notificationChanel: 'string' },
    ]);
  });
  test('Поиск элементов, в названии которых есть "А"', () => {
    expect(findMatch(array, 'А')).toEqual([
      { id: 2, name: 'Ачом', notificationChanel: 'string' },
      { id: 4, name: 'Атом', notificationChanel: 'string' },
      { id: 7, name: 'Казань', notificationChanel: 'string' },
    ]);
  });
  test('Поиск элементов, в названии которых есть "6"', () => {
    expect(findMatch(array, '6')).toEqual([]);
  });
});
