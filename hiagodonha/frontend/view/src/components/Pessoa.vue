<template>
  <div>
    <b-card>
      <navbar></navbar>
      <div class="card">
        <div class="card-header">
          <strong>CADASTRO DE PESSOA:</strong>
        </div>
        <div class="card-body">
          <div class="card-text">
            <form>
              <div class="row">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nome Completo"
                    v-model="pessoa.no_pessoa"
                  />
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="E-mail"
                    v-model="pessoa.no_email"
                  />
                </div>
              </div>
              <div class="row" style="margin-top: 2%">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Endereço"
                    v-model="pessoa.endereco"
                  />
                </div>
                <div class="col">
                  <b-form-select
                    v-model="pessoa.sexo"
                    :options="options"
                  ></b-form-select>
                </div>
              </div>
              <div
                class="form-check; aEsquerda"
                style="margin-left: 53%; margin-top: 1rem"
              >
                <b-form-checkbox
                  id="pessoa-checkbox"
                  v-model="pessoa.ic_ativo"
                  name="pessoa"
                  value="true"
                  unchecked-value="false"
                >
                  Ativo
                </b-form-checkbox>
              </div>
            </form>
          </div>
          <div class="aDireita">
            <b-button id="show-btn" class="btn btn-success" @click="cadastrar">
              Cadastrar
            </b-button>
          </div>
        </div>
      </div>
      <hr />

      <div class="table-responsive" v-if="listPessoas != null">
        <table class="table">
          <thead class="background">
            <tr>
              <th scope="col">Ativo</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">Endereço</th>
              <th scope="col">Sexo</th>
              <th scope="col">Criado em</th>
              <th scope="col">Alterado em</th>
              <th scope="col">Alterar</th>
              <th scope="col">Excluir</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pessoa, index) in listPessoas" :key="index">
              <td>
                <b-form-checkbox
                  id="pessoa-checkbox"
                  v-model="pessoa.ic_ativo"
                  name="pessoa"
                  value="true"
                  unchecked-value="false"
                >
                  Ativo
                </b-form-checkbox>
              </td>
              <td>{{ pessoa.no_pessoa }}</td>
              <td>{{ pessoa.no_email }}</td>
              <td>{{ pessoa.endereco }}</td>
              <td>{{ pessoa.sexo }}</td>
              <td>{{ pessoa.createdAt }}</td>
              <td>{{ pessoa.updatedAt }}</td>
              <td>
                <button
                  type="button"
                  v-b-modal.modal-edit
                  class="btn btn-success"
                  @click="atualizar(pessoa.id)"
                >
                  <b-icon icon="pen"></b-icon>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  v-b-modal.modal-center
                  class="btn btn-danger"
                  @click="deletar(pessoa.id)"
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

      <div>
        <b-modal id="modal-center" centered title="Excluir">
          <p class="my-4">Tem certeza que deseja excluir esse Registro?</p>
        </b-modal>

        <b-modal id="modal-edit" centered title="Editar Registro">
          <form>
            <div class="row">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nome Completo"
                  v-model="pessoa.no_pessoa"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="E-mail"
                  v-model="pessoa.no_email"
                />
              </div>
            </div>
            <div class="row" style="margin-top: 2%">
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Endereço"
                  v-model="pessoa.endereco"
                />
              </div>
              <div class="col">
                <b-form-select
                  v-model="pessoa.sexo"
                  :options="options"
                ></b-form-select>
              </div>
            </div>
            <div
              class="form-check; aEsquerda"
              style="margin-left: 53%; margin-top: 1rem"
            >
              <b-form-checkbox
                id="pessoa-checkbox"
                v-model="pessoa.ic_ativo"
                name="pessoa"
                value="true"
                unchecked-value="false"
              >
                Ativo
              </b-form-checkbox>
            </div>
          </form>
          <template #modal-footer="{ ok, cancel }">
            <b-button size="sm" variant="success" @click="ok(), putch()">
              Ok
            </b-button>
            <b-button size="sm" variant="danger" @click="cancel()">
              Cancel
            </b-button>
          </template></b-modal
        >
      </div></b-card
    >
  </div>
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
  name: 'App',
  data () {
    return {
      modal: false,
      listPessoas: [],
      pessoa: {
        no_pessoa: '',
        no_email: '',
        endereco: '',
        sexo: null,
        ic_ativo: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      options: [
        { value: null, text: 'Selecione o sexo' },
        { value: 'M', text: 'Masculino' },
        { value: 'F', text: 'Feminino' }
      ],
      perPage: 5,
      currentPage: 1
    }
  },
  created: function () {
    axios.get('http://localhost:3000/pessoas').then((resp) => {
      this.listPessoas = resp.data
    })
  },
  methods: {
    cadastrar () {
      console.log('aqui')
      console.log(this.pessoa)
      axios.post('http://localhost:3000/pessoas', this.pessoa).then(
        (resp) => {
          console.log(resp)
          if (resp.status == 200) {
            document.location.reload()
          }
        },
        (error) => {}
      )
    },
    atualizar (idPessoa) {
      axios.get('http://localhost:3000/pessoas/' + idPessoa).then((resp) => {
        this.pessoa.id = resp.data.id
        this.pessoa.no_pessoa = resp.data.no_pessoa
        this.pessoa.no_email = resp.data.no_email
        this.pessoa.endereco = resp.data.endereco
        this.pessoa.sexo = resp.data.sexo
        this.pessoa.ic_ativo = resp.data.ic_ativo
        this.pessoa.createdAt = resp.data.createdAt
        this.pessoa.updatedAt = resp.data.updatedAt
      })
    },
    deletar (id) {
      console.log(this.pessoa.id)
      axios.delete('http://localhost:3000/pessoas/' + id).then((resp) => {
        if (resp.status == 200) {
          document.location.reload()
        }
      })
    },
    putch () {
      console.log(this.pessoa.id)
      axios
        .patch('http://localhost:3000/pessoas/' + this.pessoa.id, this.pessoa)
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
