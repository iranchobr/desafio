<template>
  <div class="container">
    <div class="d-flex flex-column align-items-center">
      <h1 class="container__title text-center my-4">Cadastrar Pessoa</h1>
      <router-link class="container__link text-center" to="/">Home</router-link>
    </div>
    <form
      class="d-flex flex-column align-items-center"
      @submit="onCreatePessoa"
    >
      <input
        v-model="pessoaData.no_pessoa"
        class="p-2 my-2"
        type="text"
        placeholder="Nome"
        required
      />
      <input
        v-model="pessoaData.no_email"
        class="p-2 my-2"
        type="text"
        placeholder="Email"
        required
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
      <input class="container__submit p-2 my-2" type="submit" value="Enviar" />
    </form>
    <div class="container__pessoas">
      <PessoaCard
        :pessoa="pessoa"
        :key="pessoa.id"
        v-for="pessoa in pessoasList"
        @on-delete-click="onDeletePessoa(pessoa.id)"
        @on-update-click="updatePessoa(pessoa.id)"
      />
      <PessoaModalUpdate
        @close-modal="onCloseModal"
        @pessoa-updated="fetchPessoas"
        :currentId="currentId"
        :showModal="showModal"
      />
    </div>
  </div>
</template>
<script>
import { useToast } from "vue-toastification";
import PessoaCard from "./../components/PessoaCard.vue";
import PessoaModalUpdate from "./../components/modals/PessoaModalUpdate.vue";
import api from "./../api/index";
export default {
  components: { PessoaCard, PessoaModalUpdate },
  name: "PessoasComp",
  setup() {
    // Get toast interface
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
      currentId: 0,
      pessoasList: [],
      pessoaData: {
        no_pessoa: "",
        no_email: "",
        endereco: "",
        sexo: "",
        ic_ativo: false,
      },
    };
  },
  methods: {
    onCloseModal() {
      this.showModal = false;
      this.$toast.clear();
    },
    async fetchPessoas() {
      try {
        const pessoas = await api.get("/pessoas");
        this.pessoasList = [...pessoas.data];
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    async onCreatePessoa(e) {
      e.preventDefault();
      if (!this.pessoaData.sexo) {
        this.toast.info("Selecione o sexo");
        return;
      }
      try {
        const res = await api.post("/pessoas", this.pessoaData);
        this.pessoasList.push(res.data);
        this.toast.success("Pessoa adicionada!");
        this.pessoaData = {};
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    async onDeletePessoa(id) {
      try {
        await api.delete(`/pessoas/${id}`);
        this.pessoasList = this.pessoasList.filter(
          (pessoa) => pessoa.id !== id
        );
      } catch (e) {
        this.toast.error(e.response.data.error);
      }
    },
    updatePessoa(id) {
      this.currentId = id;
      this.showModal = true;
    },
  },
  mounted() {
    this.fetchPessoas();
  },
  watch: {
    pessoasList() {
      this.fetchPessoas();
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
  &__pessoas
    display: flex
    flex-direction: column
    align-items: center
@media screen and (min-width: $breakpoint-sm)
  .container
    &__title
      font-size: 26px
</style>
