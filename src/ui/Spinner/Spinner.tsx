import cx from 'classnames';
import { ComponentPropsWithoutRef } from 'react';
import styles from './Spinner.module.css';

export type SpinnerProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'>;

export const Spinner = function Spinner({ color = 'inherit', className = '', ...props }: SpinnerProps) {
  return (
    <span
      {...props}
      className={cx(styles.spinner, className)}
    >
      <svg
        viewBox="0 0 32 32"
        className={styles.circle}
        fill="none"
      >
        <path
          d="M16 2A14 14 0 1 1 3.92 23.076"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};
