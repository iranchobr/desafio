<template>
  <div v-show="showModal" class="container">
    <div class="d-flex flex-column align-items-center">
      <h1 class="container__title text-center my-4">Atualizar Animal</h1>
      <router-link class="container__link text-center" to="/">Home</router-link>
    </div>
    <form
      class="d-flex flex-column align-items-center"
      @submit="onUpdateAnimal"
    >
      <input
        v-model="animalData.fk_id_pessoa"
        class="p-1 my-2"
        type="number"
        placeholder="Id da Pessoa"
        required
      />
      <input
        v-model="animalData.id_fazenda"
        class="p-1 my-2"
        type="number"
        placeholder="Id da Fazenda"
        required
      />
      <input
        v-model="animalData.no_animal"
        class="p-1 my-2"
        type="text"
        placeholder="Nome do Animal"
        required
      />
      <input
        v-model="animalData.no_raca"
        class="p-1 my-2"
        type="text"
        placeholder="Nome da Raça"
        required
      />
      <input
        v-model="animalData.vr_peso"
        class="p-1 my-2"
        type="number"
        step="0.01"
        placeholder="Peso"
        required
      />
      <input
        v-model="animalData.dt_nascimento"
        class="p-1 my-2"
        type="date"
        placeholder="Data de nascimento"
        required
      />
      <div class="d-flex justify-content-around">
        <select name="sexo" v-model="animalData.sexo">
          <option value="" disabled hidden selected required>Sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>
      <input class="container__submit p-1 my-2" type="submit" value="Enviar" />
      <button @click="$emit('close-modal')">Sair</button>
    </form>
  </div>
</template>
<script>
import { useToast } from "vue-toastification";
import api from "./../../api/index";

export default {
  name: "ModalAnimalUpdate",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      animalData: {
        fk_id_pessoa: Number,
        id_fazenda: 0,
        no_animal: "",
        no_raca: "",
        sexo: "",
        vr_peso: 0.0,
        dt_nascimento: "",
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
    async onUpdateAnimal(e) {
      e.preventDefault();
      try {
        console.log(this.animalData);
        await api.patch(`/animais/${this.currentId}`, this.animalData);
        this.toast.success("Animal atualizado!");
        this.animalData = {};
      } catch (e) {
        console.log(e);
        this.toast.error("");
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
    font-size: 20px
</style>
