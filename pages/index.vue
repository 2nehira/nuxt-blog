<template>
  <v-container fluid>
    <postsList :posts="posts"></postsList>
  </v-container>
</template>

<script>
import postsList from '@/components/postsList'
export default {
  components: {
    postsList
  },
  async asyncData({ $content }) {
    const posts = await $content('posts')
      .only(['title', 'path', 'category', 'date', 'tags'])
      .sortBy('date', 'desc')
      .fetch()
    return {
      posts
    }
  }
}
</script>
