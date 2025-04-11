import { isAxiosError } from 'axios';
import { useState } from 'react';
import { getDownloadLink, getUploadLink, uploadFile } from '@/api';
import { UploadForm } from '@/components/UploadForm';
import { useServiceHandler } from '@/hooks/use-service-handler';
import { IconDownload } from '@/icons/IconDownload';
import { Button } from '@/ui/Button';
import { downloadUrl } from '@/utils/download-url';
import styles from './App.module.css';

function App() {
  const [overwrite, setOverwrite] = useState(false);
  const [downloadPath, setDownloadPath] = useState<string | null>(null);

  const {
    error: uploadError,
    isSubmitting: isUploading,
    handler: uploadHandler,
    clearError: clearUploadError,
  } = useServiceHandler();

  const handleFileChange = () => {
    if (overwrite) {
      setOverwrite(false);
    }

    if (uploadError?.status === 409) {
      clearUploadError();
    }
  };

  const handleUploadFile = async (file: File) => {
    const service = async () => {
      try {
        const res = await getUploadLink(file.name, overwrite);
        setOverwrite(false);

        const formData = new FormData();
        formData.append('file', file);
        await uploadFile(res.data.href, formData);

        setDownloadPath(file.name);
        return Promise.resolve();
      } catch (err) {
        if (isAxiosError(err) && err.status === 409) {
          setOverwrite(true);
        }
        return Promise.reject(err);
      }
    };

    return uploadHandler(service);
  };

  const { error: downloadError, isSubmitting: isDownloading, handler: downloadHandler } = useServiceHandler();
  const handleDownloadFile = async () => {
    if (!downloadPath) {
      return;
    }

    await downloadHandler(() =>
      getDownloadLink(downloadPath).then((res) => downloadUrl(res.data.href, 'test_name')),
    );
  };

  return (
    <div className={styles.wrapper}>
      <UploadForm
        error={uploadError}
        isSubmitting={isUploading}
        onChange={handleFileChange}
        onSubmit={handleUploadFile}
      />

      {downloadPath && (
        <Button
          style={{ alignSelf: 'center' }}
          loading={isDownloading}
          onClick={handleDownloadFile}
        >
          <IconDownload className={styles.icon} />
          Скачать файл {downloadPath}
        </Button>
      )}

      {downloadError && <div className={styles.error}>{downloadError.message}</div>}
    </div>
  );
}

export default App;
