<template>
  <div class="FormAnimal col-md">
    <form @submit.prevent="addPessoa(formAnimal)">
      <div class="form-group col-12">
        <label for="input-nome">Nome:</label>
        <input
          class="form-input"
          type="text"
          name="nome"
          id="no_animal"
          v-model="formAnimal.no_animal"
        />
      </div>
      <div class="form-group col-12">
        <label for="input-email">Raça:</label>
        <input
          class="form-input"
          type="text"
          name="raça"
          id="no_raca"
          v-model="formAnimal.no_raca"
        />
      </div>
      <div class="form-group col-12">
        <label for="input-email">Peso:</label>
        <input
          class="form-input"
          type="text"
          name="peso"
          id="vr_pesp"
          v-model="formAnimal.vr_peso"
        />
      </div>
      <div class="form-group col-12">
        <label for="input-email">Dono:</label>
        <div class="helper">
          <input
            class="form-input"
            type="text"
            name="dono"
            id="fk_id_pessoa"
            readOnly
            v-model="pessoa.no_nome"
          />
          <small>Selecione na tabela abaixo</small>
        </div>

        <div>
          <button
            type="button"
            @click="showTable = !showTable"
            class="btn btn-outline-dark"
          >
            Carregar Pessoas
          </button>
        </div>
      </div>
      <div class="form-group col-12">
        <label for="input-nome">Sexo:</label>
        <b-form-select
          class="col-md-4"
          v-model="formAnimal.sexo"
          :options="sexo"
        ></b-form-select>
      </div>
      <div class="form-group col-12">
        <label for="input-email">Data Nasc.:</label>
        <b-form-input
          id="input-5"
          v-model="formAnimal.dt_nascimento"
          type="date"
          required
          class="date"
          placeholder=""
        ></b-form-input>
      </div>

      <button class="btn sub btn-primary" type="submit">
        Salvar
      </button>
    </form>
    <div v-if="showTable == true">
      <TablePessoas @pessoa-sel="getSelecionado" />
    </div>
  </div>
</template>

<script>
import TablePessoas from "../tables/TablePessoas";
export default {
  name: "FormAnimal",
  components: {
    TablePessoas,
  },
  data() {
    return {
      formAnimal: {
        no_animal: undefined,
        no_raca: "",
        vr_peso: undefined,
        sexo: "",
        dt_nascimento: "",
        fk_id_pessoa: "",
      },
      sexo: [{ text: "Selecione", value: "" }, "M", "F"],
      pessoa: {},
      showTable: false,
    };
  },
  methods: {
    addPessoa: function(formAnimal) {
      console.log(formAnimal);
    },
    getSelecionado(value) {
      this.pessoa = value;
      console.log(this.pessoa);
    },
    showTb() {
      return (this.showTable = true);
    },
  },
};
</script>

<style scoped>
.FormAnimal {
  display: flex;
  flex-direction: column;
}

.form-group {
  display: flex;
  flex-direction: row;
  float: left;
  align-items: center;
}

.btn {
  width: 120px;
  height: 30px;
  font-size: 10px;
  font-weight: bold;
  margin: 10px -15px 30px 10px;
}

.sub {
  width: 240px;
  height: 40px;
  font-size: 16px;
}
.date {
  width: 200px;
}
.helper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

form {
  display: inherit;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
  padding: 5px;
  border-radius: 8px;
  border: 1px solid #eee;
}

input {
  border-radius: 4px;
  border: 1px solid #ccc;
}

label {
  margin: 0 10px;
}
</style>
