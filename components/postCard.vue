<template>
  <v-hover v-slot:default="{ hover }">
    <v-card :to="post.path" :elevation="hover ? 16 : 2" nuxt class="mx-auto">
      <v-card-text>
        <v-chip
          :to="{
            name: 'category-slug',
            params: { slug: name2category(post.category).slug }
          }"
          nuxt
          >{{ post.category }}</v-chip
        >
      </v-card-text>
      <v-card-title>
        {{ post.title }}
      </v-card-title>
      <v-card-text>
        {{ transformDate(post.date) }}
      </v-card-text>
      <v-card-text>
        <v-chip
          v-for="(tag, i) in post.tags"
          :key="i"
          :to="{ name: 'tags-slug', params: { slug: tag } }"
          >#{{ tag }}</v-chip
        ></v-card-text
      >
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
