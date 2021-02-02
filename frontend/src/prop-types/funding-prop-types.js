import PropTypes from 'prop-types';

export const funding = PropTypes.shape({
  /**
   * Funding identifier.
   * @type {string}
   */
  id: PropTypes.string.isRequired,

  /**
   * Organization identifier.
   * @type {string}
   */
  organizationId: PropTypes.string.isRequired,

  /**
   * Organization's company name.
   * @type {string}
   */
  name: PropTypes.string.isRequired,

  /**
   * Funding investment type
   * @type {string}
   */
  type: PropTypes.string,

  /**
   * Date when the funding was announced.
   * @type {string}
   */
  announcedOn: PropTypes.string.isRequired,

  /**
   * Candidate's CV `.pdf` or `.docx` file URL and original filename.
   * @type {string}
   */
  raisedAmount: PropTypes.number.isRequired,

  /**
   * A list of funding investor's company name.
   * @type {Array<string>}
   */
  investors: PropTypes.arrayOf(PropTypes.string)
});
