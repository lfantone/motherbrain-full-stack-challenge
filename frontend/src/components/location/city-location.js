import * as Props from '@/prop-types';

import { compose, ifElse, prop, propSatisfies, toUpper } from 'ramda';

import CountryFlag from './country-flag';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import iso from 'iso-3166-1';

CityLocation.propTypes = {
  /**
   * Custom element type for this component (defaults to `div`).
   * @type {React.ElementType}
   */
  as: PropTypes.elementType,

  /**
   * Custom CSS classes to apply to the feature content element.
   * @type {String}
   */
  className: PropTypes.string,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * The organization location as determined by its `city` and `country`
   * @type {Object}
   */
  location: Props.location.isRequired,

  /**
   * Whether to show the country's flag next to to the location
   * or not (defaults to `false`; i.e.: the flag is shown).
   * @type {boolean}
   */
  disableFlagIcon: PropTypes.bool,

  /**
   * Whether to show the full English country name or default to
   * the given `country` code (defaults to `false`; i.e.: show full country name)
   * @type {boolean}
   */
  disableCountryName: PropTypes.bool
};

CityLocation.defaultProps = {
  disableCountryName: false,
  disableFlagIcon: false,
  as: 'div'
};

/**
 * Length threshold above which country codes will be shown
 * instead of full names.
 *
 * @constant
 * @type {number}
 */
const MAX_COUNTRY_NAME_LENGTH = 15;

/**
 * Returns an EN country name by its ISO 3166 code.
 * @function
 *
 * @param {string} code ISO 3166, two digits, country code.
 * @returns {string} The full English country name.
 */
const countryName = compose(
  ifElse(
    // If country name is too long, fallback to ISO, three-digit code
    propSatisfies(country => country.length < MAX_COUNTRY_NAME_LENGTH, 'country'),
    prop('country'),
    prop('alpha3')
  ),
  iso.whereAlpha3
);

function CityLocation({
  as: Component,
  className,
  disableCountryName,
  disableFlagIcon,
  location,
  style
}) {
  const country = disableCountryName ? toUpper(location.country) : countryName(location.country);

  return (
    <Component
      className={clsx(
        { 'flex flex-row items-center space-x-1': disableFlagIcon !== true },
        className
      )}
      style={style}
    >
      {disableFlagIcon !== true && (
        <CountryFlag country={location.country} titleAccess={country} width={18} height={12} />
      )}
      <span className="capitalize">{location.city}</span>, <span>{country}</span>
    </Component>
  );
}

export default CityLocation;
