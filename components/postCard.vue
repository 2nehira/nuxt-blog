<template>
  <v-card>
    <v-card-text>
      <v-chip>
        {{ post.category }}
      </v-chip>
    </v-card-text>
    <v-card-title>
      <nuxt-link to="post.path">
        {{ post.title }}
      </nuxt-link>
    </v-card-title>
    <v-card-text>
      {{ post.date }}
    </v-card-text>
    <v-card-text>
      <ul>
        <li v-for="(tag, i) in post.tags" :key="i">#{{ tag }}</li>
      </ul>
    </v-card-text>
  </v-card>
</template>

<script>
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
  }
}
</script>
