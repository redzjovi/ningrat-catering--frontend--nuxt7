require('dotenv').config()

module.exports = {
  // Nuxt modules
  modules: [
    'nuxt7',
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

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
    // ...
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
