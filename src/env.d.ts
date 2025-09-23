interface ImportMetaEnv {
    readonly VITE_HOST_URL: string;
    readonly VITE_API_URL: string;
    readonly VITE_TOKEN_KEY: string;
    readonly VITE_TOKEN_TTL_MS: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}