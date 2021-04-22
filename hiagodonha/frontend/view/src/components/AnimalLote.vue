<template>
  <div>
    <b-card>
      <navbar></navbar>
      <div class="card">
        <div class="card-header">
          <strong>CADASTRO DE ANIMAL X LOTE:</strong>
        </div>
        <div class="card-body">
          <div class="card-text">
            <form>
              <div class="row">
                <div class="col" style="text-align: left">
                  <label><strong>Data de Entrada</strong></label>
                  <input
                    v-model="animal_x_lote.dt_entrada"
                    type="date"
                    class="form-control"
                    placeholder="Data de Entrada  * obrigatório"
                  />
                </div>
                <div class="col" style="text-align: left">
                  <label style="text-align: left"
                    ><strong>Data de Saída</strong></label
                  >
                  <input
                    v-model="animal_x_lote.dt_saida"
                    type="date"
                    class="form-control"
                    placeholder="Data de Saída  * obrigatório"
                  />
                </div>
              </div>
              <div class="row" style="margin-top: 1rem">
                <div class="col" style="text-align: left">
                  <label><strong>Data Última Atualização</strong></label>
                  <input
                    v-model="animal_x_lote.dt_ultima_movimentacao"
                    type="date"
                    class="form-control"
                    placeholder="Data última atualização  * obrigatório"
                  />
                </div>
                <div class="col" style="text-align: left; margin-top: 2rem">
                  <input
                    v-model="animal_x_lote.fk_id_lote"
                    type="text"
                    class="form-control"
                    placeholder="Id Lote * obrigatório"
                  />
                </div>
              </div>
              <div class="row" style="margin-top: 2rem">
                <div class="col">
                  <input
                    v-model="animal_x_lote.fk_id_animal"
                    type="text"
                    class="form-control"
                    placeholder="Id Animal * obrigatório"
                  />
                </div>
                <div class="col" style="text-align: left">
                  <b-form-checkbox
                    id="ic_bezerro-checkbox"
                    name="ic_bezerro"
                    value="true"
                    unchecked-value="false"
                    v-model="animal_x_lote.ic_bezerro"
                  >
                    Bezerro * obrigatório
                  </b-form-checkbox>
                </div>
              </div>
            </form>
          </div>
          <div class="aDireita" style="margin-top: 1rem">
            <b-button id="show-btn" class="btn btn-success" @click="post()">
              Cadastrar
            </b-button>
          </div>
        </div>
        <hr />
        <div class="table-responsive">
          <table class="table">
            <thead class="background">
              <tr>
                <th scope="col">Bezerro</th>
                <th scope="col">Data Entrada</th>
                <th scope="col">Data Saída</th>
                <th scope="col">Ult. Movimentação</th>
                <th scope="col">ID Animal</th>
                <th scope="col">ID Lote</th>
                <th scope="col">Criado Em</th>
                <th scope="col">Alterado Em</th>
                <th scope="col">Alterar</th>
                <th scope="col">Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(animal_x_lote, index) in listAnimalLote" :key="index">
                <td>
                  <b-form-checkbox
                    id="ic_bezerro-checkbox"
                    v-model="animal_x_lote.ic_bezerro"
                    name="ic_bezerro"
                    value="true"
                    unchecked-value="false"
                  >
                    Ativo
                  </b-form-checkbox>
                </td>
                <td>{{ animal_x_lote.dt_entrada }}</td>
                <td>{{ animal_x_lote.dt_saida }}</td>
                <td>{{ animal_x_lote.dt_ultima_movimentacao }}</td>
                <td>{{ animal_x_lote.fk_id_animal }}</td>
                <td>{{ animal_x_lote.fk_id_lote }}</td>
                <td>{{ animal_x_lote.createdAt }}</td>
                <td>{{ animal_x_lote.updatedAt }}</td>
                <td>
                  <button
                    type="button"
                    v-b-modal.modal-edit
                    class="btn btn-success"
                    @click="atualizar(animal_x_lote.id)"
                  >
                    <b-icon icon="pen"></b-icon>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    v-b-modal.modal-center
                    class="btn btn-danger"
                    @click="excluir(animal_x_lote.id)"
                  >
                    <b-icon icon="trash"></b-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <b-pagination
            :per-page="5"
            aria-controls="register-table"
            align="center"
          ></b-pagination>
        </div>
        <b-modal id="modal-edit" centered title="Editar Registro">
          <form>
            <div class="row">
              <div class="col">
                <input
                  type="date"
                  class="form-control"
                  placeholder="Data de Entrada"
                  v-model="animal_x_lote.dt_entrada"
                />
              </div>
              <div class="col">
                <input
                  type="date"
                  class="form-control"
                  placeholder="Data de Saída"
                  v-model="animal_x_lote.dt_saida"
                />
              </div>
            </div>
            <div class="row" style="margin-top: 2%">
              <div class="col">
                <input
                  type="date"
                  class="form-control"
                  placeholder="Última Movimentação"
                  v-model="animal_x_lote.dt_ultima_movimentacao"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="ID Lote"
                  v-model="animal_x_lote.fk_id_lote"
                />
              </div>
            </div>
            <div class="row" style="margin-top: 2%">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Última Movimentação"
                  v-model="animal_x_lote.fk_id_animal"
                />
              </div>
              <div class="col">
                  <b-form-checkbox
                    id="ic_bezerro-checkbox"
                    name="ic_bezerro"
                    value="true"
                    unchecked-value="false"
                    v-model="animal_x_lote.ic_bezerro"
                  >
                    Bezerro * obrigatório
                  </b-form-checkbox>
              </div>
            </div>
          </form>
          <template #modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="success" @click="ok(), putch()">
              Ok
            </b-button>
            <b-button size="sm" variant="danger" @click="cancel()">
              Cancel
            </b-button>
          </template>
        </b-modal>
      </div>
    </b-card>
  </div>
</template>

<script>
import NavBarVue from './NavBar.vue'
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      listAnimalLote: ([] = []),
      animal_x_lote: {
        dt_entrada: null,
        dt_saida: null,
        dt_ultima_movimentacao: null,
        fk_id_animal: null,
        fk_id_lote: null,
        ic_bezerro: false,
        createdAt: null,
        updatedAt: null
      }
    }
  },
  created: function () {
    axios.get('http://localhost:3000/animais_x_lotes').then((resp) => {
      console.log(resp)
      this.listAnimalLote = resp.data
    })
  },
  methods: {
    post () {
      this.animal_x_lote.createdAt = new Date()
      this.animal_x_lote.updatedAt = new Date()
      console.log(this.animal_x_lote)
      axios
        .post('http://localhost:3000/animais_x_lotes', this.animal_x_lote)
        .then((resp) => {
          console.log(resp)
          if (
            resp.status == 200 &&
            this.animal_x_lote.fk_id_animal != null &&
            this.animal_x_lote.fk_id_lote != null
          ) {
            document.location.reload()
          }
        })
    },
    excluir (id) {
      console.log(id)
      axios
        .delete('http://localhost:3000/animais_x_lotes/' + id)
        .then((resp) => {
          console.log(resp)
          if (resp.status == 200) {
            document.location.reload()
          }
        })
    },
    atualizar (id) {
      axios.get('http://localhost:3000/animais_x_lotes/' + id).then((resp) => {
        this.animal_x_lote.id = resp.data.id
        this.animal_x_lote.dt_entrada = resp.data.dt_entrada
        this.animal_x_lote.dt_saida = resp.data.dt_saida
        this.animal_x_lote.dt_ultima_movimentacao = resp.data.dt_ultima_movimentacao
        this.animal_x_lote.fk_id_lote = resp.data.fk_id_lote
        this.animal_x_lote.fk_id_animal = resp.data.fk_id_animal
        this.animal_x_lote.ic_bezerro = resp.data.ic_bezerro
        this.animal_x_lote.createdAt = resp.data.createdAt
        this.animal_x_lote.updatedAt = resp.data.updatedAt
      })
    },
    putch () {
      console.log(this.animal_x_lote.id)
      axios
        .patch(
          'http://localhost:3000/animais_x_lotes/' + this.animal_x_lote.id,
          this.animal_x_lote
        )
        .then((resp) => {
          console.log(resp)
          if (resp.status == 200) {
            document.location.reload()
          }
        })
    }
  },
  components: {
    navbar: NavBarVue
  }
}
</script>

<style scoped>
.margin-top-2 {
  margin-top: 2%;
}
.aEsquerda {
  text-align: left;
}
.aDireita {
  text-align: right;
}
.background {
  background-color: #424923;
  color: aliceblue;
}
</style>
