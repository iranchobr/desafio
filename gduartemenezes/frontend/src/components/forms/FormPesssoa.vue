<template>
  <div class="FormPessoa">
    <form @submit.prevent="addPessoa(formPessoa)">
      <div class="form-group">
        <label for="input-nome">Nome:</label>
        <input
          class="form-input"
          type="text"
          name="nome"
          id="no_pessoa"
          v-model="formPessoa.no_pessoa"
        />
      </div>
      <div class="form-group">
        <label for="input-email">Email:</label>
        <input
          class="form-input"
          type="email"
          name="email"
          id="no_email"
          v-model="formPessoa.no_email"
        />
      </div>
      <div class="form-group">
        <label for="input-endereco">Endereço:</label>
        <input
          class="form-input"
          type="text"
          id="no_endereco"
          v-model="formPessoa.endereco"
        />
      </div>
      <div class="grupo">
        <div>
          <label class="col-md-4" for="input-nome">Sexo:</label>
          <b-form-select
            class="col-md-8"
            v-model="formPessoa.sexo"
            :options="sexo"
          ></b-form-select>
        </div>
        <div class="checkbox">
          <input
            type="checkbox"
            name="ativo"
            id="ativo"
            v-model="formPessoa.ativo"
          />
          <label for="input-ativo">Ativo</label>
        </div>
      </div>
      <button class="btn btn-primary btn-block m-t-10" type="submit">
        Salvar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormPessoa",
  data() {
    return {
      formPessoa: {
        no_pessoa: undefined,
        no_email: "",
        endereco: "",
        sexo: "",
        ativo: undefined,
      },
      sexo: [{ text: "Selecione", value: "" }, "M", "F"],
    };
  },
  methods: {
    addPessoa: function(formPessoa) {
      console.log(formPessoa);
    },
  },
};
</script>

<style scoped>
.FormPessoa {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #999;
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
.grupo {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
</style>
