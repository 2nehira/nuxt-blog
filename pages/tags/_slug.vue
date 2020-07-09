<template>
  <v-container fluid>
    <h2>{{ slug }}</h2>
    <postsList :posts="posts"></postsList>
  </v-container>
</template>

<script>
import postsList from '@/components/postsList'
// import { associateTagPosts } from '@/util/index'
export default {
  components: {
    postsList
  },
  async asyncData({ $content, params, error }) {
    const posts = await $content('posts')
      .where({ tags: { $contains: params.slug } })
      .sortBy('date', 'desc')
      .only(['title', 'path', 'category', 'date', 'tags'])
      .fetch()
    const slug = params.slug
    return {
      posts,
      slug
    }
  }
}
</script>
