<template>
  <div>
    <v-breadcrumbs :items="breadcrumbs" divider=">">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item :to="item.to" :exact="item.exact" class="breads">
          <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>

<script>
export default {
  props: {
    addItems: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data: () => ({
    items: [{ icon: 'mdi-home', text: 'ホーム', to: '/', disable: false }]
  }),
  computed: {
    breadcrumbs() {
      return this.items.concat(this.addItems)
    }
  }
}
</script>
<style>
.breads a {
  color: #9da5a0;
}
</style>
