'use strict';
const safeParseNumber = require('./safe-parse-number');

describe('the safe-parse-number function', () => {
  test('should parse an string into a number', () => {
    expect(safeParseNumber('10')).toEqual(10);
  });
  test('should remove the whitespaces from given string before doing the parse', () => {
    expect(safeParseNumber('10   ')).toEqual(10);
  });
  test('should return given arguement as it is if is null or undefined', () => {
    expect(safeParseNumber(null)).toBe(null);
    expect(safeParseNumber(undefined)).toBe(undefined);
  });
  test('should return given arguement as it is if is already a number', () => {
    expect(safeParseNumber(1)).toBe(1);
  });
});
