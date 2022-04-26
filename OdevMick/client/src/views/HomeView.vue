<template>
  <div
    class="container d-flex flex-column align-items-center w-75 h-50 mx-auto my-auto container"
  >
    <h1 class="my-4 container__title">Content</h1>
    <nav
      class="h-100 container__nav justify-content-between align-items-center"
    >
      <router-link class="my-2 text-center container__link" to="/pessoas"
        >Pessoas</router-link
      >
      <router-link class="my-2 text-center container__link" to="/animais"
        >Animais</router-link
      >
      <router-link class="my-2 text-center container__link" to="/lotes"
        >Lotes</router-link
      >
      <router-link class="my-2 text-center container__link" to="/animais_lotes"
        >Animais X Lotes</router-link
      >
    </nav>
  </div>
</template>
<script>
export default {
  name: "HomeComp",
};
</script>
<style lang="sass">
$breakpoint-sm: 960px

.container
  max-width: 1100px
  &__nav
    display: flex
    flex-direction: column
  &__link
    color: white
    font-weight: bold
    font-size: 20px
    text-decoration: none
    border: 1px solid black
    padding: 8px
    background: #213827
    width: 100%
    &:hover
      color: #424923
      background: transparent
  &__title
    font-weight: bold
@media screen and (min-width: $breakpoint-sm)
  .container
    &__nav
      width: 80%
      flex-direction: row
      justify-content: between
    &__link
      width: auto
</style>
