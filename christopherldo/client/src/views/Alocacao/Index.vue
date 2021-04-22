<template>
  <main class="alocacao">
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
            to="/alocacao/add"
            title="Adicionar Alocação"
          >
            <font-awesome-icon icon="plus" />
          </router-link>
        </div>
        <h1>Lista de Alocações</h1>
        <form>
          <div class="input-group mb-3">
            <input
              v-model="q"
              placeholder="Busque por ID..."
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
              <th scope="col">Animal</th>
              <th scope="col">Lote</th>
              <th scope="col">Entrada</th>
              <th scope="col">Saída</th>
              <th scope="col">Última movimentação</th>
              <th scope="col">Bezerro</th>
              <th scope="col" class="th-actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(alocacao, key) in animalXLoteArray" v-bind:key="key">
              <th scope="row">{{ alocacao.id }}</th>
              <td>
                <router-link v-bind:to="`/animal?q=${alocacao.animal.id}`">
                  {{ alocacao.animal.no_animal }}
                </router-link>
              </td>
              <td>
                <router-link v-bind:to="`/lote?q=${alocacao.lote.id}`">
                  {{ alocacao.lote.no_lote }}
                </router-link>
              </td>
              <td>{{ alocacao.dt_entrada }}</td>
              <td>{{ alocacao.dt_saida }}</td>
              <td>{{ alocacao.dt_ultima_movimentacao }}</td>
              <td v-if="alocacao.ic_bezerro">Sim</td>
              <td v-else>Não</td>
              <td class="td-actions">
                <router-link
                  class="button bg-dark text-white"
                  v-bind:to="`/alocacao/edit/${alocacao.id}`"
                  v-bind:title="`Editar aloacação ${alocacao.id}`"
                >
                  <font-awesome-icon icon="pen" />
                </router-link>
                <a
                  class="button bg-dark"
                  v-on:click="deleteAlocacao(alocacao.id, key)"
                  v-bind:title="`Apagar alocação ${alocacao.id}`"
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
      animalXLoteArray: [],
      loading: true,
      errors: [],
      timer: null,
      getAlocacoesList: async () => {
        this.errors = [];
        this.animalXLoteArray = [];
        this.loading = true;

        try {
          const response = await API.getAlocacoes({ q: this.q });
          this.animalXLoteArray = response.data.animalXLoteArray;
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
    async deleteAlocacao(id, key) {
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
              await API.deleteAlocacao(id);
              this.animalXLoteArray.splice(key, 1);
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
    await this.getAlocacoesList();
  },
  watch: {
    async q() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(this.getAlocacoesList, 500);
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
  },
};
</script>
