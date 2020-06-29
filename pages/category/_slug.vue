<template>
  <v-container>
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link :to="category.url">{{ category.name }}</nuxt-link>
    <postsList :posts="posts"></postsList>
  </v-container>
</template>

<script>
import postsList from '@/components/postsList'
export default {
  components: {
    postsList
  },
  async asyncData({ $content, params, error }) {
    const categories = (await $content('config', 'categories').fetch())
      .categories
    let category
    try {
      category = categories.filter(
        (category) => category.slug === params.slug
      )[0]
    } catch (e) {
      error({ message: 'category not found' })
    }
    let posts
    try {
      posts = await $content('posts')
        .sortBy('date', 'desc')
        .where({ category: category.name })
        .fetch()
    } catch (e) {
      error({ message: 'Post not found' })
    }
    return {
      posts,
      category
    }
  }
}
</script>
