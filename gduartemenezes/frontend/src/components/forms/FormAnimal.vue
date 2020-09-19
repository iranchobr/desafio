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
        <input
          class="form-input"
          type="text"
          name="dono"
          id="fk_id_pessoa"
          v-model="formAnimal.fk_id_pessoa"
        />
      </div>
      <div class="form-group col-12">
        <label class="col-2 mr-10" for="input-nome">Sexo:</label>
        <b-form-select
          class="col-md-8 ml-10"
          v-model="formAnimal.sexo"
          :options="sexo"
        ></b-form-select>
      </div>
      <div class="form-group col-12">
        <label for="input-email">Data Nascimento:</label>
        <b-form-input
          id="input-5"
          v-model="formAnimal.dt_nascimento"
          type="date"
          required
          placeholder=""
        ></b-form-input>
      </div>

      <button class="btn btn-primary btn-block m-t-10" type="submit">
        Salvar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormAnimal",
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
    };
  },
  methods: {
    addPessoa: function(formAnimal) {
      console.log(formAnimal);
    },
  },
};
</script>

<style scoped>
.FormAnimal {
  display: flex;
  flex-direction: column;
  border: 1px solid #999;
}

.form-group {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

form {
  display: inherit;
  flex-direction: column;
  align-items: flex-end;
  margin: 10px 0;
}

input {
  border-radius: 4px;
  border: 1px solid #ccc;
}

label {
  margin: 0 10px;
}

button {
  margin: 15px 0;
}
</style>
