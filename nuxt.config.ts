/* eslint-disable node/prefer-global/process */
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
    '@vueuse/nuxt',
  ],

  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    betterAuthSecret: process.env.NUXT_BETTER_AUTH_SECRET,
    adminEmail: process.env.NUXT_ADMIN_EMAIL,
    adminPass: process.env.NUXT_ADMIN_PASS,
    public: { siteUrl: process.env.NUXT_SITE_URL }
  },

  nuxtQuery: {
    autoImports: ["useQuery", "useMutation", "useQueryClient"]
  },

  routeRules: {
    '/': { prerender: true },
    "/admin/*": { ssr: false }
  },
  compatibilityDate: 'latest',

  hub: { db: 'sqlite', blob: true, kv: true },

  auth: {
    clientOnly: true,
    clientConfig: './configs/auth.client'
  },

  eslint: {
    config: {
      standalone: false,
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      }
    },
  },

  image: { provider: 'none' },

  vite: {
    optimizeDeps: {
      noDiscovery: true,
      include: [
        'better-auth/vue',
        '@orpc/client',
        '@orpc/client/fetch',
        '@orpc/tanstack-query',
        'drizzle-zod',
        'typeid-js',
        'zod',
        'drizzle-orm',
        'drizzle-orm/sqlite-core'
      ]
    }
  },

  $production: {
    image: {
      provider: 'cloudflare',
      cloudflare: { baseURL: '/images' }
    },
    nitro: {
      prerender: {
        routes: ['/', '/about/*', '/services', '/donate', '/contact-us']
      },
      preset: "cloudflare_module",
      cloudflare: {
        deployConfig: true,
        nodeCompat: true
      }
    },
  }
})