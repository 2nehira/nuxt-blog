<template>
  <v-container>
    <breadcrumbs :add-items="addBread" />
    <h2>カテゴリー一覧</h2>
    --------------------------<br />
    <v-container fluid>
      <ul>
        <li v-for="category in categories" :key="category.slug">
          <nuxt-link :to="category.url">{{ category.name }}</nuxt-link>
        </li>
      </ul>
    </v-container>
  </v-container>
</template>

<script>
import breadcrumbs from '@/components/breadcrumbs'
export default {
  components: {
    breadcrumbs
  },
  data() {
    return {
      categories: this.$store.state.categories,
      addBread: [
        {
          icon: 'mdi-format-list-bulleted',
          text: 'カテゴリー一覧',
          to: '/category',
          exact: false
        }
      ]
    }
  }
}
</script>
