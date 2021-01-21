<template>
  <b-alert :show="dismissCountDown" dismissible variant="warning">
    <p>Cadastro realizado com sucesso!</p>
  </b-alert>
</template>

<script>
export default {
  name: "TheAlert",
  props: {
    dismissCountDown: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    dismissSecs: 3,
    showDismissibleAlert: true,
  }),
};
</script>

<style scoped>
</style>