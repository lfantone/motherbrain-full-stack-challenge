import PropTypes from 'prop-types';
import { funding } from './funding-prop-types';

const fundings = PropTypes.shape({
  /**
   * Organization's list of funding.
   * @type {Array<typeof funding>}
   */
  rounds: PropTypes.arrayOf(funding),
  /**
   * Organization's count of how many funding rounds had.
   * @type {Array<typeof funding>}
   */
  count: PropTypes.number,

  /**
   * Organization's total amount of funds raised in USD.
   * @type {number}
   */
  total: PropTypes.number
});

export const organization = PropTypes.shape({
  /**
   * Organization identifier.
   * @type {string}
   */
  id: PropTypes.string.isRequired,

  /**
   * Organization's company name.
   * @type {string}
   */
  name: PropTypes.string.isRequired,

  /**
   * Organization's company website url.
   * @type {string}
   */
  url: PropTypes.string,

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
   * Company's description.
   * @type {string}
   */
  description: PropTypes.string,

  /**
   * Organization funding information object
   * @type {{ rounds: number, total: number / null }}
   */
  fundings,

  /**
   * Organization's size of employees.
   * @type {string}
   */
  employeeCount: PropTypes.string
});
