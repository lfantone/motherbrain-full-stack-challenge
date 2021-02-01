import PropTypes from 'prop-types';
import clsx from 'clsx';
import { forwardRef } from 'react';

const propTypes = {
  /**
   * Application contents.
   * @type {React.ReactNode}
   */
  children: PropTypes.node,

  /**
   * Custom CSS classes to apply to the page content element.
   * @type {String}
   */
  className: PropTypes.string,

  /**
   * Custom element type for this component (defaults to `main`).
   * @type {React.ElementType}
   */
  as: PropTypes.elementType,

  /**
   * If `true` a `container` class will be applied to the root element
   * and content will be centered.
   * @type {boolean}
   */
  container: PropTypes.bool,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object
};

const defaultProps = {
  container: false,
  as: 'div'
};

const PageContent = forwardRef(function PageContent(
  { as: Component, children, className, container, style, ...other },
  ref
) {
  return (
    <Component
      className={clsx(className, 'flex flex-col flex-wrap p-5 items-start lg:flex-nowrap', {
        'container mx-auto': container === true
      })}
      style={style}
      ref={ref}
      {...other}
    >
      {children}
    </Component>
  );
});

PageContent.propTypes = propTypes;
PageContent.defaultProps = defaultProps;

export default PageContent;
