<template>
  <div class="container d-flex">
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Id</h3>
      <p class="container__data">{{ animalLote.id }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Id Pessoa</h3>
      <p class="container__data">{{ animalLote.fk_id_animal }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Id Fazenda</h3>
      <p class="container__data">{{ animalLote.fk_id_lote }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Nome Animal</h3>
      <p class="container__data">{{ animalLote.dt_entrada }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Nome Raça</h3>
      <p class="container__data">{{ animalLote.dt_saida }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Sexo</h3>
      <p class="container__data">{{ animalLote.dt_saida }}</p>
    </div>
    <div class="container__info d-flex flex-column">
      <h3 class="container__title">Sexo</h3>
      <p class="container__data">{{ animalLote.ic_bezerro }}</p>
    </div>
    <div
      class="container__info d-flex flex-column justify-content-between container__buttons"
    >
      <button
        @click="$emit('on-update-click', animalLote.id)"
        class="button button__bgcolor-green"
      >
        Update
      </button>
      <button
        @click="$emit('on-delete-click', animalLote.id)"
        class="button button__bgcolor-red"
      >
        Delete
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: "AnimalLoteCard",
  props: {
    animalLote: Object,
  },
};
</script>
<style lang="sass" scoped>
$breakpoint-sm: 1200px

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
    &__title
      width: 180px
</style>
