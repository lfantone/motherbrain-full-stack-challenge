'use strict';
const { applySpec, compose, pathOr, pluck } = require('ramda');

/**
 * Transform a Search Response into JSON object.
 *
 * @param {{ body: { hits: { hits: Array<{ _source: any }>,total: { value: number }}}}} obj An object to parse.
 * @returns {{ hits: Array<any>, total: number }} The parsed object.
 */
function parseResponseFrom(obj) {
  return applySpec({
    hits: compose(pluck('_source'), pathOr([], ['body', 'hits', 'hits'])),
    total: pathOr(0, ['body', 'hits', 'total', 'value'])
  })(obj);
}

module.exports = parseResponseFrom;
