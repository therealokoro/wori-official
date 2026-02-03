// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/devtools',
    '@nuxthub/core',
    '@nuxt/image',
    '@peterbud/nuxt-query',
    '@onmax/nuxt-better-auth',
    '@vueuse/nuxt'
  ],

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },
  compatibilityDate: 'latest',

  hub: { db: 'sqlite' },

  auth: {
    serverConfig: './configs/auth.server',
    clientConfig: './configs/auth.client',
    // secondaryStorage: true
  },

  eslint: {
    config: {
      standalone: false,
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
})
