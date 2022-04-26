<template>
  <div class="container d-flex">
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Id</h3>
      <p class="container__data">{{ pessoa.id }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Nome</h3>
      <p class="container__data">{{ pessoa.no_pessoa }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Email</h3>
      <p class="container__data">{{ pessoa.no_email }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Endereço</h3>
      <p class="container__data">{{ pessoa.endereco }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Sexo</h3>
      <p class="container__data">{{ pessoa.sexo }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Ativo</h3>
      <p class="container__data">{{ pessoa.ic_ativo }}</p>
    </div>
    <div
      class="container__info d-flex flex-column justify-content-between container__buttons"
    >
      <button
        @click="$emit('on-update-click', pessoa.id)"
        class="button button__bgcolor-green"
      >
        Update
      </button>
      <button
        @click="$emit('on-delete-click', pessoa.id)"
        class="button button__bgcolor-red"
      >
        Delete
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "PessoaCard",
  props: {
    pessoa: Object,
  },
};
</script>
<style lang="sass" scoped>
$breakpoint-sm: 960px

.container
  width: 100%
  max-width: 600px
  margin: 0 auto
  text-align: center
  flex-direction: column
  margin: 40px 0
  &__title
    background-color: #424923
    color: white
    padding: 10px
  &__data
    font-size: 18px
    height: 40px
.button
  width: 100%
  padding: 6px
  border: none
  color: white
  margin: 0 auto
  &:hover
    background: transparent
    color: #424923
    outline: 2px solid #424923
  &__bgcolor-green
    background: #117117
  &__bgcolor-red
    background: #731111
.container__buttons
  margin-left: 4px
@media (min-width: $breakpoint-sm)
  .container
    flex-direction: row
    justify-content: center
    &__data
      justify-content: space-between
      width: 100px
    &__info
      justify-content: space-between
    &__button
      width: 100px
</style>
