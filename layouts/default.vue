<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app clipped right>
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">カテゴリー</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="category in categories"
          :key="category.slug"
          :to="category.url"
          nuxt
        >
          <v-list-item-content>
            <v-list-item-title>{{ category.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-right>
      <v-toolbar-title
        ><nuxt-link class="top-title" to="/">Blog</nuxt-link></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/" nuxt>Home</v-btn>
        <v-btn to="/category" nuxt>カテゴリー</v-btn>
        <v-btn to="/tags" nuxt>タグ</v-btn>
        <!-- aria-label をつけて light house で Buttons do not have an accessible nameが出ないようにしてる -->
        <v-app-bar-nav-icon
          aria-label="nav-icon"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <v-container class="fill-height" fluid>
        <v-content>
          <nuxt />
        </v-content>
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; 2020. tunehira All rights reserved</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null
  }),
  computed: {
    categories() {
      return this.$store.state.categories
    }
  },
  created() {
    this.$vuetify.theme.dark = false
  }
}
</script>

<style>
a.top-title {
  color: black !important;
  text-decoration: none !important;
}
</style>
