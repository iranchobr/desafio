<template>
  <div class="create">
    <h3>Registros</h3>
    <h6>Selecione o tipo de Entidade a ser registrada</h6>
    <b-form-group class="col-md-2">
      <b-form-select
        v-model="form.entidades"
        :options="entidades"
      ></b-form-select>
    </b-form-group>
    <div class="col-md-6" v-if="form.entidades == 'Pessoa'">
      <FormPessoa />
    </div>

    <div class="col-md-6" v-if="form.entidades == 'Animal'">
      <FormAnimal />
    </div>

    <div class="col-md-6" v-if="form.entidades == 'Lote'">
      <FormLote />
    </div>
  </div>
</template>

<script>
import FormPessoa from "../components/forms/FormPesssoa";
import FormAnimal from "../components/forms/FormAnimal";
import FormLote from "../components/forms/FormLote";

export default {
  name: "Create",

  components: {
    FormPessoa,
    FormAnimal,
    FormLote,
  },
  data() {
    return {
      form: {
        entidades: null,
      },

      entidades: [
        { text: "Selecione", value: null },
        "Pessoa",
        "Animal",
        "Lote",
      ],
    };
  },
};
</script>

<style scoped>
.create {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
