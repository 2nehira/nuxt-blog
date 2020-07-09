<template>
  <v-container>
    <breadcrumbs :add-items="addBread" />
    <postsList :posts="posts"></postsList>
  </v-container>
</template>

<script>
import postsList from '@/components/postsList'
import breadcrumbs from '@/components/breadcrumbs'
export default {
  components: {
    postsList,
    breadcrumbs
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
        .only(['title', 'path', 'date', 'category', 'tags'])
        .fetch()
    } catch (e) {
      error({ message: 'Post not found' })
    }
    return {
      posts,
      category
    }
  },
  computed: {
    addBread() {
      return [
        {
          icon: 'mdi-format-list-bulleted',
          text: 'カテゴリー一覧',
          to: '/category',
          exact: true
        },
        {
          icon: 'mdi-forlder-outline',
          text: this.category.name
        }
      ]
    }
  }
}
</script>
