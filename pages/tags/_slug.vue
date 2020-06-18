<template>
  <v-container fluid>
    <h2>{{ slug }}</h2>
    <postsList :posts="posts"></postsList>
  </v-container>
</template>

<script>
import postsList from '@/components/postsList'
import { associateTagPosts } from '@/util/index'
export default {
  components: {
    postsList
  },
  async asyncData({ $content, params, error }) {
    const allPosts = await $content('posts', { deep: true })
      // .only(['title', 'path', 'category', 'date', 'tags'])
      // .search('tags', params.slug)
      // .search('category', 'カテゴリー1')
      // .where({ category: 'カテゴリー1' })
      // .where({ tags: ['タグ3', 'タグ4'] })
      // .where({ tags: { $in: 'タグ1' } })
      // .where({ tags: { $in: [params.slug] } })
      // .where({ tags: { $in: params.slug } })
      .sortBy('date', 'desc')
      .fetch()
    const slug = params.slug
    const posts = associateTagPosts(slug, allPosts)
    // const posts = allPosts
    return {
      posts,
      slug
    }
  }
}
</script>
