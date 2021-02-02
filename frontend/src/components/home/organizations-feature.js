import * as Props from '@/prop-types';

import LineIcon from '@/components/core/line-icon';
import Link from '@/components/core/link';
import OrganizationCard from '@/components/organizations/organization-card';
import PropTypes from 'prop-types';

OrganizationsFeature.propTypes = {
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
   * Feature title.
   * @type {string}
   */
  title: PropTypes.string,

  /**
   * Featured organizations to display.
   * @type {Object[]}
   */
  organizations: PropTypes.arrayOf(Props.organization),

  /**
   * Callback fired when a organization card from the featured organizations card list is clicked or touched.
   * Receives the original organization element (as found in the `organizations` list) and the HTML synthetic event.
   * @type {Function}
   */
  onOrganizationClick: PropTypes.func.isRequired
};

OrganizationsFeature.defaultProps = {
  organizations: [],
  as: 'section'
};

function OrganizationsFeature({
  as: Component,
  className,
  onOrganizationClick,
  organizations,
  style,
  title
}) {
  return (
    <Component className={className} style={style}>
      {title && <h2 className="mb-3 text-lg font-bold">{title}</h2>}
      <div className="space-y-3">
        {organizations.map(organization => (
          <OrganizationCard
            key={`organization.${organization.id}`}
            onClick={event => onOrganizationClick(organization, event)}
            {...organization}
          />
        ))}
      </div>
      <div className="flex items-center justify-end w-full mt-3 space-x-2">
        <LineIcon icon="list" className="text-primary-100" size="lg" />
        <Link href="/search" className="text-sm" color="primary">
          See all organizations
        </Link>
      </div>
    </Component>
  );
}

export default OrganizationsFeature;
