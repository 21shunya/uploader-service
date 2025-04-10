import cn from 'classnames';
import { ChangeEvent, ComponentPropsWithRef } from 'react';
import { IconUpload } from '@/icons/IconUpload';
import styles from './FileInput.module.css';

interface FileInputProps
  extends Omit<
    ComponentPropsWithRef<'input'>,
    'type' | 'defaultValue' | 'defaultChecked' | 'onChange' | 'placeholder' | 'value' | 'multiple' | 'max'
  > {
  onChange: (file: File) => void;
}

export const FileInput = ({ id, onChange, style, className, ...props }: FileInputProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    onChange(file);

    e.target.value = '';
    e.target.files = null;
  };

  return (
    <label
      htmlFor={id}
      style={style}
      className={cn(styles.container, className)}
    >
      <input
        {...props}
        type="file"
        id={id}
        multiple={false}
        className={styles.input}
        onChange={handleInputChange}
      />
      <IconUpload className={styles.icon} />
      <span className={styles.text}>Загрузите файл</span>
    </label>
  );
};
