<template>
  <main class="animal">
    <div class="container">
      <div class="top--actions">
        <div class="buttons-area">
          <router-link
            class="button bg-warning text-dark"
            to="/"
            title="Voltar para a Home"
          >
            <font-awesome-icon icon="home" />
          </router-link>
          <router-link
            class="button bg-success text-white"
            to="/animal/add"
            title="Adicionar animal"
          >
            <font-awesome-icon icon="plus" />
          </router-link>
        </div>
        <h1>Lista de Animais</h1>
        <form>
          <div class="input-group mb-3">
            <input
              v-model="q"
              placeholder="Faça uma busca..."
              type="text"
              class="form-control"
              name="q"
            />
          </div>
        </form>
      </div>
      <ul v-if="errors.length > 0" class="alert alert-danger" role="alert">
        <div v-for="(error, key) in errors" v-bind:key="key">
          {{ error.msg }}
        </div>
      </ul>
      <div v-if="loading" class="loading">Carregando...</div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nome</th>
              <th scope="col">Raça</th>
              <th scope="col">Sexo</th>
              <th scope="col">Massa</th>
              <th scope="col">Idade</th>
              <th scope="col">Dono</th>
              <th scope="col" class="th-actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(animal, key) in animalArrayComputed" v-bind:key="key">
              <th scope="row">{{ animal.id }}</th>
              <td>{{ animal.no_animal }}</td>
              <td>{{ animal.no_raca }}</td>
              <td>{{ animal.sexo }}</td>
              <td>{{ animal.vr_peso }}</td>
              <td>{{ animal.idade }}</td>
              <td>
                <router-link v-bind:to="`/pessoa?q=${animal.pessoa.id}`">
                  {{ animal.pessoa.no_pessoa }}
                </router-link>
              </td>
              <td class="td-actions">
                <router-link
                  class="button bg-dark text-white"
                  v-bind:to="`/animal/edit/${animal.id}`"
                  v-bind:title="`Editar ${animal.no_animal}`"
                >
                  <font-awesome-icon icon="pen" />
                </router-link>
                <a
                  class="button bg-dark"
                  v-on:click="deleteAnimal(animal.id, key)"
                  v-bind:title="`Apagar ${animal.no_animal}`"
                >
                  <font-awesome-icon icon="trash" class="text-white" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import API from "../../helpers/api";
export default {
  data() {
    return {
      animalArray: [],
      loading: true,
      errors: [],
      timer: null,
      getAnimaisList: async () => {
        this.errors = [];
        this.animalArray = [];
        this.loading = true;

        try {
          const response = await API.getAnimais({ q: this.q });
          this.animalArray = response.data.animalArray;
        } catch (e) {
          if (e.response) {
            if (e.response.data.error) {
              for (let err in e.response.data.error) {
                this.errors.push(e.response.data.error[err]);
              }
            }
          } else {
            const errorObject = {
              msg: e.message,
            };
            this.errors.push(errorObject);
          }
        }

        this.loading = false;
      },
    };
  },
  methods: {
    async deleteAnimal(id, key) {
      this.errors = [];

      this.$swal
        .fire({
          title: "Você tem certeza?",
          text: "Isso não pode ser desfeito",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, deletar",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              await API.deleteAnimal(id);
              this.animalArray.splice(key, 1);
              this.$swal.fire(
                "Deletado!",
                "O registro foi deletado.",
                "success"
              );
            } catch (e) {
              this.$swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocorreu um erro",
              });
              if (e.response) {
                if (e.response.data.error) {
                  for (let err in e.response.data.error) {
                    this.errors.push(e.response.data.error[err]);
                  }
                }
              } else {
                const errorObject = {
                  msg: e.message,
                };
                this.errors.push(errorObject);
              }
            }
          }
        });
    },
  },
  async mounted() {
    await this.getAnimaisList();
  },
  watch: {
    async q() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(this.getAnimaisList, 500);
    },
  },
  computed: {
    q: {
      get() {
        return this.$route.query.q;
      },
      set(q) {
        this.$router.push({ query: { q } });
      },
    },
    animalArrayComputed() {
      return this.animalArray.map((animal) => {
        const birthYear = new Date(animal.dt_nascimento).getFullYear();
        const todaysYear = new Date().getFullYear();
        const age = todaysYear - birthYear;
        return {
          ...animal,
          idade: age,
        };
      });
    },
  },
};
</script>
