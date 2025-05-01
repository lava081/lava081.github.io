// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/ui'
  ],
  eslint: {
    config: {
      stylistic: {
        // the following options are the default values
        indent: 2,
        quotes: 'single',
        semi: false,
        jsx: false,
      }
    }
  },
  debug: true
})