<template>
  <header class="d-flex justify-content-center">
    <img class="p-sm-3" src="./../assets/logoIRBR.png" />
  </header>
</template>
<script>
export default {
  name: "HeaderComp",
};
</script>
<style lang="sass" scoped>
$breakpoint-sm: 960px
header
  background-color: #424923
  img
    width: 50%

@media (min-width: $breakpoint-sm)
  header
    img
      width: 25%
</style>
