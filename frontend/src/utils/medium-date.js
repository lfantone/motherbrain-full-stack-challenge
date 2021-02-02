import formatDate from 'date-fns/format';

const isCurrentYear = dt => {
  const currentYear = new Date().getFullYear();
  return dt.getFullYear() === currentYear;
};

/**
 * Formats an ISO date string using a `MMM D` pattern (e.g.: 'Jun 20')
 * or `MMM D, YYYY` if is not the in the current year.
 *
 * @param {string|Date} isoDt ISO 8610 date string.
 * @return {string} A date string formatted as `MMM D` or `MMM D, YYYY`.
 */
function mediumDate(isoDt) {
  const date = new Date(isoDt);
  const format = isCurrentYear(date) ? 'MMM d' : 'MMM d, yyyy';
  return formatDate(date, format);
}

export default mediumDate;
