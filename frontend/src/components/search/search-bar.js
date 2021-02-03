import PropTypes from 'prop-types';
import SearchInput from '@/components/core/form/search-input';
import clsx from 'clsx';

SearchBar.propTypes = {
  /**
   * Custom element type for this component (defaults to `div`).
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
   * Callback fired when a search is triggered (either after hitting the `Enter` key
   * on the input or clicking/touching the search icon). Receives the input value and the
   * original `SyntheticEvent`.
   * @type {Function}
   */
  onSearch: PropTypes.func.isRequired,

  /**
   * Search input default (initial) value.
   * @type {string}
   */
  defaultValue: PropTypes.string
};

SearchBar.defaultProps = {
  as: 'div'
};

function SearchBar({ as: Component, className, defaultValue, onSearch, style }) {
  return (
    <Component className={clsx('search-bar bg-gradient', className)} style={style}>
      <div className="container px-5 mx-auto lg:px-4">
        <SearchInput
          pill
          dense
          placeholder="Job, company, etc."
          className="w-full my-4 lg:w-1/2 shadow-soft"
          onSearch={onSearch}
          defaultValue={defaultValue}
        />
      </div>
    </Component>
  );
}

export default SearchBar;
