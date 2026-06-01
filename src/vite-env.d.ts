/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@components/*' {
  export * from '../../src/components/*'
}

declare module '@pages/*' {
  export * from '../../src/pages/*'
}

declare module '@services/*' {
  export * from '../../src/services/*'
}

declare module '@types/*' {
  export * from '../../src/types/*'
}

declare module '@utils/*' {
  export * from '../../src/utils/*'
}
