import { useState } from 'react';
import { AppError } from '@/types';
import { Button } from '@/ui/Button';
import { FileInput } from '@/ui/FileInput';
import { FilePreview } from '@/ui/FilePreview';
import styles from './UploadForm.module.css';

interface UploadFormProps {
  error: AppError | null;
  isSubmitting: boolean;
  onChange: () => void;
  onSubmit: (file: File) => Promise<void>;
}

export const UploadForm = ({ error, isSubmitting, onChange, onSubmit }: UploadFormProps) => {
  const [file, setFile] = useState<File | null>();
  const extensionIndex = file?.name.lastIndexOf('.');
  const fileName = file?.name.slice(0, extensionIndex);
  const extension = file?.name.slice(extensionIndex);

  const handleFileNameChange = (name: string) => {
    if (!file) {
      return;
    }

    const nextFile = new File([file], name, {
      type: file.type,
      lastModified: file.lastModified,
    });

    setFile(nextFile);
    onChange();
  };

  const handleDelete = () => setFile(null);

  const handleSubmit = () => {
    if (!file) {
      return;
    }

    onSubmit(file).then(() => setFile(null));
  };

  return (
    <div className={styles.wrapper}>
      {!file && <FileInput onChange={(file) => setFile(file)} />}

      {file && (
        <FilePreview
          name={file.name}
          extension={extension || ''}
          size={file.size}
          errorMessage={error?.message}
          disabled={isSubmitting}
          onChange={handleFileNameChange}
          onDelete={handleDelete}
        />
      )}

      <Button
        disabled={!file || !fileName}
        loading={isSubmitting}
        onClick={handleSubmit}
      >
        {error?.status === 409 ? 'Заменить' : 'Сохранить'}
      </Button>
    </div>
  );
};
