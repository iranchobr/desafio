<template>
  <div v-show="showModal" class="container">
    <h1 class="container__title text-center my-4">Atualizar Lote</h1>
    <form class="d-flex flex-column align-items-center" @submit="onUpdateLote">
      <input
        v-model="loteData.no_lote"
        class="p-2 my-2"
        type="text"
        placeholder="Nome lote"
      />
      <input
        v-model="loteData.ds_lote"
        class="p-2 my-2"
        type="text"
        placeholder="Descrição"
      />
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
  name: "ModalLoteUpdate",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      loteData: {
        no_lote: "",
        ds_lote: "",
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
    async onUpdateLote(e) {
      e.preventDefault();
      try {
        await api.patch(`/lotes/${this.currentId}`, this.loteData);
        this.toast.success("Lote atualizada!");
        this.loteData = {};
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
