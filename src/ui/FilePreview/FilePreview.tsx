import cn from 'classnames';
import { ChangeEvent } from 'react';
import { prettifySize } from '@/utils/prettifySize';
import styles from './FilePreview.module.css';

interface FilePreviewProps {
  name: string;
  extension: string;
  size: number;
  errorMessage?: string;
  disabled?: boolean;
  onChange: (name: string) => void;
  onDelete: () => void;
  className?: string;
}

export const FilePreview = ({
  name,
  extension,
  size,
  errorMessage,
  disabled,
  onChange,
  onDelete,
  className,
}: FilePreviewProps) => {
  const prettySize = prettifySize(size);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (!value) {
      onChange(extension);
      return;
    }

    const extensionIndex = name.lastIndexOf(extension);
    if (!value.endsWith(extension)) {
      setTimeout(() => e.target.setSelectionRange(extensionIndex, extensionIndex), 0);
      return;
    }

    onChange(value);
  };

  return (
    <div className={cn(styles.wrapper, disabled && styles['wrapper-disabled'], className)}>
      <div className={styles.size}>{prettySize}</div>

      <div className={styles.content}>
        <div className={styles.description}>
          <input
            id={`file-input`}
            type={'text'}
            value={name}
            disabled={disabled}
            onChange={handleChange}
            className={styles.input}
          />

          <div className={styles.error}>{errorMessage}</div>
        </div>

        <button
          disabled={disabled}
          onClick={onDelete}
          className={styles.button}
        >
          Удалить
        </button>
      </div>
    </div>
  );
};
