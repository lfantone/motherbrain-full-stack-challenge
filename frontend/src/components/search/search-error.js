import ErrorIcon from '@/components/icons/error-icon';
import PropTypes from 'prop-types';
import clsx from 'clsx';

SearchError.propTypes = {
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
   * Error thrown during a job search action.
   * @type {Error|{ message?: string }}
   */
  error: PropTypes.oneOfType([
    PropTypes.shape({ message: PropTypes.string }),
    PropTypes.instanceOf(Error)
  ])
};

SearchError.defaultProps = {
  as: 'div'
};

function SearchError({ as: Component, className, error, style }) {
  return (
    <Component className={clsx('flex flex-col items-center', className)} style={style}>
      <ErrorIcon className="w-3/4 h-auto mb-10 lg:w-1/2" />
      <div className="text-lg font-light">
        <b>Something happened</b> while fetching your results.
      </div>
      {error?.message && <code className="mt-2 font-mono text-xs">{error.message}</code>}
    </Component>
  );
}

export default SearchError;
