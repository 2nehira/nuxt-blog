<template>
  <v-container fluid>
    <breadcrumbs :add-items="addBread" />
    <h2>{{ slug }}</h2>
    <postsList :posts="posts"></postsList>
  </v-container>
</template>

<script>
import postsList from '@/components/postsList'
import breadcrumbs from '@/components/breadcrumbs'
// import { associateTagPosts } from '@/util/index'
export default {
  components: {
    postsList,
    breadcrumbs
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
  },
  computed: {
    addBread() {
      return [
        {
          icon: 'mdi-format-list-bulleted',
          text: 'タグ一覧',
          to: '/tags',
          exact: true
        },
        {
          text: this.slug
        }
      ]
    }
  }
}
</script>
