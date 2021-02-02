import { isNotNilOrEmpty, lowerEquals } from '@flybondi/ramda-land';

import PropTypes from 'prop-types';
import clsx from 'clsx';

Button.propTypes = {
  /**
   * Button contents.
   * @type {import('react').ReactNode}
   */
  children: PropTypes.node,

  /**
   * Additional CSS classes to apply to the button.
   * @type {string}
   */
  className: PropTypes.string,

  /**
   * Custom element type for this component (defaults to `button`).
   * @type {import('react').ElementType}
   */
  as: PropTypes.elementType,

  /**
   * Optional inline CSS styles.
   * @type {object}
   */
  style: PropTypes.object,

  /**
   * The color of the component.
   * @type {string|false}
   */
  color: PropTypes.oneOf(['primary', 'secondary', false]),

  /**
   * Show button with rounded borders (defaults to `false`).
   * @type {boolean}
   */
  pill: PropTypes.bool,

  /**
   * Show button as a full circle (defaults to `false`).
   * @type {boolean}
   */
  circle: PropTypes.bool,

  /**
   * Whether to take up the full width of its container or not.
   * @type {boolean}
   */
  fullWidth: PropTypes.bool,

  /**
   * The button variant to use.
   * @type {string|false}
   */
  variant: PropTypes.oneOf(['contained', 'outlined', 'text', false]),

  /**
   * @type {boolean}
   */
  dense: PropTypes.bool,

  /**
   * Disable the button element.
   * @type {boolean}
   */
  disabled: PropTypes.bool,

  /**
   * Element placed before the children.
   * @type {React.ReactNode}
   */
  startIcon: PropTypes.node,

  /**
   * Element placed after the children.
   * @type {React.ReactNode}
   */
  endIcon: PropTypes.node,

  /**
   * Specifies the type of button (defaults to `'button'`).
   * @type {string}
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
};

Button.defaultProps = {
  pill: false,
  circle: false,
  dense: false,
  fullWidth: false,
  disabled: false,
  color: 'primary',
  as: 'button',
  variant: 'contained',
  type: 'button'
};

/**
 * @function
 */
const isContained = lowerEquals('contained');

/**
 * @function
 */
const isOutlined = lowerEquals('outlined');

/**
 * @function
 */
const isText = lowerEquals('text');

function Button({
  as: Component,
  children,
  circle,
  className,
  color,
  dense,
  disabled,
  endIcon,
  fullWidth,
  pill,
  startIcon,
  style,
  type,
  variant,
  ...other
}) {
  const start = startIcon && <span className="mr-2 -ml-1">{startIcon}</span>;
  const end = endIcon && <span className="ml-1 -mr-1">{endIcon}</span>;
  const content = start || end ? <span>{children}</span> : children;

  return (
    <Component
      style={style}
      type={type}
      className={clsx(
        'btn',
        {
          'btn-contained': isContained(variant),
          'btn-outlined': isOutlined(variant),
          'btn-disabled': disabled === true,
          'btn-text': isText(variant),
          'btn-dense': dense === true,
          'btn-circle': circle === true,
          [`btn-${color}`]: isNotNilOrEmpty(color) && color !== false,
          rounded: !pill,
          'rounded-full': pill,
          'w-full': fullWidth
        },
        className
      )}
      disabled={disabled}
      {...other}
    >
      <span className="flex items-center justify-center w-full">
        {start}
        {content}
        {end}
      </span>
    </Component>
  );
}

export default Button;
