import React, { forwardRef } from 'react';

import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { isNotNil } from '@flybondi/ramda-land';

const propTypes = {
  /**
   * Custom element type for this component (defaults to `span`).
   * @type {React.ElementType}
   */
  as: PropTypes.elementType,

  /**
   * Additional CSS classes to apply to the input.
   * @type {PropTypes.Requireable<string>}
   */
  className: PropTypes.string,

  /**
   * Reduce vertical spacing on the input element to make it narrower.
   * @type {boolean}
   */
  dense: PropTypes.bool,

  /**
   * Type of the `input` element. It should be a valid HTML5 input type.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types
   */
  type: PropTypes.string,

  /**
   * Whether to take up the full width of its container or not (defaults to 'false').
   * @type {PropTypes.Requireable<boolean>}
   */
  fullWidth: PropTypes.bool,

  /**
   * Element placed on the left side in input.
   * @type {PropTypes.Requireable<PropTypes.ReactNodeLike>}
   */
  startIcon: PropTypes.node,

  /**
   * Element placed on the right side in input.
   * @type {PropTypes.Requireable<PropTypes.ReactNodeLike>}
   */
  endIcon: PropTypes.node,

  /**
   * Show the input with full rounded borders (defaults to `false`).
   * @type {PropTypes.Requireable<boolean>}
   */
  pill: PropTypes.bool,

  /**
   * Mask string. Will render an `InputMask` instead of a regular `input` if provided.
   * @see https://www.npmjs.com/package/react-input-mask#mask--string
   * @type {string}
   */
  mask: PropTypes.string,

  /**
   * @type {import('react').ElementType}
   */
  component: PropTypes.elementType,

  /**
   * If `true` the `input` would display a state of "error" by adding a red left border.
   * (defaults to `false`).
   * @type {bool}
   */
  error: PropTypes.bool,

  /**
   * Optional inline CSS styles.
   * @type {PropTypes.Requireable<object>}
   */
  style: PropTypes.object
};

const defaultProps = {
  as: 'div',
  component: 'input',
  dense: false,
  pill: false,
  error: false,
  fullWidth: false,
  type: 'text'
};

const Input = forwardRef(function Input(
  {
    as: Component,
    className,
    component: InputComponent,
    dense,
    endIcon,
    error,
    fullWidth,
    mask,
    pill,
    startIcon,
    style,
    ...other
  },
  ref
) {
  const start = startIcon ? (
    <span className={clsx('input-icon input-icon-start', { 'input-icon-error': error === true })}>
      {startIcon}
    </span>
  ) : null;

  const end = endIcon ? (
    <span className={clsx('input-icon input-icon-end', { 'input-icon-error': error === true })}>
      {endIcon}
    </span>
  ) : null;

  const Input = mask ? InputMask : InputComponent;
  const inputProps = mask ? { mask, inputRef: ref, ...other } : { ref, ...other };

  return (
    <Component
      className={clsx(
        'input-wrapper',
        {
          'w-full': fullWidth
        },
        className
      )}
      style={style}
    >
      {start}
      <Input
        className={clsx('input', {
          'input-error': error === true,
          'input-dense': dense === true,
          'pl-12': isNotNil(start),
          'pr-12': isNotNil(end),
          'rounded-full': pill
        })}
        {...inputProps}
      />
      {end}
    </Component>
  );
});

Input.propTypes = propTypes;

Input.defaultProps = defaultProps;

export default Input;
