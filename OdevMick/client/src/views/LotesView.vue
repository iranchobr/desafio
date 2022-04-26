<template>
  <div class="container">
    <div class="d-flex flex-column align-items-center">
      <h1 class="container__title text-center my-4">Cadastrar Lote</h1>
      <router-link class="container__link text-center" to="/">Home</router-link>
    </div>
    <form class="d-flex flex-column align-items-center" @submit="onCreateLote">
      <input
        v-model="loteData.no_lote"
        class="p-2 my-2"
        type="text"
        placeholder="Nome lote"
        required
      />
      <input
        v-model="loteData.ds_lote"
        class="p-2 my-2"
        type="text"
        placeholder="Descrição"
        required
      />
      <input class="container__submit p-2 my-2" type="submit" value="Enviar" />
    </form>
    <div class="container__lotes">
      <LoteCard
        :lote="lote"
        :key="lote.id"
        v-for="lote in lotesList"
        @on-delete-click="onDeleteLote(lote.id)"
        @on-update-click="updateLote(lote.id)"
      />
    </div>
    <LoteModalUpdate
      @close-modal="onCloseModal"
      @lote-updated="fetchLotes"
      :currentId="currentId"
      :showModal="showModal"
    />
  </div>
</template>
<script>
import { useToast } from "vue-toastification";
import LoteCard from "./../components/LoteCard.vue";
import LoteModalUpdate from "./../components/modals/LoteModalUpdate.vue";
import api from "./../api/index";
export default {
  components: { LoteCard, LoteModalUpdate },
  name: "LotesComp",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
      currentId: 0,
      lotesList: [],
      loteData: {
        no_lote: "",
        ds_lote: "",
      },
    };
  },
  methods: {
    onCloseModal() {
      this.showModal = false;
      this.$toast.clear();
    },
    async fetchLotes() {
      try {
        const lotes = await api.get("/lotes");
        this.lotesList = [...lotes.data];
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    async onCreateLote(e) {
      e.preventDefault();
      try {
        const res = await api.post("/lotes", this.loteData);
        this.lotesList.push(res.data);
        this.toast.success("Lote adicionado!");
        this.loteData = {};
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    async onDeleteLote(id) {
      try {
        await api.delete(`/lotes/${id}`);
        this.lotesList = this.lotesList.filter((lote) => lote.id !== id);
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    updateLote(id) {
      this.currentId = id;
      this.showModal = true;
    },
  },
  mounted() {
    this.fetchLotes();
  },
  watch: {
    lotesList() {
      this.fetchLotes();
    },
  },
};
</script>
<style lang="sass" scoped>
$breakpoint-sm: 960px

.container
  &__title
    font-size: 16px
  &__submit
    width: 120px
    border: none
    background-color: #424923
    color: white
    &:hover
      background: transparent
      color: #424923
      outline: 2px solid #424923
  &__lotes
    display: flex
    flex-direction: column
    align-items: center
@media screen and (min-width: $breakpoint-sm)
  .container
    &__title
      font-size: 26px
</style>
