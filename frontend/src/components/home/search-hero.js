import HeroIcon from '../icons/hero-icon';
import PropTypes from 'prop-types';
import SearchInput from '@/components/core/form/search-input';
import clsx from 'clsx';

SearchHero.propTypes = {
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
   * @type {Function}
   */
  onSearch: PropTypes.func.isRequired
};

SearchHero.defaultProps = {
  as: 'section'
};

function SearchHero({ as: Component, className, onSearch, style }) {
  return (
    <Component
      className={clsx(
        'flex items-center px-4 lg:px-20 search-hero bg-gradient lg:h-80 h-48',
        className
      )}
      style={style}
    >
      <div className="flex flex-col items-center justify-center w-full lg:mr-32 lg:w-1/2 lg:items-start">
        <h3 className="text-xl font-bold text-white">Motherbrain challenge</h3>
        <h5 className="hidden text-lg font-light text-white lg:block">
          Allows you to apply for companies in startups and global companies
        </h5>
        <SearchInput
          placeholder="Search for companies"
          className="mt-6 shadow-soft"
          onSearch={onSearch}
          fullWidth
        />
      </div>
      <HeroIcon className="hidden lg:w-64 lg:block" />
    </Component>
  );
}

export default SearchHero;
