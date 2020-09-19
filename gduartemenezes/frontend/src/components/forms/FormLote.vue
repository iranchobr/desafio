<template>
  <div class="FormLote col-12">
    <form @submit.prevent="addPessoa(formLote)">
      <div class="form-group">
        <label for="input-nome">Nome:</label>
        <input
          class="form-input"
          type="text"
          name="nome"
          id="no_lote"
          placeholder="Nome do lote"
          v-model="formLote.no_lote"
        />
      </div>
      <div class="form-group">
        <label for="input-lote">Descrição:</label>
        <input
          class="form-input"
          type="text"
          name="lote"
          id="ds_lote"
          placeholder="Descrição"
          v-model="formLote.ds_lote"
        />
      </div>
      <button class="btn btn-primary btn-block m-t-10" type="submit">
        Salvar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormLote",
  data() {
    return {
      formLote: {
        no_lote: undefined,
        ds_lote: "",
      },
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
.FormLote {
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
  justify-content: flex-end;
}
</style>
