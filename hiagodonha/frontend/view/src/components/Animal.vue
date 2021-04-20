<template>
  <div>
    <b-card>
      <navbar></navbar>
      <div class="card">
        <div class="card-header">
          <strong> CADASTRO DE ANIMAIS: </strong>
        </div>
        <div class="card-body">
          <div class="card-text">
            <form>
              <div class="row">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nome do Animal"
                    v-model="animal.no_animal"
                  />
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Nome da Raça"
                    v-model="animal.no_raca"
                  />
                </div>
              </div>
              <div class="row" style="margin-top: 2%">
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Peso"
                    v-model="animal.vr_peso"
                  />
                </div>
                <div class="col">
                  <b-form-select v-model="animal.sexo" :options="options">
                  </b-form-select>
                </div>
              </div>
              <div class="row" style="margin-top: 2%">
                <div class="col">
                  <input
                    type="date"
                    class="form-control"
                    placeholder="Data de Nascimento"
                    v-model="animal.dt_nascimento"
                  />
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Id da Pessoa * obrigatório"
                    v-model="animal.fk_id_pessoa"
                  />
                </div>
                <div class="col">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Id da Fazenda * obrigatório"
                    v-model="animal.id_fazenda"
                  />
                </div>
              </div>
              <div
                class="form-check; aEsquerda"
                style="margin-left: 53%; margin-top: 1rem"
              ></div>
            </form>
          </div>
          <div class="aDireita">
            <b-button id="show-btn" class="btn btn-success" @click="post">
              Cadastrar
            </b-button>
          </div>
        </div>
      </div>
      <hr />

      <div class="table-responsive">
        <table class="table">
          <thead class="background">
            <tr>
              <th scope="col">Nome</th>
              <th scope="col">Raça</th>
              <th scope="col">Peso</th>
              <th scope="col">Sexo</th>
              <th scope="col">Data Nascimento</th>
              <th scope="col">Id Pessoa</th>
              <th scope="col">Id Fazenda</th>
              <th scope="col">Criado em</th>
              <th scope="col">Alterado em</th>
              <th scope="col">Alterar</th>
              <th scope="col">Excluir</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(animal, index) in listAnimais" :key="index">
              <td>{{ animal.no_animal }}</td>
              <td>{{ animal.no_raca }}</td>
              <td>{{ animal.vr_peso }}</td>
              <td>{{ animal.sexo }}</td>
              <td>{{ animal.dt_nascimento }}</td>
              <td>{{ animal.fk_id_pessoa }}</td>
              <td>{{ animal.id_fazenda }}</td>
              <td>{{ animal.createdAt }}</td>
              <td>{{ animal.updatedAt }}</td>
              <td>
                <button
                  type="button"
                  v-b-modal.modal-edit
                  class="btn btn-success"
                  @click="atualizar(animal.id)"
                >
                  <b-icon icon="pen"></b-icon>
                </button>
              </td>
              <td>
                <button
                  type="button"
                  v-b-modal.modal-center
                  class="btn btn-danger"
                  @click="excluir(animal.id)"
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
                  placeholder="Nome do Animal"
                  v-model="animal.no_animal"
                />
              </div>
              <div class="col">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Raça"
                  v-model="animal.no_raca"
                />
              </div>
            </div>
            <div class="row" style="margin-top: 2%">
              <div class="col">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Peso"
                  v-model="animal.vr_peso"
                />
              </div>
              <div class="col">
                <b-form-select v-model="animal.sexo" :options="options">
                </b-form-select>
              </div>
            </div>
            <div class="row" style="margin-top: 2%">
              <div class="col">
                <input
                  type="date"
                  class="form-control"
                  placeholder="Data Nascimento"
                  v-model="animal.dt_nascimento"
                />
              </div>
              <div class="col">
                <input
                  type="number"
                  class="form-control"
                  placeholder="ID Pessoa"
                  v-model="animal.fk_id_pessoa"
                />
              </div>
              <div class="col">
                <input
                  type="number"
                  class="form-control"
                  placeholder="ID Fazenda"
                  v-model="animal.id_fazenda"
                />
              </div>
            </div>
            <div
              class="form-check; aEsquerda"
              style="margin-left: 53%; margin-top: 1rem"
            ></div>
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
  name: 'App',
  data () {
    return {
      listAnimais: ([] = []),
      options: [
        { value: null, text: 'Selecione o sexo' },
        { value: 'M', text: 'Masculino' },
        { value: 'F', text: 'Feminino' }
      ],
      animal: {
        id_fazenda: null,
        no_animal: '',
        no_raca: '',
        sexo: '',
        vr_peso: null,
        dt_nascimento: null,
        fk_id_pessoa: null,
        createdAt: new Date(),
        updateAt: new Date()
      }
    }
  },
  created: function () {
    axios.get('http://localhost:3000/animais').then((resp) => {
      this.listAnimais = resp.data
    })
  },
  methods: {
    post () {
      console.log(this.animal)
      axios.post('http://localhost:3000/animais', this.animal).then((resp) => {
        if (resp.status == 200) {
          document.location.reload()
        }
      })
    },
    excluir (id) {
      console.log(id)
      axios.delete('http://localhost:3000/animais/' + id).then(
        (resp) => {
          if (resp.status == 200) {
            document.location.reload()
          }
        },
        (error) => {
          console.error(error)
        }
      )
    },
    atualizar (idAnimal) {
      axios.get('http://localhost:3000/animais/' + idAnimal).then((resp) => {
        this.animal.id = resp.data.id
        this.animal.no_animal = resp.data.no_animal
        this.animal.no_raca = resp.data.no_raca
        this.animal.vr_peso = resp.data.vr_peso
        this.animal.sexo = resp.data.sexo
        this.animal.dt_nascimento = resp.data.dt_nascimento
        this.animal.fk_id_pessoa = resp.data.fk_id_pessoa
        this.animal.id_fazenda = resp.data.id_fazenda
        this.animal.createdAt = resp.data.createdAt
        this.animal.updateAt = new Date()
      })
    },
    putch () {
      console.log('teste')
      axios
        .patch('http://localhost:3000/animais/' + this.animal.id, this.animal)
        .then((resp) => {
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
