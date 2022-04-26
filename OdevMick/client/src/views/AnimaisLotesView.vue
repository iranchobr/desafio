<template>
  <div class="container">
    <div class="d-flex flex-column align-items-center">
      <h1 class="container__title text-center my-4">Cadastrar Animal X Lote</h1>
      <router-link class="container__link text-center" to="/">Home</router-link>
    </div>
    <form
      class="d-flex flex-column align-items-center"
      @submit="onCreateAnimalLote"
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
        name="entrada"
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
          required
        />
      </div>
      <input class="container__submit p-2 my-2" type="submit" value="Enviar" />
    </form>
    <div class="container__animais-lotes">
      <AnimalLoteCard
        :animalLote="animalLote"
        :key="animalLote.id"
        v-for="animalLote in animaisLotesList"
        @on-delete-click="onDeleteAnimalLote(animalLote.id)"
        @on-update-click="updateAnimalLote(animalLote.id)"
      />
      <AnimalLoteModalUpdate
        @close-modal="onCloseModal"
        @animal-updated="fetchAnimaisLotes"
        :currentId="currentId"
        :showModal="showModal"
      />
    </div>
  </div>
</template>
<script>
import { useToast } from "vue-toastification";
import AnimalLoteCard from "./../components/AnimalLoteCard.vue";
import AnimalLoteModalUpdate from "./../components/modals/AnimalLoteModalUpdate.vue";
import api from "./../api/index";
export default {
  components: { AnimalLoteCard, AnimalLoteModalUpdate },
  name: "AnimaisLotesComp",
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
      currentId: 0,
      animaisLotesList: [],
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
  methods: {
    onCloseModal() {
      this.showModal = false;
    },
    async fetchAnimaisLotes() {
      try {
        const animaisLotes = await api.get("/animais_lotes");
        this.animaisLotesList = [...animaisLotes.data];
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    async onCreateAnimalLote(e) {
      e.preventDefault();
      try {
        const res = await api.post("/animais_lotes", this.animalLoteData);
        this.animaisLotesList.push(res.data);
        this.toast.success("Animal Lote adicionado!");
        this.animalLoteData = {};
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    async onDeleteAnimalLote(id) {
      try {
        await api.delete(`/animais_lotes/${id}`);
        this.animaisLotesList = this.animaisLotesList.filter(
          (animalLote) => animalLote.id !== id
        );
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    updateAnimalLote(id) {
      this.currentId = id;
      this.showModal = true;
    },
  },
  mounted() {
    this.fetchAnimaisLotes();
  },
  watch: {
    animaisList() {
      this.fetchAnimaisLotes();
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
  &__animais-lotes
    display: flex
    flex-direction: column
    align-items: center
@media screen and (min-width: $breakpoint-sm)
  .container
    &__title
      font-size: 26px
</style>
