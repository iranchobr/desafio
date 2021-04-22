<template>
  <div>
    <div>
      <b-card bg-variant="light">
        <b-form @submit="store(user)" @reset="onReset">
          <b-form-group
            label-cols-lg="3"
            label="Cadastro de Pessoal"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              id="input-group-1"
              label="E-mail:"
              label-for="input-1"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-1"
                v-model="user.email"
                type="email"
                placeholder="E-mail"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Nome:"
              label-for="input-2"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-2"
                v-model="user.nome"
                placeholder="Nome"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Endereço:"
              label-for="input-3"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-2"
                v-model="user.endereco"
                placeholder="Endereço"
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
                v-model="user.sexo"
                :options="sexo"
                defa
                required
              ></b-form-select>
            </b-form-group>
            <b-form-group
              id="input-group-4"
              label-for="input-4"
              cols-sm="3"
              align-sm="right"
            >
              <b-form-checkbox v-model="user.ativo" name="check-button" switch>
                Ativo
              </b-form-checkbox></b-form-group
            >
            <b-button v-if="!user.id" type="submit" variant="primary">Cadastrar</b-button>
            <b-button v-if="!user.id" type="reset" variant="danger">Limpar</b-button>
            <b-button v-if="user.id"  @click="updateUser(user)" variant="primary" >Atualizar</b-button>
            <b-button v-if="user.id" type="reset" variant="danger">Cancelar</b-button>
          </b-form-group>
        </b-form>
      </b-card>
    </div>
    <div>
      <b-table hover outlined small head-variant="light" :items="users" :fields="fields">
        <template #cell(actions)="row" >
          <b-button @click="findUser(row.item.id)" size="sm" class="mr-2" variant="outline-primary">
           Editar 
          </b-button>

          <b-button @click="deleteUser(row.item.id)" size="sm" class="mr-2" variant="danger">
           Deletar
          </b-button>
        </template>
        <template #cell(ativo)="row"  >
          <b-form-checkbox size="sm" v-model=row.item.ativo disabled></b-form-checkbox>
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
      user: {
        sexo: null
      },
      fields: [
        {
          key: 'nome',
          sortable: true
        },
        {
          key: 'email',
          sortable: false,
          label: 'E-mail'
        },
        {
          key: 'sexo',
          sortable: true,
          label: 'Sexo'
        },
        {
          key: 'endereco',
          sortable: false,
          label: 'Endereço'
        },
        {
          key: 'ativo',
          sortable: true
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
      users: [],
      sexo: [{ text: 'Sexo', value: null }, { text: 'Masculino', value: 'M' }, { text: 'Feminino', value: 'F' }]
    }
  },
  methods: {
    onReset (event) {
      event.preventDefault()
      this.user = {
        sexo: null
      }
    },
    buscar () {
      axios
        .get('/pessoa', { crossdomain: true })
        .then(res => {
          this.users = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    store (usuario) {
      axios
        .post('/pessoa', usuario)
        .then(res => {
          this.success = res
        })
        .catch(function (error) {
          this.success = error
        })
    },
    deleteUser (userId) {
      axios.delete(`/pessoa/${userId}`).then(resp => {
        console.log(resp)
        this.buscar()
      })
    },
    findUser (userId) {
      axios.get(`/pessoa/${userId}`).then(resp => {
        this.user = resp.data
        console.log(resp.data)
      })
    },
    updateUser (usuario) {
      axios
        .put(`pessoa/${usuario.id}`, usuario)
        .then(resp => {
          console.log('USUARIO ATUALIZADO COM SUCESSO! ', resp)
          this.buscar()
          this.user = {
            sexo: null
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    getFormato (data) {
      return moment.parseZone(data).utcOffset(0).format('DD/MM/YYYY')
    }
  },
  created () {
    this.buscar()
    console.log(this)
  }
}
</script>

<style>
  svg{
    cursor: pointer;
  }
</style>
