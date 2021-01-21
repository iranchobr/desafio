<template>
  <div>
    <TheNavbar />
    <div class="main">
      <div class="d-flex justify-content-center">
        <h1>Pesquisar registros</h1>
      </div>
      <div class="input-box">
        <TheSearchInput @animal="animal" />
      </div>
      <div>
        <b-card
          bg-variant="dark"
          :header="nameAnimal"
          text-variant="white"
          class="text-center"
        >
          <div class="d-flex flex-column align-items-start">
            <b-card-text
              >Data de entrada:
              {{
                animals.length > 0 ? animals[0].dt_entrada : "" | moment
              }}</b-card-text
            >
            <b-card-text
              >Data de saída:
              {{
                animals.length > 0 ? animals[0].dt_saida : "" | moment
              }}</b-card-text
            >
            <b-card-text
              >Última movimentação:
              {{
                animals.length > 0
                  ? animals[0].dt_ultima_movimentacao
                  : "" | moment
              }}</b-card-text
            >
            <b-card-text
              >IC Bezerro:
              {{ animals.length > 0 ? animals[0].ic_bezerro : "" }}</b-card-text
            >
          </div>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import TheSearchInput from "@/components/TheSearchInput";
import moment from "moment";

export default {
  components: {
    TheNavbar,
    TheSearchInput,
  },
  data: () => ({
    animals: [],
    nameAnimal: "",
  }),
  methods: {
    moment: function () {
      return moment();
    },
    animal(payload) {
      this.nameAnimal = payload.animals.no_animal;
      this.animals = payload.filterAnimals;
    },
  },
  filters: {
    moment: function (date) {
      if (date) {
        return moment(date).format("DD/MMM/YYYY");
      }
    },
  },
};
</script>
