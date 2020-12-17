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
      <div class="grupo col-12">
        <div class="col-8">
          <label class="col-4" for="input-nome">Sexo:</label>
          <b-form-select
            class="col-8"
            v-model="formPessoa.sexo"
            :options="sexo"
          ></b-form-select>
        </div>
        <div class="checkbox col-4">
          <input
            type="checkbox"
            name="ativo"
            id="ativo"
            v-model="formPessoa.ativo"
          />
          <label for="input-ativo">Ativo</label>
        </div>
      </div>
      <button class="btn btn-dark " type="submit">
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
  border-radius: 8px;
  border: 2px solid #ddd;
  background: #f9e4aa;
  margin: 50px;
}

.grupo {
  display: flex;
  align-items: center;
}

.btn {
  margin: 20px auto;
}
</style>
