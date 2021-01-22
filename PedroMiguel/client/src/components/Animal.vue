<template>
  <div>
    <div>
      <b-card bg-variant="light">
        <b-form @submit="store(animal)" @reset="onReset">
          <b-form-group
            label-cols-lg="3"
            label="Cadastro de Animais"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              id="input-group-1"
              label="Nome:"
              label-for="input-1"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-1"
                v-model="animal.nome"
                placeholder="Nome"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Raça:"
              label-for="input-2"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-2"
                v-model="animal.raca"
                placeholder="Raça"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Peso:"
              label-for="input-3"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-2"
                v-model="animal.peso"
                placeholder="Peso"
                type="number"
                step="0.01"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Data de Nascimento:"
              label-for="input-3"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-2"
                v-model="animal.nascimento"
                placeholder="Data de Nascimento"
                type="date"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Pessoa:"
              label-for="input-3"
              label-cols-sm="3"
              label-align-sm="right"
            >

           <b-input-group class="mb-2">
                <b-form-input type="search" placeholder="Pesquisar Pessoa" disabled v-model="user.nome"></b-form-input>
                <b-input-group-prepend is-text>
                    <b-icon icon="search" @click="modalShow = !modalShow"></b-icon>
                    <b-modal id="bv-modal-pessoas" v-model="modalShow" hide-footer>
                        <template #modal-title>
                        Selecionar Pessoa
                        </template>
                        <div class="d-block text-center">
                            <div>
                            <b-table hover outlined small head-variant="light" :items="users" :fields="fields_users">
                                <template #cell(acao)="row" >
                                <b-icon icon="check2-circle" @click="checkUser(row.item)"></b-icon>
                                </template>
                            </b-table>
                            </div>
                        </div>
                    </b-modal>
                </b-input-group-prepend>
            </b-input-group>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="ID Fazenda:"
              label-for="input-3"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-2"
                v-model="animal.id_fazenda"
                placeholder="ID Fazenda"
                type="number"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label="Sexo:"
              label-for="input-4"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-select
                id="input-3"
                v-model="animal.sexo"
                :options="sexo"
                defa
                required
              ></b-form-select>
            </b-form-group>
            <b-button v-if="!animal.id" type="submit" variant="primary">Cadastrar</b-button>
            <b-button v-if="!animal.id" type="reset" variant="danger">Limpar</b-button>
            <b-button v-if="animal.id"  @click="updateAnimal(animal)" variant="primary" >Atualizar</b-button>
            <b-button v-if="animal.id" type="reset" variant="danger">Cancelar</b-button>
          </b-form-group>
        </b-form>
      </b-card>
    </div>
    <div>
      <b-table hover outlined small head-variant="light" :items="animais" :fields="fields_animais">
        <template #cell(actions)="row" >
          <b-button @click="findAnimal(row.item.id)" size="sm" class="mr-2" variant="outline-primary">
           Editar 
          </b-button>

          <b-button @click="deleteAnimal(row.item.id)" size="sm" class="mr-2" variant="danger">
           Deletar
          </b-button>
        </template>
        <template #cell(createdAt)="row"  >
          {{getFormato(row.item.createdAt)}}
        </template>
        <template #cell(updatedAt)="row"  >
          {{getFormato(row.item.updatedAt)}}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from '../axios'
import moment from 'moment'
export default {
  data () {
    return {
      users: [],
      user: {},
      animal: {
        fk_id_pessoas: '',
        sexo: null
      },
      animais: [],
      success: null,
      sexo: [{ text: 'Sexo', value: null }, { text: 'Masculino', value: 'M' }, { text: 'Feminino', value: 'F' }],
      fields_users: [
        {
          key: 'nome',
          sortable: true
        },
        {
          key: 'email',
          sortable: true,
          label: 'E-mail'
        },
        {
          key: 'acao',
          label: ''
        }
      ],
      fields_animais: [
        {
          key: 'nome',
          sortable: true
        },
        {
          key: 'raca',
          sortable: true,
          label: 'Raça'
        },
        {
          key: 'sexo',
          sortable: true
        },
        {
          key: 'peso',
          sortable: true
        },
        {
          key: 'nascimento',
          sortable: true,
          label: 'Data de Nascimento'
        },
        {
          key: 'id_fazenda',
          sortable: true,
          label: 'ID Fazenda'
        },
        {
          key: 'fk_id_pessoas',
          sortable: true,
          label: 'ID Pessoa'
        },
        {
          key: 'createdAt',
          sortable: true,
          label: 'Criado em'
        },
        {
          key: 'updatedAt',
          sortable: true,
          label: 'Ultima Modificação'
        },
        {
          key: 'actions',
          label: ''
        }
      ],
      modalShow: false,
      error: []
    }
  },
  methods: {
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.animal = {
        sexo: null
      }
      this.user = {}
    },
    buscarUsers () {
      axios.get(`/pessoa`, {crossdomain: true})
        .then(res => {
          this.users = res.data // <- user
        })
        .catch(error => console.log(error)
        )
    },
    buscarUser (userId) {
      const user = this.users.find(user => user.id === userId)
      return user
    },
    buscar () {
      axios.get('/animal', {crossdomain: true})
        .then(res => {
          this.animais = res.data
        })
        .catch(error => console.log(error)
        )
    },
    checkUser (user) {
      this.user = user
      this.animal.fk_id_pessoas = user.id
      this.modalShow = !this.modalShow
    },
    store (novo) {
      axios.post('/animal', novo)
        .then(res => {
          this.success = res
        })
        .catch(error => console.log(error))
    },
    updateAnimal (animalUp) {
      axios.put(`/animal/${animalUp.id}`, animalUp)
        .then(res => {
          console.log('atualizado')
          this.animal = {
            sexo: null
          }
          this.user = {}
          this.buscar()
        })
        .catch(error => console.log(error))
    },
    findAnimal (animalId) {
      axios.get(`/animal/${animalId}`)
        .then(res => {
          this.animal = res.data
          this.user = this.buscarUser(this.animal.fk_id_pessoas)
          console.log(res.data)
        })
        .catch(error => console.log(error))
    },
    deleteAnimal (animalId) {
      axios.delete(`/animal/${animalId}`)
        .then(res => {
          console.log(res)
        })
      this.$router.push('/')
    },
    getFormato (data) {
      return moment.parseZone(data).utcOffset(0).format('DD/MM/YYYY')
    }
  },
  created () {
    this.buscarUsers()
    this.buscar()
  }
}
</script>

<style>
  svg{
    cursor: pointer;
  }
</style>
