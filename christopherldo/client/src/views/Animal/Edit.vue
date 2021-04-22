<template>
  <main class="animal">
    <div class="container">
      <div class="top--actions">
        <router-link
          class="button bg-primary text-light"
          to="/animal"
          title="Voltar para a Home"
        >
          <font-awesome-icon icon="angle-left" />
        </router-link>
        <h1>Editar Animal</h1>
      </div>
      <ul v-if="errors.length > 0" class="alert alert-danger" role="alert">
        <div v-for="(error, key) in errors" v-bind:key="key">
          {{ error.msg }}
        </div>
      </ul>
      <form v-on:submit.prevent="editAnimal">
        <hr />
        <span>ID: {{ id }}</span>
        <div class="form-row">
          <div class="col form-group">
            <label for="no_animal">Nome:</label>
            <input
              v-model="no_animal"
              required
              type="text"
              class="form-control"
              id="no_animal"
              name="no_animal"
              placeholder="Insira o nome"
            />
          </div>
          <div class="col form-group">
            <label for="no_raca">Raça:</label>
            <input
              v-model="no_raca"
              required
              type="text"
              class="form-control"
              id="no_raca"
              name="no_raca"
              placeholder="Insira a raça"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col form-group">
            <label for="no_raca">Dono:</label>
            <select
              v-model="fk_id_pessoa"
              class="form-select form-control"
              aria-label="Default select example"
              required
            >
              <option selected></option>
              <option
                v-for="(pessoa, key) in pessoaArray"
                v-bind:value="pessoa.id"
                v-bind:key="key"
              >
                {{ pessoa.id }} - {{ pessoa.no_pessoa }}
              </option>
            </select>
          </div>
          <div class="col-md-3 form-group">
            <label for="vr_peso">Massa (KG):</label>
            <input
              v-model="vr_peso"
              required
              type="number"
              class="form-control"
              id="vr_peso"
              name="vr_peso"
              placeholder="Insira o peso do animal"
            />
          </div>
          <div class="col-md-3 form-group">
            <label for="dt_nascimento">Data de nascimento:</label>
            <input
              v-model="dt_nascimento"
              required
              type="date"
              class="form-control"
              id="dt_nascimento"
              name="dt_nascimento"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col-md-3">
            <div class="form-check form-check-inline">
              <input
                v-model="sexo"
                class="form-check-input"
                type="radio"
                name="sexo"
                id="sexo-M"
                value="M"
                required
              />
              <label class="form-check-label" for="sexo-M"> Masculino </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                v-model="sexo"
                class="form-check-input"
                type="radio"
                name="sexo"
                id="sexo-F"
                value="F"
                required
              />
              <label class="form-check-label" for="sexo-F"> Feminimo </label>
            </div>
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
      pessoaArray: [],
      id: this.$route.params.id,
      fk_id_pessoa: "",
      no_animal: "",
      no_raca: "",
      sexo: "",
      vr_peso: "",
      dt_nascimento: "",
      getPessoasList: async () => {
        this.errors = [];
        this.pessoaArray = [];

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
      },
      getAnimalById: async () => {
        this.errors = [];

        try {
          const response = await API.getAnimalById(this.id);
          this.fk_id_pessoa = response.data.animal.fk_id_pessoa;
          this.no_animal = response.data.animal.no_animal;
          this.no_raca = response.data.animal.no_raca;
          this.sexo = response.data.animal.sexo;
          this.vr_peso = response.data.animal.vr_peso;
          this.dt_nascimento = response.data.animal.dt_nascimento;
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
    async editAnimal() {
      this.errors = [];
      try {
        await API.editAnimal(this.id, {
          fk_id_pessoa: this.fk_id_pessoa,
          no_animal: this.no_animal,
          no_raca: this.no_raca,
          sexo: this.sexo,
          vr_peso: this.vr_peso,
          dt_nascimento: this.dt_nascimento,
        });
        this.$router.push({ name: "Animal" });
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
    await this.getAnimalById();
    await this.getPessoasList();
  },
};
</script>

<style lang="scss" scoped>
.animal {
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
