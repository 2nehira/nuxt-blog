<template>
  <v-container>
    <nuxt-link :to="name2category(post.category).url">{{
      post.category
    }}</nuxt-link>
    <h2>{{ post.title }}</h2>
    <nuxt-content :document="post" />
    <v-btn v-if="prev" :to="prev.path" nuxt text>&lt;{{ prev.title }}</v-btn>
    &nbsp;|
    <v-btn v-if="next" :to="next.path" nuxt text>{{ next.title }}&gt;</v-btn>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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
    ...mapGetters(['name2category'])
  }
}
</script>
<style>
.v-application code {
  background: none;
  box-shadow: none;
}
</style>
