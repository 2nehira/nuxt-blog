<template>
  <v-container>
    <breadcrumbs :add-items="addBread" />
    <h2>タグ一覧</h2>
    --------------------------<br />
    <v-container fluid>
      <ul>
        <li v-for="(tag, i) in tags" :key="i">
          <nuxt-link :to="{ name: 'tags-slug', params: { slug: tag } }">{{
            tag
          }}</nuxt-link>
        </li>
      </ul>
    </v-container>
  </v-container>
</template>

<script>
import { createTagList } from '@/util/index'
import breadcrumbs from '@/components/breadcrumbs'
export default {
  components: {
    breadcrumbs
  },
  async asyncData({ $content, params, error }) {
    const posts = await $content('posts')
      .only(['tags'])
      .fetch()
    const tags = createTagList(posts)
    return {
      tags
    }
  },
  data() {
    return {
      addBread: [
        {
          icon: 'mdi-format-list-bulleted',
          text: 'タグ一覧',
          to: '/tags',
          exact: false
        }
      ]
    }
  }
}
</script>
