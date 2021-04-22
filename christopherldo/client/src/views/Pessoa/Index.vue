<template>
  <main class="pessoa">
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
            to="/pessoa/add"
            title="Adicionar pessoa"
          >
            <font-awesome-icon icon="plus" />
          </router-link>
        </div>
        <h1>Lista de Pessoas</h1>
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
              <th scope="col">E-mail</th>
              <th scope="col" class="th-actions">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pessoa, key) in pessoaArray" v-bind:key="key">
              <th scope="row">{{ pessoa.id }}</th>
              <td>{{ pessoa.no_pessoa }}</td>
              <td>{{ pessoa.no_email }}</td>
              <td class="td-actions">
                <a
                  v-on:click="togglePessoaActive(pessoa.id, key)"
                  class="button bg-dark"
                  title="Ativar/Desativar"
                >
                  <font-awesome-icon
                    v-if="pessoa.ic_ativo"
                    icon="power-off"
                    class="text-white"
                  />
                  <font-awesome-icon
                    v-else
                    icon="power-off"
                    class="text-secondary"
                  />
                </a>
                <router-link
                  class="button bg-dark text-white"
                  v-bind:to="`/pessoa/edit/${pessoa.id}`"
                  v-bind:title="`Editar ${pessoa.no_pessoa}`"
                >
                  <font-awesome-icon icon="pen" />
                </router-link>
                <a
                  class="button bg-dark"
                  href="#"
                  v-on:click="deletePessoa(pessoa.id, key)"
                  v-bind:title="`Apagar ${pessoa.no_pessoa}`"
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
      pessoaArray: [],
      loading: true,
      errors: [],
      timer: null,
      getPessoasList: async () => {
        this.errors = [];
        this.pessoaArray = [];
        this.loading = true;

        try {
          const response = await API.getPessoas({ q: this.q });
          this.pessoaArray = response.data.pessoaArray;
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
    async togglePessoaActive(id, key) {
      this.errors = [];
      try {
        const response = await API.togglePessoaActive(id);
        this.pessoaArray[key].ic_ativo = response.data.pessoa.ic_ativo;
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
    },
    async deletePessoa(id, key) {
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
              await API.deletePessoa(id);
              this.pessoaArray.splice(key, 1);
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
    await this.getPessoasList();
  },
  watch: {
    async q() {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(this.getPessoasList, 500);
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
