require('dotenv').config()

module.exports = {
  // Nuxt modules
  modules: [
    'nuxt7',
    '@nuxtjs/auth',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  /*
   * Auth module configuration
   */
  auth: {
    redirect: {
      login: '/auth/login'
    },
    strategies: {
      local: {
        endpoints: {
          login: { method: 'post', propertyName: 'data.access_token', url: '/auth/login' },
          logout: { method: 'post', url: '/auth/logout' },
          user: { method: 'get', propertyName: 'data', url: '/auth/user' }
        }
      }
    }
  },

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: process.env.API_URL
  },

  // PWA manifest
  // https://github.com/nuxt-community/pwa-module
  manifest: {
    name: 'ningrat-catering--frontend--nuxt7',
    description: ''
  },

  // Framework7 Config
  framework7: {
    main: {
      stackPages: true
    },
    themeColor: '#41B883'
  },

  // Build configuration
  build: {
    // Extract CSS in a separated file
    extractCSS: true,

    // You can extend webpack config here
    extend (config) {
      // ...
    }
  },

  // Additional CSS configuration
  css: [
    'assets/app.css'
  ]
}
