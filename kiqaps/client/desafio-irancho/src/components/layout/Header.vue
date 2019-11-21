<template>
  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
    <router-link to="/" class="navbar-brand col-sm-3 col-md-2 mr-0">iRancho</router-link>
  </nav>
</template>

<script>
export default {
  
}
</script>

<style lang="scss">
.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
  &:focus{
    outline: none;
  }
}
</style>