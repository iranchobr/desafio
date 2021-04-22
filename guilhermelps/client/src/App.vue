<template>
  <container>
    <router-view></router-view>
  </container>
</template>

<script>
  import Container from './components/container/Container.vue'

  export default {
    components: {
      container: Container
    }
  }
</script>

<style lang="scss">
</style>
