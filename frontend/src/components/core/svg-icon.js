import PropTypes from 'prop-types';
import clsx from 'clsx';
import { forwardRef } from 'react';

const propTypes = {
  /**
   * Node passed into the SVG element.
   */
  children: PropTypes.node,
  /**
   * Custom element type for this component (defaults to `svg`).
   * @type {import('react').ElementType}
   */
  as: PropTypes.elementType,

  /**
   * Custom CSS classes to apply to the root element.
   * @type {string}
   */
  className: PropTypes.string,

  /**
   * Optional inline CSS styles.
   * @type {Object}
   */
  style: PropTypes.object,

  /**
   * Applies a color attribute to the SVG element.
   * @type {string}
   */
  htmlColor: PropTypes.string,

  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   * @type {string}
   */
  shapeRendering: PropTypes.string,

  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   * @type {string}
   */
  titleAccess: PropTypes.string,

  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @type {string}
   */
  viewBox: PropTypes.string
};

const defaultProps = {
  as: 'svg',
  viewBox: '0 0 24 24'
};

const SvgIcon = forwardRef(function SvgIcon(
  { as: Component, children, className, htmlColor, titleAccess, viewBox, ...other },
  ref
) {
  return (
    <Component
      className={clsx(
        'select-none inline-block fill-current flex-shrink-0 transition duration-200',
        className
      )}
      focusable="false"
      viewBox={viewBox}
      color={htmlColor}
      aria-hidden={titleAccess ? undefined : true}
      role={titleAccess ? 'img' : undefined}
      ref={ref}
      {...other}
    >
      {children}
      {titleAccess ? <title>{titleAccess}</title> : null}
    </Component>
  );
});

SvgIcon.propTypes = propTypes;
SvgIcon.defaultProps = defaultProps;

export default SvgIcon;
