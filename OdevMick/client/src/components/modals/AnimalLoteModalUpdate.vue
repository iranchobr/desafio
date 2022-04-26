<template>
  <div v-show="showModal" class="container">
    <h1 class="container__title text-center my-4">Atualizar Pessoa</h1>
    <form
      class="d-flex flex-column align-items-center"
      @submit="onUpdateAnimalLote"
    >
      <input
        v-model="animalLoteData.fk_id_animal"
        class="p-2 my-2"
        type="number"
        placeholder="Id do Animal"
        required
      />
      <input
        v-model="animalLoteData.fk_id_lote"
        class="p-2 my-2"
        type="number"
        placeholder="Id do Lote"
        required
      />
      <label for="entrada">Data Entrada</label>
      <input
        v-model="animalLoteData.dt_entrada"
        class="p-2 my-2"
        type="date"
        placeholder="Data Entrada"
        required
      />
      <label for="saida">Data Saida</label>
      <input
        name="saida"
        v-model="animalLoteData.dt_saida"
        class="p-2 my-2"
        type="date"
        required
      />
      <label for="movimentacao">Data Ultima Movimentação</label>
      <input
        name="movimentacao"
        v-model="animalLoteData.dt_ultima_movimentacao"
        class="p-2 my-2"
        type="date"
        required
      />
      <div class="mx-4 d-flex align-items-center">
        <label class="mx-2" for="ativo">Ativo</label>
        <input
          type="checkbox"
          name="ativo"
          v-model="animalLoteData.ic_bezerro"
        />
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
  name: "ModalAnimalLotelUpdate",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      animalLoteData: {
        fk_id_animal: 0,
        fk_id_lote: 0,
        dt_entrada: "",
        dt_saida: "",
        dt_ultima_movimentacao: "",
        ic_bezerro: false,
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
    async onUpdateAnimalLote(e) {
      e.preventDefault();
      try {
        await api.patch(
          `/animais_lotes/${this.currentId}`,
          this.animalLoteData
        );
        this.toast.success("Animal Lote atualizado!");
        this.animalLoteData = {};
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
<style lang="sass" scoped>
form
  label
    color: white
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
