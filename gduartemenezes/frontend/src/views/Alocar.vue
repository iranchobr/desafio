<template>
  <div class="alocar">
    <div class="selecao-1">
      <button class="btn btn-dark" @click="showAnimais = !showAnimais">
        Buscar Animais
      </button>
      <div v-if="showAnimais == true">
        <TableAnimais class="table-sm" @animal-sel="getSelecionado" />
      </div>
      <button class="btn btn-dark" @click="showLotes = !showLotes">
        Buscar Lotes
      </button>
      <div class="lotes" v-if="showLotes == true">
        <TableLotes class="table" @lote-sel="getSelecionadoLote" />
      </div>
    </div>
    <div>
      <ul class="listaSelecionados">
        <strong>Animais para Alocação:</strong>
        <hr />
        <li v-for="animal in animaisAlocar" v-bind:key="animal.id">
          {{ animal.no_animal }} - {{ animal.no_raca }} - {{ animal.sexo }}
        </li>
      </ul>
      <ul :value="lote" class="listaSelecionados">
        <strong>Lote:</strong>
        <hr />
        <li>{{ lote.no_lote }} - {{ lote.id }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import TableAnimais from "../components/tables/TableAnimais";
import TableLotes from "../components/tables/TableLotes";

export default {
  name: "Alocar",
  components: {
    TableAnimais,
    TableLotes,
  },
  data() {
    return {
      showAnimais: false,
      showLotes: false,
      lote: {},
      animaisAlocar: [],
      animal: {},
    };
  },
  methods: {
    getSelecionado(value) {
      this.animaisAlocar.push(value);

      console.log(this.animaisAlocar);
    },
    getSelecionadoLote(value) {
      this.lote = value;
      console.log(value);
    },
  },
};
</script>

<style scoped>
.alocar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.selecao-1 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 50px;
}

.listaSelecionados {
  padding: 10px;
  text-align: left;
  font-weight: bold;
  list-style: none;
  background: #fae9ba;
  height: 200px;
  border-radius: 8px;
  margin-top: 30px;
  margin-right: 50px;
}
</style>
