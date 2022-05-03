<template>
  <div v-show="showModal" class="container">
    <h1 class="container__title text-center my-4">Atualizar Pessoa</h1>
    <form
      class="d-flex flex-column align-items-center"
      @submit="onUpdatePessoa"
    >
      <input
        v-model="pessoaData.no_pessoa"
        class="p-2 my-2"
        type="text"
        placeholder="Nome"
      />
      <input
        v-model="pessoaData.no_email"
        class="p-2 my-2"
        type="text"
        placeholder="Email"
      />
      <input
        v-model="pessoaData.endereco"
        class="p-2 my-2"
        type="text"
        placeholder="Endereço"
      />
      <div class="d-flex justify-content-around">
        <select name="sexo" v-model="pessoaData.sexo">
          <option value="" disabled hidden selected>Sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
        <div class="mx-4 d-flex align-items-center">
          <label class="mx-2" for="ativo">Ativo</label>
          <input type="checkbox" name="ativo" v-model="pessoaData.ic_ativo" />
        </div>
      </div>
      <input
        class="container__submit p-2 my-2"
        type="submit"
        value="Atualizar"
      />
      <button @click="$emit('close-modal')">Sair</button>
    </form>
  </div>
</template>
<script>
import { useToast } from "vue-toastification";
import api from "./../../api/index";

export default {
  name: "ModalPessoalUpdate",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      pessoaData: {
        no_pessoa: "",
        no_email: "",
        endereco: "",
        sexo: "",
        ic_ativo: false,
      },
    };
  },
  props: {
    currentId: {
      type: Number,
      default: 0,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    async onUpdatePessoa(e) {
      e.preventDefault();
      try {
        await api.patch(`/pessoas/${this.currentId}`, this.pessoaData);
        this.toast.success("Pessoa atualizada!");
        this.pessoaData = {};
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="sass" scoped>
.container
  position: fixed
  top: 50%
  left: 50%
  transform: translate(-50%, -50%)
  background-color: #424923
  width: 300px
  &__title
    color: white
</style>
