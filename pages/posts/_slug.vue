<template>
  <v-container>
    <breadcrumbs :add-items="addBread" />
    <div class="posts">
      <h1 class="posts-title">{{ post.title }}</h1>
      <div class="date">
        <v-icon>mdi-calendar-today</v-icon>
        {{ transformDate(post.date) }}
      </div>
      <nuxt-content :document="post" />
      <v-btn v-if="prev" :to="prev.path" nuxt text>&lt;{{ prev.title }}</v-btn>
      &nbsp;|
      <v-btn v-if="next" :to="next.path" nuxt text>{{ next.title }}&gt;</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Prism from 'prismjs'
import { transformDate } from '@/util/index'
import breadcrumbs from '@/components/breadcrumbs'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.js'
import 'prismjs/components/prism-markdown.min.js'
export default {
  components: {
    breadcrumbs
  },
  async asyncData({ $content, params, error }) {
    let post
    try {
      post = await $content('posts', params.slug).fetch()
    } catch (e) {
      error({ message: 'Post not found' })
    }
    const [prev, next] = await $content('posts')
      .only(['title', 'path'])
      .sortBy('date', 'desc')
      .surround(params.slug)
      .fetch()
    return {
      post,
      prev,
      next
    }
  },
  computed: {
    ...mapGetters(['name2category']),
    addBread() {
      return [
        {
          icon: 'mdi-folder-outline',
          text: this.post.category,
          to: this.name2category(this.post.category).url,
          exact: true
        }
      ]
    }
  },
  mounted() {
    Prism.highlightAll()
  },
  methods: {
    transformDate
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: this.post.title },
        {
          hid: 'description',
          name: 'description',
          content: this.post.description
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.post.description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://blog.tunehira.net' + this.post.path
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://blog.tunehira.net/ogp/' + this.post.slug + '.png'
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image'
        }
      ]
    }
  }
}
</script>
<style>
.v-application code {
  background: none;
  box-shadow: none;
}
.posts-title {
  padding: 0% 2% 2%;
  text-align: center;
  /* text-align: center; */
}
.date {
  padding: 0% 2% 2%;
  text-align: center;
}
.posts {
  background-color: var(--v-content_background-base);
  padding: 5% 7%;
  margin: 5% 5%;
  border-radius: 1%;
}
.nuxt-content p {
  white-space: pre-wrap;
  line-height: 180%;
}

.nuxt-content h2 {
  font-size: 20px;
  padding: 0.1em 0.5em;
  margin: 0.4em 0;
  /* border-bottom: solid 2px var(--v-chip-base); */
  border-left: solid 3px var(--v-chip-base);
}
</style>
