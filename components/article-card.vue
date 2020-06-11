<template>
  <V-card>
    <v-card-title>{{ article.title }}</v-card-title>
  </V-card>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default() {
        return { title: 'タイトルなし' }
      },
      required: true
    }
  }
}
</script>
