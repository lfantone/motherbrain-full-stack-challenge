'use strict';
const createSearchParamsFor = require('./create-search-params-for');

describe('the create-search-params-for function', () => {
  test('should return a function', () => {
    expect(createSearchParamsFor()).toBeInstanceOf(Function);
  });

  test('should create the parameters with the default values', () => {
    expect(createSearchParamsFor('foo')({})).toEqual({
      index: 'foo',
      body: {
        size: 10,
        from: 0
      }
    });
  });

  test('should create the parameters with the given values', () => {
    expect(createSearchParamsFor('foo')({ limit: 5, offset: 2 })).toEqual({
      index: 'foo',
      body: {
        size: 5,
        from: 2
      }
    });
  });
});
