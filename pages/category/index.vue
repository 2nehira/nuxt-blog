<template>
  <v-container>
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
export default {
  data() {
    return {
      categories: this.$store.state.categories
    }
  }
}
</script>
