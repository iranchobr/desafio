<template>
  <main class="pessoa">
    <div class="container">
      <div class="top--actions">
        <router-link
          class="button bg-primary text-light"
          to="/pessoa"
          title="Voltar para a Home"
        >
          <font-awesome-icon icon="angle-left" />
        </router-link>
        <h1>Adicionar Pessoa</h1>
      </div>
      <ul v-if="errors.length > 0" class="alert alert-danger" role="alert">
        <div v-for="(error, key) in errors" v-bind:key="key">
          {{ error.msg }}
        </div>
      </ul>
      <form v-on:submit.prevent="addPessoa">
        <hr />
        <div class="form-group form-check">
          <input
            v-model="ic_ativo"
            type="checkbox"
            class="form-check-input"
            id="ic_ativo"
            name="ic_ativo"
            checked
          />
          <label class="form-check-label" for="ic_ativo">Ativo</label>
        </div>
        <div class="form-row">
          <div class="col form-group">
            <label for="no_pessoa">Nome:</label>
            <input
              v-model="no_pessoa"
              required
              type="text"
              class="form-control"
              id="no_pessoa"
              name="no_pessoa"
              placeholder="Insira o nome"
            />
          </div>
          <div class="col form-group">
            <label for="no_email">E-mail:</label>
            <input
              v-model="no_email"
              required
              type="email"
              class="form-control"
              id="no_email"
              name="no_email"
              placeholder="Insira o e-mail"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="col form-group">
            <label for="endereco">Endereço:</label>
            <input
              v-model="endereco"
              required
              type="text"
              class="form-control"
              id="endereco"
              name="endereco"
              placeholder="Insira o endereço"
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
        <button type="submit" class="btn btn-primary mt-3">Adicionar</button>
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
      no_pessoa: "",
      no_email: "",
      endereco: "",
      sexo: "",
      ic_ativo: true,
    };
  },
  methods: {
    async addPessoa() {
      this.errors = [];
      try {
        await API.addPessoa({
          no_pessoa: this.no_pessoa,
          no_email: this.no_email,
          endereco: this.endereco,
          sexo: this.sexo,
          ic_ativo: this.ic_ativo,
        });
        this.$router.push({ name: "Pessoa" });
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
};
</script>

<style lang="scss" scoped>
.pessoa {
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
