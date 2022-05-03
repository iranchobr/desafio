<template>
  <HeaderComponent />
  <router-view />
  <PessoaModalUpdate />
</template>

<script>
import HeaderComponent from "./components/HeaderComponent";
export default {
  name: "App",
  components: {
    HeaderComponent,
  },
};
</script>
<style lang="sass">
#app
  height: 100vh
</style>
