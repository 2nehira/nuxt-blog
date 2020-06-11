<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {}
</script>
