import LineIcon from '@/components/core/line-icon';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { isNotNilOrEmpty } from '@flybondi/ramda-land';
import { useMemo } from 'react';

CountryFlag.propTypes = {
  /**
   * Two digits ISO 3166 country code.
   * @type {string}
   */
  country: PropTypes.string,

  /**
   * Height of the flag (in px.).
   * @type {number}
   */
  height: PropTypes.number,

  /**
   * Custom CSS classes to apply to the root element.
   * @type {string}
   */
  className: PropTypes.string,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * Provides a human-readable title for the `svg` flag component.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   * @type {string}
   */
  titleAccess: PropTypes.string,

  /**
   * Width of the flag (in px.).
   * @type {number}
   */
  width: PropTypes.number
};

const loadDynamicFlag = country =>
  dynamic(
    () =>
      import(`./flags/${country}`).catch(() =>
        // Show a generic "globe" icon if we failed to load the flag
        // (i.e.: given country code does not match any existing flag component)
        // eslint-disable-next-line react/display-name
        () => <LineIcon icon="globe-americas" size="sm" />
      ),
    {
      // eslint-disable-next-line react/display-name
      loading: () => (
        // Show a placeholder while we import the component
        <span className="w-3 h-1 bg-gray-400 animate-pulse" />
      )
    }
  );

function CountryFlag({ className, country, height, style, titleAccess, width }) {
  const FlagIcon = useMemo(() => {
    if (isNotNilOrEmpty(country)) {
      return loadDynamicFlag(country.toLowerCase());
    }
  }, [country]);

  return (
    <FlagIcon
      width={width}
      height={height}
      className={className}
      style={style}
      titleAccess={titleAccess}
    />
  );
}

export default CountryFlag;
