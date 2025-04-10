// / <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_O_AUTH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
