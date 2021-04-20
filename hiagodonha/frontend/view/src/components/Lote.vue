<template>
  <div>
    <b-card>
      <navbar></navbar>
      <div class="card">
        <div class="card-header">
          <strong>CADASTRO DE LOTE:</strong>
        </div>
        <div class="card-body">
          <div class="card-text">
            <form>
              <div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nome Lote"
                  v-model="lote.no_lote"
                />
              </div>
              <div class="space">
                <b-form-textarea
                  id="textarea"
                  v-model="lote.ds_lote"
                  placeholder="Descrição do Lote..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </div>
            </form>
          </div>
          <div class="aDireita" style="margin-top: 1rem">
            <b-button id="show-btn" class="btn btn-success" @click="cadastrar">
              Cadastrar
            </b-button>
          </div>
        </div>
        <hr />
        <div class="table-responsive">
          <table class="table">
            <thead class="background" style="color: white">
              <tr>
                <th scope="col">Nome</th>
                <th scope="col">Descrição</th>
                <th scope="col">Criado em</th>
                <th scope="col">Alterado em</th>
                <th scope="col">Alterar</th>
                <th scope="col">Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(lote, index) in loteList" :key="index">
                <td>{{ lote.no_lote }}</td>
                <td>{{ lote.ds_lote }}</td>
                <td>{{ lote.createdAt }}</td>
                <td>{{ lote.updatedAt }}</td>
                <td>
                  <button
                    type="button"
                    v-b-modal.modal-edit
                    class="btn btn-success"
                    @click="atualizar(lote.id)"
                  >
                    <b-icon icon="pen"></b-icon>
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    v-b-modal.modal-center
                    class="btn btn-danger"
                    @click="excluir(lote.id)"
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
                  type="text"
                  class="form-control"
                  placeholder="Nome do Lote"
                  v-model="lote.no_lote"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Descrição"
                  v-model="lote.ds_lote"
                />
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
import axios from 'axios'
import NavBar from './NavBar'

export default {
  data () {
    return {
      loteList: ([] = []),
      lote: {
        no_lote: '',
        ds_lote: '',
        createdAt: null,
        updatedAt: null
      }
    }
  },
  created: function () {
    axios.get('http://localhost:3000/lotes').then((resp) => {
      this.loteList = resp.data
    })
  },
  methods: {
    cadastrar () {
      this.lote.createdAt = new Date()
      this.lote.updatedAt = new Date()
      axios.post('http://localhost:3000/lotes', this.lote).then((resp) => {
        document.location.reload()
      })
    },
    excluir (loteId) {
      console.log(loteId)
      axios.delete('http://localhost:3000/lotes/' + loteId).then((resp) => {
        document.location.reload()
      })
    },
    atualizar (idLote) {
      axios.get('http://localhost:3000/lotes/' + idLote).then((resp) => {
        this.lote.id = resp.data.id
        this.lote.no_lote = resp.data.no_lote
        this.lote.ds_lote = resp.data.ds_lote
        this.lote.createdAt = resp.data.createdAt
        this.lote.updateAt = new Date()
      })
    },
    putch () {
      console.log(this.lote.id)
      axios
        .patch('http://localhost:3000/lotes/' + this.lote.id, this.lote)
        .then((resp) => {
          console.log(resp)
          if (resp.status == 200) {
            document.location.reload()
          }
        })
    }
  },
  components: {
    navbar: NavBar
  }
}
</script>

<style scoped>
.space {
  margin-top: 1%;
}
.center {
  margin-left: 20%;
}
.background {
  background-color: #424923;
}
.color {
  color: white !important;
}
.aDireita {
  text-align: right;
}
</style>
