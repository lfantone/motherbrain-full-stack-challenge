import * as Props from '@/prop-types';

import Card, { CardContent } from '@/components/core/card';

import LineChart from '@/components/core/line-chart';
import LineIcon from '@/components/core/line-icon';
import PropTypes from 'prop-types';

OrganizationDetailsCard.propTypes = {
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
   * Organization description.
   * @type {String}
   */
  description: PropTypes.string,

  /**
   * Organization funding rounds.
   * @type {object[]}
   */
  fundings: PropTypes.arrayOf(Props.funding),

  /**
   * Organization short description.
   * @type {String}
   */
  shortDescription: PropTypes.string,

  /**
   * Organization name.
   * @type {String}
   */
  name: PropTypes.string,

  /**
   * Organization total funding amount in USD.
   * @type {Number}
   */
  total: PropTypes.number
};

OrganizationDetailsCard.defaultProps = {
  as: 'section'
};

function OrganizationDetailsCard({
  as,
  className,
  description,
  fundings,
  name,
  shortDescription,
  style,
  total
}) {
  return (
    <Card as={as} className={className} style={style}>
      <CardContent className="p-3 space-y-8 lg:p-5">
        {shortDescription && (
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Organization description</h3>
            <p className="text-sm">{shortDescription}</p>
          </div>
        )}
        {total && (
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Total fundings</h3>
            <LineIcon icon="dollar-sign" className="mr-1 text-primary-100" />
            <span className="text-sm">{total}</span>
          </div>
        )}
        {description && (
          <div className="space-y-2">
            <h3 className="text-lg font-bold">About {name}</h3>
            <p className="text-sm">{description}</p>
          </div>
        )}
        {fundings?.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Fundings</h3>
            <LineChart
              axis={{
                x: {
                  key: 'announcedOn',
                  padding: { right: 20 },
                  label: { value: 'Announced on', position: 'bottom', offset: 0 }
                },
                y: {
                  key: 'raisedAmount',
                  padding: { top: 20 },
                  label: {
                    angle: 90,
                    value: 'Raised amount (U$D)',
                    position: 'insideLeft',
                    offset: -25
                  }
                }
              }}
              height={300}
              margin={{ left: 40, right: 25, top: 40, bottom: 20 }}
              tooltip={{
                wrapper: {
                  borderColor: 'white',
                  boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)'
                },
                content: { backgroundColor: 'rgba(255, 255, 255, 0.8)' },
                label: { fontWeight: 'bold', color: '#666666' },
                formatter: (value, name) => [`u$d ${value}`, 'Amount']
              }}
              lineKey="raisedAmount"
              data={fundings}
              stroke="#ff6b00"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default OrganizationDetailsCard;
