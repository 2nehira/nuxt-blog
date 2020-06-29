import colors from 'vuetify/es5/util/colors'
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + 'Blog',
    title: 'blog' || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/categories'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-104093115-4'
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxt/content'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  content: {
    markdown: {
      prism: {
        theme: 'prism-themes/themes/prism-atom-dark.css'
        // theme: 'prism-themes/themes/prism-vsc-dark-plus.css'
        // theme: 'prism-themes/themes/prism-dracula.css'
        // theme: 'prism-themes/themes/prism-material-oceanic.css'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  generate: {
    async routes() {
      const { $content } = require('@nuxt/content')
      const posts = await $content('posts')
        .only(['path'])
        .fetch()
      const postsPath = posts.map((post) => post.path)
      const categories = await $content('config', 'categories').fetch()
      const categoryPath = categories.categories.map((category) => category.url)
      return [...postsPath, ...categoryPath]
      // return posts.map((post) => post.path)
      // return Promise.all([
      //   const {$content} = require('@nuxt/content')
      //   $content('posts', { deep: true }).fetch()
      // ]).then(([posts]) => {
      //   return [
      //     ...posts.map((post) => {
      //       return post.path
      //     })
      //   ]
      // })
    }
  }
}
