import { isNilOrEmpty, isNotNilOrEmpty } from '@flybondi/ramda-land';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { forwardRef } from 'react';

const propTypes = {
  /**
   * Custom element type for this component (defaults to `button`).
   * @type {import('react').ElementType}
   */
  as: PropTypes.elementType,

  /**
   * The color of the component.
   * @type {string|false}
   */
  color: PropTypes.oneOf(['primary', 'secondary', false]),

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
   * Optional inline CSS styles.
   * @type {object}
   */
  style: PropTypes.object,

  /**
   * If `true`, the button will be disabled.
   * @type {boolean}
   */
  disabled: PropTypes.bool
};

const defaultProps = {
  as: 'button',
  disabled: false
};

const IconButton = forwardRef(function IconButton(
  { as: Component, children, className, color, disabled, style, ...other },
  ref
) {
  return (
    <Component
      ref={ref}
      className={clsx(
        'btn-icon',
        {
          [`btn-icon-${color}`]: isNotNilOrEmpty(color) && color !== false,
          'btn-icon-default': isNilOrEmpty(color) || color === false,
          'text-gray-400': disabled === true
        },
        className
      )}
      style={style}
      disabled={disabled}
      {...other}
    >
      <span className="btn-icon-label">{children}</span>
    </Component>
  );
});

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
