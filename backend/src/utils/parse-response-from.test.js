'use strict';
const parseResponseFrom = require('./parse-response-from');

describe('the parse-response-from function', () => {
  test('should create the parameters with the default values', () => {
    expect(parseResponseFrom({})).toEqual({
      hits: [],
      total: 0
    });
  });

  test('should create the parameters with the given values', () => {
    expect(
      parseResponseFrom({
        body: { hits: { hits: [{ _source: { foo: 'bar' } }], total: { value: 1 } } }
      })
    ).toEqual({
      hits: [{ foo: 'bar' }],
      total: 1
    });
  });
});
