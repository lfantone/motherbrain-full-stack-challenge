'use strict';
const { always, applySpec, propOr } = require('ramda');

/**
 * Creates a function that will generate the spec for a Search request.
 *
 * @param {string} index An string to use as index value.
 * @returns {(obj: { limit: number | string, offset: number | string}) => import('@elastic/elasticsearch').RequestParams.Search} A function that will generate the Search parameters.
 */
function createSearchParamsFor(index) {
  return applySpec({
    index: always(index),
    body: {
      size: propOr(10, 'limit'),
      from: propOr(0, 'offset')
    }
  });
}

module.exports = createSearchParamsFor;
