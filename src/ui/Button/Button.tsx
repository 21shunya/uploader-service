import cn from 'classnames';
import { ComponentPropsWithRef } from 'react';
import { Spinner } from '../Spinner';
import styles from './Button.module.css';

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  loading?: boolean;
}

export const Button = ({
  type = 'button',
  children,
  disabled,
  loading,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled || loading}
      className={cn(
        styles.button,
        loading && styles['button-loading'],
        disabled && styles['button-disabled'],
        className,
      )}
    >
      <span className={styles.content}>{children}</span>

      {loading && <Spinner className={styles.loader} />}
    </button>
  );
};
