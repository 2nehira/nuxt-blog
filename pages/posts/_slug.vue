<template>
  <v-container class="posts">
    <breadcrumbs :add-items="addBread" />
    <h1>{{ post.title }}</h1>
    <nuxt-content :document="post" />
    <v-btn v-if="prev" :to="prev.path" nuxt text>&lt;{{ prev.title }}</v-btn>
    &nbsp;|
    <v-btn v-if="next" :to="next.path" nuxt text>{{ next.title }}&gt;</v-btn>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Prism from 'prismjs'
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
      post = await $content('posts', params.slug)
        .only([
          'title',
          'description',
          'slug',
          'category',
          'tags',
          'date',
          'body'
        ])
        .fetch()
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
          content: 'https://blog.tunehira.net/' + this.post.path
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
.posts {
  /* background: #1e1e1e; */
  /* background: #252525; */
}
.nuxt-content p {
  white-space: pre-wrap;
}
</style>
