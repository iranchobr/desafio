<template>
  <main class="alocacao">
    <div class="container">
      <div class="top--actions">
        <router-link
          class="button bg-primary text-light"
          to="/alocacao"
          title="Voltar para a Home"
        >
          <font-awesome-icon icon="angle-left" />
        </router-link>
        <h1>Alocar o Animal ao Lote</h1>
      </div>
      <ul v-if="errors.length > 0" class="alert alert-danger" role="alert">
        <div v-for="(error, key) in errors" v-bind:key="key">
          {{ error.msg }}
        </div>
      </ul>
      <form v-on:submit.prevent="addAlocacao">
        <hr />
        <div class="form-row">
          <div class="col form-group">
            <label for="fk_id_animal">Animal:</label>
            <select
              v-model="fk_id_animal"
              class="form-select form-control"
              aria-label="Default select example"
              required
            >
              <option selected></option>
              <option
                v-for="(animal, key) in animalArray"
                v-bind:value="animal.id"
                v-bind:key="key"
              >
                {{ animal.id }} - {{ animal.no_animal }}
              </option>
            </select>
          </div>
          <div class="col form-group">
            <label for="fk_id_lote">Lote:</label>
            <select
              v-model="fk_id_lote"
              class="form-select form-control"
              aria-label="Default select example"
              required
            >
              <option selected></option>
              <option
                v-for="(lote, key) in loteArray"
                v-bind:value="lote.id"
                v-bind:key="key"
              >
                {{ lote.id }} - {{ lote.no_lote }}
              </option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="col form-group">
            <label for="dt_entrada">Data de entrada:</label>
            <input
              v-model="dt_entrada"
              required
              type="date"
              class="form-control"
              id="dt_entrada"
              name="dt_entrada"
            />
          </div>
          <div class="col form-group">
            <label for="dt_saida">Data de saída:</label>
            <input
              v-model="dt_saida"
              required
              type="date"
              class="form-control"
              id="dt_saida"
              name="dt_saida"
            />
          </div>
        </div>
        <div class="form-group form-check">
          <input
            v-model="ic_bezerro"
            type="checkbox"
            class="form-check-input"
            id="ic_bezerro"
            name="ic_bezerro"
            checked
          />
          <label class="form-check-label" for="ic_bezerro">Bezerro</label>
        </div>
        <button type="submit" class="btn btn-primary mt-3">Alocar</button>
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
      animalArray: [],
      loteArray: [],
      fk_id_animal: "",
      fk_id_lote: "",
      dt_entrada: "",
      dt_saida: "",
      ic_bezerro: false,
      getAnimaisList: async () => {
        this.errors = [];
        this.animalArray = [];

        try {
          const response = await API.getAnimais();
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
      },
      getLotesList: async () => {
        this.errors = [];
        this.loteArray = [];

        try {
          const response = await API.getLotes();
          this.loteArray = response.data.animalLoteArray;
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
    async addAlocacao() {
      this.errors = [];
      try {
        await API.addAlocacao({
          fk_id_animal: this.fk_id_animal,
          fk_id_lote: this.fk_id_lote,
          dt_entrada: this.dt_entrada,
          dt_saida: this.dt_saida,
          ic_bezerro: this.ic_bezerro,
        });
        this.$router.push({ name: "Alocação" });
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
    await this.getAnimaisList();
    await this.getLotesList();
  },
};
</script>

<style lang="scss" scoped>
.alocacao {
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
