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

  test('should remove the query property when match and/or term is not present', () => {
    expect(createSearchParamsFor('foo')({ limit: 5, offset: 2, query: {} })).toEqual({
      index: 'foo',
      body: {
        size: 5,
        from: 2
      }
    });
  });
});
