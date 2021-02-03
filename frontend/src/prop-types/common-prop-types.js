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
 * @type {PropTypes.Requireable<{ city: PropTypes.Validator<string>; country: PropTypes.Validator<string>; }>}
 */
export const location = PropTypes.exact({
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired
});

/**
 * The position descriptor containing `right`, `left`, `top` and `bottom` properties.
 * @type {PropTypes.Requireable<{ rigth: PropTypes.Validator<number>; left: PropTypes.Validator<number>; top: PropTypes.Validator<number>; bottom: PropTypes.Validator<number>; }>}
 */
export const position = PropTypes.exact({
  right: PropTypes.number,
  left: PropTypes.number,
  top: PropTypes.number,
  bottom: PropTypes.number
});

/**
 * The chart axis descriptor properties.
 * @type {PropTypes.Requireable<{ key: PropTypes.Validator<string>; padding: PropTypes.Validator<position>; label: PropTypes.Validator<Object> }>}
 */
export const axis = PropTypes.exact({
  key: PropTypes.string.isRequired,
  domain: PropTypes.arrayOf([PropTypes.oneOf([PropTypes.number, 'dataMax', 'dataMin'])]),
  padding: position,
  label: PropTypes.exact({
    angle: PropTypes.number,
    value: PropTypes.string.isRequired,
    position: PropTypes.oneOf([
      'top',
      'left',
      'right',
      'bottom',
      'inside',
      'outside',
      'insideLeft',
      'insideRight',
      'insideTop',
      'insideBottom',
      'insideTopLeft',
      'insideBottomLeft',
      'insideTopRight',
      'insideBottomRight',
      'insideStart',
      'insideEnd',
      'end',
      'center',
      'centerTop',
      'centerBottom',
      PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number
      })
    ]),
    offset: PropTypes.number
  })
});
