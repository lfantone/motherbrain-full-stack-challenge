import { T, always, either } from 'ramda';

import CityLocation from '@/components/location/city-location';
import LineIcon from '@/components/core/line-icon';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lowerEquals } from '@flybondi/ramda-land';

OrganizationSummary.propTypes = {
  /**
   * Custom element type for this component (defaults to `section`).
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
   * Organization title.
   * @type {string}
   */
  title: PropTypes.string.isRequired,

  /**
   * The organization name.
   * @type {Object}
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
   * The organization website url
   * @type {string}
   */
  url: PropTypes.string,

  /**
   * The amount of employees the organization has.
   * @type {string}
   */
  employeeCount: PropTypes.string
};

OrganizationSummary.defaultProps = {
  as: 'section'
};

/**
 * @function
 */
export const whichTargetType = either([
  [lowerEquals('SEED'), always('seed')],
  [T, always('Unknown')]
]);

function OrganizationSummary({
  as: Component,
  city,
  className,
  country,
  employeeCount,
  name,
  style,
  title,
  url
}) {
  return (
    <Component className={clsx(className, 'my-4')} style={style}>
      <h2 className="-my-2 text-3xl font-bold leading-tight">{title}</h2>
      <div className="flex flex-row items-center my-2 space-x-1 lg:mt-1">
        <div className="w-3">
          <img src={`https://picsum.photos/seed/${name}/200/200`} alt={name} />
        </div>
        {url && (
          <a className="text-sm font-bold text-gray-500" href={url}>
            {name}
          </a>
        )}
      </div>
      {city && country && <CityLocation className="mb-1 text-sm" location={{ city, country }} />}
      <div className="flex flex-row items-center space-x-3">
        {employeeCount && (
          <div className="flex flex-row items-center">
            <LineIcon icon="users" className="mr-1 text-primary-100" />
            <span className="text-sm">{employeeCount}</span>
          </div>
        )}
      </div>
    </Component>
  );
}

OrganizationSummarySkeleton.propTypes = {
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

OrganizationSummarySkeleton.defaultProps = {
  as: 'div'
};

export function OrganizationSummarySkeleton({ as: Component, className, style }) {
  return (
    <Component className={clsx('flex flex-col w-full my-4 animate-pulse', className)} style={style}>
      <div className="w-3/4 h-6 mb-2 bg-gray-400 rounded lg:hidden"></div>
      <div className="w-3/4 h-6 mb-3 bg-gray-400 rounded lg:hidden"></div>
      <div className="w-1/2 h-6 -mt-1 bg-gray-400 rounded lg:w-2/3"></div>
      <div className="flex flex-row items-center mt-6 space-x-1 lg:mt-3">
        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
        <div className="w-1/5 h-3 bg-gray-400 rounded lg:w-16"></div>
      </div>
      <div className="flex flex-row items-center mt-5 space-x-1">
        <div className="w-3 h-2 bg-gray-400 rounded-sm"></div>
        <div className="w-1/3 h-3 bg-gray-400 rounded lg:w-32"></div>
      </div>
      <div className="flex flex-row items-center justify-start mt-2 space-x-1">
        <div className="flex flex-row items-center w-1/4 lg:w-16">
          <LineIcon icon="history" className="mr-1 text-primary-100" />
          <div className="w-2/3 h-3 bg-gray-400 rounded lg:w-3/4"></div>
        </div>
        <div className="flex flex-row items-center w-1/4 lg:w-16">
          <LineIcon icon="dollar-sign" className="mr-1 text-primary-100" />
          <div className="w-2/3 h-3 bg-gray-400 rounded lg:w-3/4"></div>
        </div>
        <div className="flex flex-row items-center w-1/4 lg:w-16">
          <LineIcon icon="calendar" className="mr-1 text-primary-100" />
          <div className="w-2/3 h-3 bg-gray-400 rounded lg:w-3/4"></div>
        </div>
      </div>
    </Component>
  );
}

export default OrganizationSummary;
