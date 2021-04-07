import colors from 'vuetify/es5/util/colors'
export default {
  mode: 'universal',
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + 'Blog',
    title: 'blog' || '',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'tunehiraのブログ' },
      { hid: 'og:site_name', property: 'og:site_name', content: 'Blog' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: 'https://blog.tunehira.net'
      },
      { hid: 'og:title', property: 'og:title', content: 'Home' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'tunehiraのBlog'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: 'https://blog.tunehira.net/ogp.png'
      },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: '@2nehira' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css'
      },
      { rel: 'alternate', type: 'application/rss+xml', href: '/feed.xml' }
    ]
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
  plugins: [],
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
  modules: ['@nuxt/content', '@nuxtjs/sitemap', '@nuxtjs/feed'],
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      options: {
        customProperties: true
      },
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
        },
        light: {
          accent: colors.green.darken3,
          secondary: '#333333',
          info: colors.teal.lighten1,
          warning: colors.purple.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: colors.grey.lighten3,
          content_background: '#FFFFFF',
          chip: '#60CAAD'
        }
      }
    }
  },
  content: {
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-katex'],
      prism: {
        // theme: 'prism-themes/themes/prism-atom-dark.css'
        // theme: 'prism-themes/themes/prism-dracula.css'
        theme: 'prism-themes/themes/prism-material-oceanic.css'
        // theme: 'prism-themes/themes/prism-nord.css'
      }
    }
  },
  sitemap: {
    hostname: 'https://blog.tunehira.net',
    gzip: true,
    exclude: [],
    routes: async () => {
      const { $content } = require('@nuxt/content')
      const posts = await $content('posts')
        .only(['path'])
        .fetch()
      const postsPath = posts.map((post) => post.path)
      const categories = await $content('config', 'categories').fetch()
      const categoryPath = categories.categories.map((category) => category.url)
      return [...postsPath, ...categoryPath]
    }
  },
  // reference https://github.com/nuxt-community/feed-module#feed-create-function
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: 'Blog',
          link: 'https://blog.tunehira.net/feed.xml',
          description: 'This is My blog'
        }
        const { $content } = require('@nuxt/content')
        const posts = await $content('posts').fetch()
        const baseArticlesUrl = 'https://tunehira.net'
        posts.forEach((post) => {
          const url = baseArticlesUrl + post.path
          feed.addItem({
            title: post.title,
            id: url,
            link: url,
            date: new Date(post.date),
            description: post.description,
            content: post.description
          })
        })
        feed.addCategory('Blog')
        feed.addContributor({
          name: 'tunehira',
          link: 'https://blog.tunehira.net'
        })
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      data: []
    }
  ],
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
