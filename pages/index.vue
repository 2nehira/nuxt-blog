<template>
  <v-content>
    <v-container fluid>
      <ul>
        <li v-for="post in posts" :key="post.slug">
          <postCard :post="post"></postCard>
        </li>
      </ul>
    </v-container>
  </v-content>
</template>

<script>
import postCard from '@/components/postCard'
export default {
  components: {
    postCard
  },
  async asyncData({ $content }) {
    const posts = await $content('posts', { deep: true })
      // .only(['title', 'path', 'category', 'date', 'tags'])
      .sortBy('date', 'desc')
      .fetch()
    return {
      posts
    }
  }
}
</script>
