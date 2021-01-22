<template>
  <div>
    <div>
      <b-card bg-variant="light">
        <b-form @submit="store(alocar)" @reset="onReset">
          <b-form-group
            label-cols-lg="3"
            label="Movimentação de Animais"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              id="input-group-3"
              label="Animal:"
              label-for="input-3"
              label-cols-sm="3"
              label-align-sm="right"
            >

           <b-input-group class="mb-2">
                <b-form-input type="search" placeholder="Pesquisar Animal" disabled v-model="animal.nome"></b-form-input>
                <b-input-group-prepend is-text>
                    <b-icon icon="search" @click="modalAnimais = !modalAnimais"></b-icon>
                    <b-modal id="bv-modal-animal" size="lg" v-model="modalAnimais" hide-footer>
                        <template #modal-title>
                        Selecionar Animal
                        </template>
                        <div class="d-block text-center">
                            <div>
                            <b-table hover outlined small head-variant="light" :items="animais" :fields="fields_animais">
                                <template #cell(acao)="row" >
                                <b-icon icon="check2-circle" @click="checkAnimal(row.item)"></b-icon>
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
              label="Lote:"
              label-for="input-3"
              label-cols-sm="3"
              label-align-sm="right"
            >

           <b-input-group class="mb-2">
                <b-form-input type="search" placeholder="Pesquisar Lote" disabled v-model="lote.nome"></b-form-input>
                <b-input-group-prepend is-text>
                    <b-icon icon="search" @click="modalLotes = !modalLotes"></b-icon>
                    <b-modal id="bv-modal-pessoas" v-model="modalLotes" hide-footer>
                        <template #modal-title>
                        Selecionar Lote
                        </template>
                        <div class="d-block text-center">
                            <div>
                            <b-table hover outlined small head-variant="light" :items="lotes" :fields="fields_lotes">
                                <template #cell(acao)="row" >
                                <b-icon icon="check2-circle" @click="checkLote(row.item)"></b-icon>
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
              label="Data de Entrada:"
              label-for="input-3"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-2"
                v-model="alocar.dt_entrada"
                placeholder="Data de Entrada"
                type="date"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Data de Saida:"
              label-for="input-3"
              label-cols-sm="3"
              label-align-sm="right"
            >
              <b-form-input
                id="input-2"
                v-model="alocar.dt_saida"
                placeholder="Data de Saida"
                type="date"
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-4"
              label-for="input-4"
              cols-sm="3"
              align-sm="right"
            >
            <b-form-checkbox v-model="alocar.ativo_bez" name="check-button" switch>
                Bezerro
              </b-form-checkbox></b-form-group>

            <b-button v-if="!alocar.id" type="submit" variant="primary">Cadastrar</b-button>
            <b-button v-if="!alocar.id" type="reset" variant="danger">Limpar</b-button>
            <b-button v-if="alocar.id"  @click="updateAlocar(alocar)" variant="primary" >Atualizar</b-button>
            <b-button v-if="alocar.id" type="reset" variant="danger">Cancelar</b-button>
          </b-form-group>
        </b-form>
      </b-card>
    </div>
    <div>
      <b-table hover outlined small head-variant="light"  :items="alocacoes" :fields="fields_animais_lotes">
        <template #cell(actions)="row" >
          <b-button @click="findAlocar(row.item.id)" size="sm" class="mr-2" variant="outline-primary">
           Editar 
          </b-button>
        </template>
         <template #cell(bezerro)="row"  >
          <b-form-checkbox size="sm" v-model=row.item.ativo_bez disabled></b-form-checkbox>
        </template>
        <template #cell(createdAt)="row"  >
          {{getFormato(row.item.createdAt)}}
        </template>
        <template #cell(updatedAt)="row"  >
          {{getFormato(row.item.updatedAt)}}
        </template>
        <template #cell(dt_entrada)="row"  >
          {{getFormato(row.item.dt_entrada)}}
        </template>
        <template #cell(dt_saida)="row"  >
          {{getFormato(row.item.dt_saida)}}
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
      alocacoes: [],
      alocar: {
        id_fk_animal: '',
        id_fk_lote: ''
      },
      animal: {},
      animais: [],
      lote: {},
      lotes: [],
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
          label: 'Nascimento'
        },
        {
          key: 'id_fazenda',
          sortable: true,
          label: 'Fazenda'
        },
        {
          key: 'fk_id_pessoas',
          sortable: true,
          label: 'Pessoa'
        },
        {
          key: 'acao',
          label: ''
        }

      ],
      fields_lotes: [
        {
          key: 'nome',
          sortable: true
        },
        {
          key: 'descricao',
          label: 'Descrição'
        },
        {
          key: 'acao',
          label: ''
        }
      ],
      fields_animais_lotes: [
        {
          key: 'id',
          sortable: true,
          label: 'ID'
        },
        {
          key: 'id_fk_animal',
          sortable: true,
          label: 'ID Animal'
        },
        {
          key: 'id_fk_lote',
          sortable: true,
          label: 'ID Lote'
        },
        {
          key: 'dt_entrada',
          sortable: true,
          label: 'Entrada'
        },
        {
          key: 'dt_saida',
          sortable: true,
          label: 'Saida'
        },
        {
          key: 'bezerro',
          sortable: true,
          label: 'Bezerro'
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
          key: 'updatedAt',
          sortable: true,
          label: 'Ultima Modificação'
        },
        {
          key: 'actions',
          label: ''
        }
      ],
      modalAnimais: false,
      modalLotes: false
    }
  },
  computed: {
    dataEntrada: {
      get () {
        return this.alocar.dt_entrada ? this.getData(this.alocar.dt_entrada) : null
      },
      set (val) {
        this.alocar.dt_entrada = val
      }
    },
    dataSaida: {
      get () {
        return this.alocar.dt_saida ? this.getData(this.alocar.dt_saida) : null
      },
      set (val) {
        this.alocar.dt_saida = val
      }
    }
  },
  methods: {
    onReset (event) {
      event.preventDefault()
      this.alocar = {}
    },
    buscarAnimais () {
      axios
        .get(`/animal`)
        .then(res => {
          this.animais =
            res.data
        })
        .catch(error => console.log(error))
    },
    buscarLotes () {
      axios
        .get(`/lote`)
        .then(res => {
          this.lotes =
            res.data
        })
        .catch(error => console.log(error))
    },
    buscar () {
      axios
        .get('/alocar', { crossdomain: true })
        .then(res => {
          this.alocacoes = res.data
        })
        .catch(error => console.log(error))
    },
    buscarLote (loteId) {
      const lote = this.lotes.find(lote => lote.id === loteId)
      return lote
    },
    buscarAnimal (animalId) {
      const animal = this.animais.find(animal => animal.id === animalId)
      return animal
    },
    checkAnimal (animal) {
      this.animal = animal
      this.alocar.id_fk_animal = animal.id
      this.modalAnimais = !this.modalAnimais
    },
    checkLote (lote) {
      this.lote = lote
      this.alocar.id_fk_lote = lote.id
      this.modalLotes = !this.modalLotes
    },
    store (novo) {
      axios
        .post('/alocar', novo)
        .then(res => {
          this.success = res
        })
        .catch(error => console.log(error))
    },
    updateAlocar (alocaUp) {
      axios
        .put(`/alocar/${alocaUp.id}`, alocaUp)
        .then(res => {
          console.log('atualizado')
          this.buscar()
        })
        .catch(error => console.log(error))
    },
    getData (data) {
      return moment.parseZone(data).utcOffset(0).format('YYYY-MM-DD')
    },
    getFormato (data) {
      return moment.parseZone(data).utcOffset(0).format('DD/MM/YYYY')
    },
    findAlocar (alocaId) {
      axios
        .get(`/alocar/${alocaId}`)
        .then(res => {
          this.alocar = res.data
          this.alocar.dt_entrada = this.getData(this.alocar.dt_entrada)
          this.alocar.dt_saida = this.getData(this.alocar.dt_saida)
          this.lote = this.buscarLote(this.alocar.id_fk_lote)
          this.animal = this.buscarAnimal(this.alocar.id_fk_animal)
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.buscarLotes()
    this.buscarAnimais()
    this.buscar()
  }
}
</script>


<style>
  svg{
    cursor: pointer;
  }
</style>