'use strict';

const { both, compose, is, trim, when } = require('ramda');
const { isNotNilOrEmpty } = require('@flybondi/ramda-land');

/**
 * Trims whitespace and transforms the given string to number
 * unless it's `null`, `undefined` or empty, in which case the value is
 * returned as-is.
 *
 * @function
 * @param {string?} value The value to trim and transform.
 * @returns {number?} Either the trimmed, parsed `value` or `null`/`undefined`.
 */
const safeParseInt = when(
  both(isNotNilOrEmpty, is(String)),
  compose(value => parseInt(value, 10), trim)
);

module.exports = safeParseInt;
