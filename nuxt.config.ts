// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@nuxt/ui"
  ],
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: "single",
        semi: false,
        jsx: false,
      }
    }
  },
  debug: false,
  // GitHub Pages configuration - root path deployment
  nitro: {
    prerender: {
      routes: ["/"]
    }
  },
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/"
  }
})
