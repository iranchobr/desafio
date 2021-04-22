<template>
  <main class="lote">
    <div class="container">
      <div class="top--actions">
        <router-link
          class="button bg-primary text-light"
          to="/lote"
          title="Voltar para a Home"
        >
          <font-awesome-icon icon="angle-left" />
        </router-link>
        <h1>Editar Lote</h1>
      </div>
      <ul v-if="errors.length > 0" class="alert alert-danger" role="alert">
        <div v-for="(error, key) in errors" v-bind:key="key">
          {{ error.msg }}
        </div>
      </ul>
      <form v-on:submit.prevent="editLote">
        <hr />
        <span>ID: {{ id }}</span>
        <div class="form-row">
          <div class="col form-group">
            <label for="no_lote">Nome:</label>
            <input
              v-model="no_lote"
              required
              type="text"
              class="form-control"
              id="no_lote"
              name="no_lote"
              placeholder="Insira o nome"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col form-group">
            <label for="ds_lote">Descrição:</label>
            <input
              v-model="ds_lote"
              required
              type="text"
              class="form-control"
              id="ds_lote"
              name="ds_lote"
              placeholder="Insira a descrição"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Salvar</button>
      </form>
    </div>
  </main>
</template>

<script>
import API from "../../helpers/api";
export default {
  data() {
    return {
      errors: [],
      id: this.$route.params.id,
      no_lote: "",
      ds_lote: "",
      getLoteById: async () => {
        this.errors = [];

        try {
          const response = await API.getLoteById(this.id);
          this.no_lote = response.data.animalLote.no_lote;
          this.ds_lote = response.data.animalLote.ds_lote;
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
    };
  },
  methods: {
    async editLote() {
      this.errors = [];
      try {
        await API.editLote(this.id, {
          no_lote: this.no_lote,
          ds_lote: this.ds_lote,
        });
        this.$router.push({ name: "Lote" });
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
  },
  async mounted() {
    await this.getLoteById();
  },
};
</script>

<style lang="scss" scoped>
.lote {
  display: flex;

  .container {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;

    .top--actions {
      display: flex;

      h1 {
        margin: auto;
        margin-top: 0;
        font-size: 26px;
        line-height: 50px;
      }

      .button {
        height: 50px;
        width: 50px;
        line-height: 50px;
        font-size: 25px;
        margin: 0 10px 20px 0;
      }

      form {
        margin-left: auto;
        height: 50px;

        .input-group,
        input {
          height: 100%;
        }
      }
    }

    .button {
      display: block;
      height: 40px;
      width: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
    }

    th,
    td {
      padding-top: 0;
      padding-bottom: 0;
      height: 60px;
      line-height: 60px;

      &.th-actions {
        width: 175px;
      }

      &.td-actions {
        display: flex;
        align-items: center;

        a {
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
