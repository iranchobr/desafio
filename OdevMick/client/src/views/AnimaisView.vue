<template>
  <div class="container">
    <div class="d-flex flex-column align-items-center">
      <h1 class="container__title text-center my-4">Cadastrar Animal</h1>
      <router-link class="container__link text-center" to="/">Home</router-link>
    </div>
    <form
      class="d-flex flex-column align-items-center"
      @submit="onCreateAnimal"
    >
      <input
        v-model="animalData.fk_id_pessoa"
        class="p-2 my-2"
        type="number"
        placeholder="Id da Pessoa"
        required
      />
      <input
        v-model="animalData.id_fazenda"
        class="p-2 my-2"
        type="number"
        placeholder="Id da Fazenda"
        required
      />
      <input
        v-model="animalData.no_animal"
        class="p-2 my-2"
        type="text"
        placeholder="Nome do Animal"
        required
      />
      <input
        v-model="animalData.no_raca"
        class="p-2 my-2"
        type="text"
        placeholder="Nome da Raça"
        required
      />
      <input
        v-model="animalData.vr_peso"
        class="p-2 my-2"
        type="number"
        step="0.01"
        placeholder="Peso"
        required
      />
      <label for="nascimento">Data Nascimento</label>
      <input
        name="nascimento"
        v-model="animalData.dt_nascimento"
        class="p-2 my-2"
        type="date"
        required
      />
      <div class="d-flex justify-content-around">
        <select name="sexo" v-model="animalData.sexo" required>
          <option value="" disabled hidden selected>Sexo</option>
          <option value="M">Masculino</option>
          <option value="F">Feminino</option>
        </select>
      </div>
      <input class="container__submit p-2 my-2" type="submit" value="Enviar" />
    </form>
    <div class="container__animais">
      <AnimalCard
        :animal="animal"
        :key="animal.id"
        v-for="animal in animaisList"
        @on-delete-click="onDeleteAnimal(animal.id)"
        @on-update-click="updateAnimal(animal.id)"
      />
      <AnimalModalUpdate
        @close-modal="onCloseModal"
        @animal-updated="fetchAnimais"
        :currentId="currentId"
        :showModal="showModal"
      />
    </div>
  </div>
</template>
<script>
import { useToast } from "vue-toastification";
import AnimalCard from "./../components/AnimalCard.vue";
import AnimalModalUpdate from "./../components/modals/AnimalModalUpdate.vue";
import api from "./../api/index";
export default {
  components: { AnimalCard, AnimalModalUpdate },
  name: "AnimaisComp",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
      currentId: 0,
      animaisList: [],
      animalData: {
        fk_id_pessoa: "",
        id_fazenda: "",
        no_animal: "",
        no_raca: "",
        sexo: "",
        vr_peso: "",
        dt_nascimento: "",
      },
    };
  },
  methods: {
    onCloseModal() {
      this.showModal = false;
    },
    async fetchAnimais() {
      try {
        const animais = await api.get("/animais");
        this.animaisList = [...animais.data];
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    async onCreateAnimal(e) {
      e.preventDefault();
      if (!this.animalData.sexo) {
        this.toast.info("Selecione o sexo");
        return;
      }
      try {
        const res = await api.post("/animais", this.animalData);
        this.animaisList.push(res.data);
        this.toast.success("Animal adicionado!");
        this.animalData = {};
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    async onDeleteAnimal(id) {
      try {
        await api.delete(`/animais/${id}`);
        this.animaisList = this.animaisList.filter(
          (animal) => animal.id !== id
        );
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    updateAnimal(id) {
      this.currentId = id;
      this.showModal = true;
    },
  },
  mounted() {
    this.fetchAnimais();
  },
  watch: {
    animaisList() {
      this.fetchAnimais();
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
  &__animais
    display: flex
    flex-direction: column
    align-items: center
@media screen and (min-width: $breakpoint-sm)
  .container
    &__title
      font-size: 26px
</style>
