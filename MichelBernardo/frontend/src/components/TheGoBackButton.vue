<template>
  <b-button variant="dark" size="lg" @click="goBack">Voltar</b-button>
</template>

<script>
export default {
  methods: {
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>