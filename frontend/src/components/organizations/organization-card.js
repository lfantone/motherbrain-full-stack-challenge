import Card, { CardContent, CardHeader, CardMedia } from '@/components/core/card';
import { isNotNil, lowerEquals } from '@flybondi/ramda-land';

import CityLocation from '@/components/location/city-location';
import LazyImage from '@/components/core/avatar/lazy-image';
import LineIcon from '@/components/core/line-icon';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { isNil } from 'ramda';

OrganizationCard.propTypes = {
  /**
   * Custom CSS classes to apply to the card element.
   * @type {string}
   */
  className: PropTypes.string,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * Organization name.
   * @type {string}
   */
  name: PropTypes.string.isRequired,

  /**
   * The geo location descriptor.
   * @type {string>}
   */
  country: PropTypes.string,

  /**
   * The city location descriptor.
   * @type {string}
   */
  city: PropTypes.string,

  /**
   * Company short description.
   * @type {string}
   */
  shortDescription: PropTypes.string,

  /**
   * Either `'sm'` (mobile) or `'auto'` (responsive).
   * @type {string}
   */
  size: PropTypes.oneOf(['sm', 'auto']),

  /**
   * Callback fired when the card is clicked or touched.
   * @type {Function}
   */
  onClick: PropTypes.func,

  /**
   * Optional `CardActions` to display.
   * @type {import('react').ReactNode}
   */
  actions: PropTypes.node
};

OrganizationCard.defaultProps = {
  size: 'auto'
};

/**
 * @function
 */
const isAuto = lowerEquals('auto');

/**
 * @function
 */
const isSmall = lowerEquals('sm');

function OrganizationCard({
  actions,
  city,
  className,
  country,
  name,
  onClick,
  shortDescription,
  size,
  style
}) {
  const autoSize = isAuto(size);

  return (
    <Card
      tabIndex={0}
      onClick={isNil(actions) ? onClick : undefined}
      selectable={isNotNil(actions)}
      className={className}
      style={style}
    >
      <div className="flex flex-row items-center">
        <CardMedia className={clsx('mr-3', { 'lg:mr-4': autoSize })}>
          <LazyImage
            alt={name}
            src={`https://picsum.photos/seed/${name}/75/75`}
            width={75}
            height={75}
          />
        </CardMedia>
        <CardContent
          onClick={isNil(actions) ? undefined : onClick}
          className={clsx('relative flex flex-col justify-around p-4', {
            'lg:items-center lg:flex-row lg:justify-start lg:static': autoSize
          })}
        >
          {name && (
            <CardHeader
              className={clsx('mb-2', { 'lg:mr-2 lg:flex-grow lg:mb-0': autoSize })}
              heading={name}
              subheading={shortDescription}
            />
          )}
          <div
            className={clsx('flex flex-row items-center justify-start w-full', {
              'lg:w-auto lg:flex-col lg:items-end': autoSize
            })}
          >
            {city && country && (
              <div
                className={clsx('flex flex-row items-center mr-4 whitespace-no-wrap space-x-1', {
                  'lg:mr-0': autoSize
                })}
              >
                <LineIcon icon="map-marker" className="text-primary-100" />
                <CityLocation
                  disableFlagIcon
                  disableCountryName={isSmall(size)}
                  className={clsx('text-xs', { 'lg:text-sm': autoSize })}
                  location={{ city, country }}
                />
              </div>
            )}
          </div>
        </CardContent>
      </div>
      {actions}
    </Card>
  );
}

OrganizationCardSkeleton.propTypes = {
  /**
   * Custom element type for this component (defaults to `div`).
   * @type {React.ElementType}
   */
  as: PropTypes.elementType,
  /**
   * Custom CSS classes to apply to the skeleton element.
   * @type {string}
   */
  className: PropTypes.string,
  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object
};

OrganizationCardSkeleton.defaultProps = {
  as: 'div'
};

export function OrganizationCardSkeleton({ as: Component, className, style }) {
  return (
    <Component
      className={clsx(className, 'p-4 mx-auto rounded-md shadow card card-elevation-md')}
      style={style}
    >
      <div className="flex items-center space-x-4 animate-pulse">
        <div className="w-16 h-16 bg-gray-400 rounded-full lg:w-20 lg:h-20"></div>
        <div className="flex flex-col flex-1 lg:flex-row">
          <div className="flex-1 space-y-1 lg:space-y-2">
            <div className="w-full h-4 bg-gray-400 rounded lg:w-2/3"></div>
            <div className="w-1/2 h-4 bg-gray-400 rounded lg:w-1/4"></div>
          </div>
          <div className="flex mt-3 space-x-4 lg:mt-0 lg:flex-col lg:space-y-2">
            <div className="h-4 px-10 mr-4 bg-gray-400 rounded lg:mr-0"></div>
            <div className="h-4 px-8 mr-4 bg-gray-400 rounded lg:mr-0 lg:px-10"></div>
          </div>
        </div>
      </div>
    </Component>
  );
}

export default OrganizationCard;
