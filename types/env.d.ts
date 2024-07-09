export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string
      AUTH_GOOGLE_ID: string
      AUTH_GOOGLE_SECRET: string
      HEROPY_API_URL: string
      HEROPY_API_KEY: string
      HEROPY_API_USERNAME: string
    }
  }
}
