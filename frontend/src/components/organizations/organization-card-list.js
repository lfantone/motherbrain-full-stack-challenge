import * as Props from '@/prop-types';

import OrganizationCard, {
  OrganizationCardSkeleton
} from '@/components/organizations/organization-card';
import { isEmpty, isNil } from 'ramda';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import { isNotNilOrEmpty } from '@flybondi/ramda-land';

// The `EmptyIcon` is only shown if the `organizations` list is empty
const EmptyIcon = dynamic(() => import('../icons/empty-icon'));

OrganizationCardList.propTypes = {
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
   * Search results (organizations) to display.
   * @type {object[]}
   */
  organizations: PropTypes.arrayOf(Props.organization),

  /**
   * Determines organization card sizes. Either `'sm'` (mobile) or `'auto'` (responsive).
   * @type {string}
   */
  size: PropTypes.oneOf(['sm', 'auto']),

  /**
   * Callback fired when a organization card from the result card list is clicked or touched.
   * Receives the original organization element (as found in the `organizations` list) and the HTML synthetic event.
   * @type {Function}
   */
  onOrganizationClick: PropTypes.func.isRequired
};

OrganizationCardList.defaultProps = {
  size: 'auto',
  as: 'div'
};

function OrganizationCardList({
  as: Component,
  className,
  onOrganizationClick,
  organizations,
  size,
  style
}) {
  return (
    <>
      {isNil(organizations) && (
        <Component className={clsx('space-y-3', className)} style={style}>
          <OrganizationCardSkeleton />
          <OrganizationCardSkeleton />
          <OrganizationCardSkeleton />
        </Component>
      )}
      {isEmpty(organizations) && (
        <Component
          className={clsx(
            'flex flex-col items-center mt-10 mb-3 lg:mb-10 animate-fade-in-bck',
            className
          )}
          style={style}
        >
          <EmptyIcon className="w-3/4 h-auto mb-10 lg:w-1/2" />
          <div className="text-lg font-light">
            Try <b>removing some keywords</b> from your search.
          </div>
        </Component>
      )}
      {isNotNilOrEmpty(organizations) && (
        <Component className={clsx('space-y-3 animate-swing-in-left-fwd', className)} style={style}>
          {organizations.map(organization => (
            <OrganizationCard
              key={`organization.${organization.id}`}
              onClick={event => onOrganizationClick(organization, event)}
              {...organization}
              size={size}
            />
          ))}
        </Component>
      )}
    </>
  );
}

export default OrganizationCardList;
