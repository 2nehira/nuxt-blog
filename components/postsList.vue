<template>
  <v-container fluid>
    <v-row>
      <v-col
        v-for="post in posts"
        :key="post.slug"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <postCard :post="post" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postCard from '@/components/postCard'
export default {
  components: {
    postCard
  },
  props: {
    posts: {
      type: Array,
      default() {
        return [
          {
            title: 'タイトルなし',
            path: '/',
            category: 'category',
            tags: [''],
            date: '2020-06-14T00:00:00.000Z'
          }
        ]
      },
      required: true
    }
  }
}
</script>
