<template>
  <v-hover v-slot:default="{ hover }">
    <v-card
      height="100%"
      :to="post.path"
      :elevation="hover ? 16 : 2"
      nuxt
      class="mx-5 mx-sm-auto mx-md-auto mx-lg-auto mx-xl-auto d-flex flex-column"
    >
      <v-card-text>
        <v-chip
          :to="{
            name: 'category-slug',
            params: { slug: name2category(post.category).slug }
          }"
          nuxt
          color="secondary"
          dark
          >{{ post.category }}</v-chip
        >
      </v-card-text>
      <v-card-title class="pt-0">
        {{ post.title }}
      </v-card-title>
      <v-spacer />
      <!-- <v-card-text class="pb-2">
        <v-chip
          v-for="(tag, i) in post.tags"
          :key="i"
          :to="{ name: 'tags-slug', params: { slug: tag } }"
          color="chip"
          dark
          >#{{ tag }}</v-chip
        ></v-card-text
      > -->
      <v-card-text class="pt-0">
        {{ transformDate(post.date) }}
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
import { mapGetters } from 'vuex'
import { transformDate } from '@/util/index'
export default {
  props: {
    post: {
      type: Object,
      default() {
        return {
          title: 'タイトルなし',
          path: '/',
          category: 'category',
          tags: [''],
          date: '2020-06-14T00:00:00.000Z'
        }
      },
      required: true
    }
  },
  // data() {
  //   return { hover: false }
  // },
  computed: {
    ...mapGetters(['name2category', 'linkTo'])
  },
  methods: {
    transformDate
  }
}
</script>

<style></style>
