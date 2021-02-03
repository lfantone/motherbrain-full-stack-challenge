import * as Props from '@/prop-types';

import { isEmpty, isNil, toLower } from 'ramda';

import Link from '@/components/core/link';
import PropTypes from 'prop-types';
import { isNotNilOrEmpty } from '@flybondi/ramda-land';

FundingsFeature.propTypes = {
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
   * Featured fundings to display.
   * @type {Object[]}
   */
  fundings: PropTypes.arrayOf(Props.funding)
};

FundingsFeature.defaultProps = {
  as: 'section'
};

function FundingsFeature({ as: Component, className, fundings, style, title }) {
  return (
    <Component className={className} style={style}>
      {title && <h2 className="mb-3 text-lg font-bold lg:m-0 lg:text-md">{title}</h2>}
      {isNil(fundings) && (
        <div className="flex space-x-2 overflow-hidden animate-pulse">
          <div className="w-1/3 h-3 bg-gray-400 rounded"></div>
          <div className="w-1/3 h-3 bg-gray-400 rounded"></div>
          <div className="w-1/3 h-3 bg-gray-400 rounded"></div>
        </div>
      )}
      {isEmpty(fundings) && (
        <h6 className="text-sm font-thin text-gray-500 lg:m-0 lg:text-md lg:font-normal animate-fade-in-bck">
          No fundings here yet.
        </h6>
      )}
      {isNotNilOrEmpty(fundings) && (
        <div className="flex flex-wrap overflow-hidden animate-fade-in-bck">
          {fundings.map(funding => (
            <div key={`funding-${toLower(funding.name)}`} className="w-2/5 lg:w-2/3">
              <Link
                href="/organizations/fundings/[funding]"
                className="text-sm font-light"
                color="primary"
              >
                {funding.name}
                <span className="ml-1">(${funding.raisedAmount})</span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </Component>
  );
}

export default FundingsFeature;
