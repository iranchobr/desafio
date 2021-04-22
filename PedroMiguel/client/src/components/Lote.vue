<template>
  <div>
    <div>
      <b-card bg-variant="light">
        <b-form @submit="store(lote)" @reset="onReset">
          <b-form-group
            label-cols-lg="3"
            label="Cadastro de Lotes"
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
                v-model="lote.nome"
                placeholder="Nome"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Descrição:"
              label-for="input-2"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-2"
                v-model="lote.descricao"
                placeholder="Descrição do Lote"
                type="textarea"
                required
              ></b-form-input>
            </b-form-group>

            
            <b-button v-if="!lote.id" type="submit" variant="primary">Cadastrar</b-button>
            <b-button v-if="!lote.id" type="reset" variant="danger">Limpar</b-button>
            <b-button v-if="lote.id"  @click="updateLote(lote)" variant="primary" >Atualizar</b-button>
            <b-button v-if="lote.id" type="reset" variant="danger">Cancelar</b-button>
          </b-form-group>
        </b-form>
      </b-card>
    </div>
    <div>
      <b-table  hover outlined small head-variant="light" :items="lotes" :fields="fields">
        <template #cell(actions)="row" >
          <b-button @click="findLote(row.item.id)" size="sm" class="mr-2" variant="outline-primary">
           Editar 
          </b-button>

          <b-button @click="deleteLote(row.item.id)" size="sm" class="mr-2" variant="danger">
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
      lotes: [],
      lote: {},
      fields: [
        {
          key: 'nome',
          sortable: true
        },
        {
          key: 'descricao',
          sortable: false,
          label: 'Descrição'
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
      success: null,
      error: []
    }
  },
  methods: {
    print () {
      console.log(this.lote)
    },

    onReset (event) {
      event.preventDefault()
      this.lote = {}
    },
    buscar () {
      axios.get('/lote', {crossdomain: true})
        .then(res => {
          this.lotes = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    store (novo) {
      axios.post('/lote', novo)
        .then(res => {
          this.success = res
        })
        .catch(function (error) {
          this.success = error
        })
    },
    findLote (loteId) {
      axios.get(`/lote/${loteId}`)
        .then(res => {
          this.lote = res.data
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateLote (loteUp) {
      axios.put(`/lote/${loteUp.id}`, loteUp)
        .then(res => {
          console.log('atualizado')
          this.lote = {}
          this.buscar()
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteLote (loteId) {
      axios.delete(`/lote/${loteId}`)
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
    this.buscar()
    console.log(this)
  }
}
</script>
