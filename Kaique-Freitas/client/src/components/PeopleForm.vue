<template>
  <div>
    <b-form @submit="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          placeholder="Digite o nome"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Sexo:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.gender"
          :options="genders"
          required
        ></b-form-select>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>

    <b-card class="mt-3" header="Pessoas cadastradas">
      <pre class="m-0"></pre>
    </b-card>
  </div>
</template>

<script>
import { BForm, BFormGroup, BFormInput, BButton, BCard } from "bootstrap-vue";
export default {
  name: "PeopleForm",
  components: {
    "b-form": BForm,
    "b-form-group": BFormGroup,
    "b-form-input": BFormInput,
    "b-button": BButton,
    "b-card": BCard
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        address: "",
        gender: null,
        ic_active: false
      },
      genders: [
        { text: "Selecione seu sexo", value: null },
        { text: "Masculino", value: "M" },
        { text: "Feminino", value: "F" }
      ]
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      console.log("Form submitted:", this.form);
      alert(JSON.stringify(this.form));
    }
  }
};
</script>

<style scoped></style>
