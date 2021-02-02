import { compose, identical, type } from 'ramda';

/**
 * Checks whether a given `value` is a `String` or not.
 *
 * @function
 * @param {*} value The value to check
 * @returns {boolean} `true` if `value` is a string; `false`, otherwise.
 */
const isString = compose(identical('String'), type);

export default isString;
