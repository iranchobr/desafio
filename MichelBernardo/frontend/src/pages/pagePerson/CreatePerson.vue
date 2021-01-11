<template>
  <div>
    <TheNavbar />
    <div class="main">
      <TheAlert :dismissCountDown="dismissCountDown" />
      <div class="input-box">
        <b-card bg-variant="light">
          <b-form-group
            label-cols-lg="3"
            label="Cadastro de pessoas"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label="Nome:"
              label-for="nome"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="nome"
                type="text"
                placeholder="Nome completo"
                v-model="form.name"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="E-mail:"
              label-for="email"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="email"
                type="email"
                placeholder="exemplo@exemplo.com"
                v-model="form.email"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Endereço:"
              label-for="endereco"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="endereco"
                type="text"
                placeholder="Endereço completo"
                v-model="form.address"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Sexo:"
              label-cols-sm="3"
              label-align-sm="right"
              class="mb-0"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-radio-group
                class="pt-2"
                :options="['M', 'F']"
                :aria-describedby="ariaDescribedby"
                v-model="form.gender"
              ></b-form-radio-group>
            </b-form-group>

            <b-form-group
              label="IC Ativo:"
              label-cols-sm="3"
              label-align-sm="right"
              class="mb-0"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-radio-group
                class="pt-2"
                :aria-describedby="ariaDescribedby"
                v-model="form.active"
              >
                <b-form-radio
                  v-model="form.active"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="true"
                  >Sim</b-form-radio
                >
                <b-form-radio
                  v-model="form.active"
                  :aria-describedby="ariaDescribedby"
                  name="some-radios"
                  value="false"
                  >Não</b-form-radio
                >
              </b-form-radio-group>
            </b-form-group>
          </b-form-group>
        </b-card>
      </div>
      <div class="d-flex justify-content-around">
        <b-button variant="dark" size="lg" @click="addPerson"
          >Cadastrar</b-button
        >
        <BackButton />
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import BackButton from "@/components/TheGoBackButton";
import TheAlert from "@/components/TheAlert";
import api from "@/services/api";
export default {
  components: {
    TheNavbar,
    BackButton,
    TheAlert,
  },
  data: () => ({
    form: {
      name: "",
      email: "",
      address: "",
      gender: "M",
      active: true,
    },
    dismissCountDown: 0,
  }),
  methods: {
    addPerson() {
      const form = {
        no_pessoa: this.form.name,
        no_email: this.form.email,
        endereco: this.form.address,
        sexo: this.form.gender,
        ic_ativo: this.form.active,
      };

      api.post("/people", form).then(
        () => {
          this.form = {
            name: "",
            email: "",
            address: "",
            gender: "M",
            active: true,
          };
          this.dismissCountDown = 3;
        },
        (err) => console.log(err)
      );
    },
  },
};
</script>

<style scoped>
</style>