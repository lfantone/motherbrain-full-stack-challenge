import PropTypes from 'prop-types';

/**
 * A representation of a date as either an ISO string, number of milliseconds since the epoch
 * or a `Date` object.
 * @type {PropTypes.Requireable<string> | PropTypes.Requireable<number> | PropTypes.Requireable<Date>}
 */
export const date = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.instanceOf(Date)
]);

/**
 * A React `ref` attribute. Can be either a function or an object with a `current` property.
 * @type {PropTypes.Requireable<Function> | PropTypes.Requireable<Object>}
 */
export const ref = PropTypes.oneOfType([PropTypes.func, PropTypes.object]);

/**
 * The geo/city location descriptor containing `city` and `country` properties (`countryCode` is optional).
 * @type {PropTypes.Requireable<{
  city: PropTypes.Validator<string>;
  country: PropTypes.Validator<string>;
  countryCode: PropTypes.Requireable<string>;
}>}
*/
export const location = PropTypes.exact({
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired
});
