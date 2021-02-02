import Button from './button';
import PropTypes from 'prop-types';
import SpinnerIcon from '@/components/icons/spinner-icon';
import clsx from 'clsx';

SubmitButton.propTypes = {
  /**
   * Button contents.
   * @type {import('react').ReactNode}
   */
  children: PropTypes.node,

  /**
   * Optional inline CSS styles.
   * @type {object}
   */
  style: PropTypes.object,
  /**
   * Custom element type for this component (defaults to `button`).
   * @type {import('react').ElementType}
   */
  as: PropTypes.elementType,

  /**
   * Custom CSS classes to apply to the root element.
   * @type {string}
   */
  className: PropTypes.string,

  /**
   * If `true`, the button will be disabled.
   * @type {boolean}
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, a loading spinner will be shown (defaults to `false`).
   * @type {boolean}
   */
  submitting: PropTypes.bool
};

SubmitButton.defaultProps = {
  submitting: false
};

function SubmitButton({ as, children, className, disabled, style, submitting, ...other }) {
  return (
    <Button
      {...other}
      as={as}
      className={className}
      style={style}
      type="submit"
      disabled={disabled}
      startIcon={
        <SpinnerIcon
          className={clsx('w-5 h-5 text-white animate-spin', {
            hidden: !submitting,
            'inline-block': submitting
          })}
        />
      }
    >
      {children}
    </Button>
  );
}

export default SubmitButton;
