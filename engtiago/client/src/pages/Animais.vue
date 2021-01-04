<template>
  <q-page padding>
    <q-table
      :loading="loadingData"
      :data="data"
      :columns="columns"
      :filter="filter"
      separator="vertical"
    >
      <template v-slot:top-left>
        <span class="text-h5"> Animais </span>
        <q-btn
          round
          color="green-8"
          @click="createDialog = true"
          size="sm"
          icon="fas fa-plus"
        />
      </template>
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Pesquisar"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <q-td
        slot="body-cell-actions"
        slot-scope="props"
        :props="props"
        style="width: 100px"
      >
        <q-btn
          color="white"
          text-color="black"
          class="caption-text"
          icon="fas fa-bars"
          flat
        >
          <q-popup-proxy>
            <q-list bordered separator>
              <q-item
                @click="
                  () => {
                    editID = props.row.id
                    editDialog = true
                  }
                "
                clickable
                v-ripple
              >
                <q-item-section>
                  <span>
                    <q-icon name="fas fa-edit" class="q-mr-xs" />Editar</span
                  >
                </q-item-section>
              </q-item>

              <q-item @click="deleteAnimal(props.row.id)" clickable v-ripple>
                <q-item-section>
                  <q-item-label>
                    <span
                      ><q-icon
                        name="fas fa-trash-alt"
                        class="q-mr-xs"
                      />Excluir</span
                    >
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                @click="
                  viewID = props.row.id
                  viewDialog = true
                "
                clickable
                v-ripple
              >
                <q-item-section>
                  <q-item-label>
                    <span
                      ><q-icon name="fas fa-eye" class="q-mr-xs" />Abrir</span
                    >
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-popup-proxy>
        </q-btn>
      </q-td>
    </q-table>

    <q-dialog style="width: 700px;" v-model="createDialog">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">Adicionar Novos Animais</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="reqObj.no_animal"
            label="Nome"
          />
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="reqObj.no_raca"
            label="Raça"
          />
          <q-input
            type="number"
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="reqObj.vr_peso"
            label="Peso (kg)"
          />
          <q-select
            color="green-8"
            class="q-pa-sm"
            option-label="no_pessoa"
            option-value="id"
            map-options
            emit-value
            outlined
            v-model="reqObj.fk_id_pessoa"
            :options="pessoaData"
            label="Responsável"
          />
          <q-input
            type="number"
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="reqObj.id_fazenda"
            label="COD Fazenda"
          />
          <q-select
            color="green-8"
            class="q-pa-sm"
            map-options
            emit-value
            outlined
            v-model="reqObj.sexo"
            :options="[
              {
                label: 'Masculino',
                value: 'M'
              },
              {
                label: 'Feminino',
                value: 'F'
              }
            ]"
            label="Sexo"
          />
          <q-input
            class="q-pa-sm"
            v-model="reqObj.dt_nascimento"
            outlined
            type="date"
            hint="Data de Nascimento"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
          <q-btn label="Criar Animal" @click="createAnimal" color="green-8" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog style="width: 700px;" v-model="editDialog">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">Editar Animal</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="editOBJ.no_animal"
            label="Nome"
          />
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="editOBJ.no_raca"
            label="Raça"
          />
          <q-input
            type="number"
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="editOBJ.vr_peso"
            label="Peso (kg)"
          />
          <q-select
            color="green-8"
            class="q-pa-sm"
            option-label="no_pessoa"
            option-value="id"
            map-options
            emit-value
            outlined
            v-model="editOBJ.fk_id_pessoa"
            :options="pessoaData"
            label="Responsável"
          />
          <q-input
            type="number"
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="editOBJ.id_fazenda"
            label="COD Fazenda"
          />
          <q-select
            color="green-8"
            class="q-pa-sm"
            map-options
            emit-value
            outlined
            v-model="editOBJ.sexo"
            :options="[
              {
                label: 'Masculino',
                value: 'M'
              },
              {
                label: 'Feminino',
                value: 'F'
              }
            ]"
            label="Sexo"
          />
          <q-input
            class="q-pa-sm"
            v-model="editOBJ.dt_nascimento"
            outlined
            type="date"
            hint="Data de Nascimento"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
          <q-btn label="Editar Animal" @click="editAnimal" color="green-8" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog style="width: 700px;" v-model="addLoteDialog">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">Adiconar lote</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-select
            color="green-8"
            class="q-pa-sm"
            option-label="no_lote"
            option-value="id"
            map-options
            emit-value
            outlined
            v-model="loteOBJ.fk_id_lote"
            :options="dataLotes"
            label="Lote"
          />
          <q-input
            class="q-pa-sm q-mb-sm"
            v-model="loteOBJ.dt_entrada"
            outlined
            type="date"
            hint="Data de Entrada"
          />
          <q-input
            class="q-pa-sm"
            v-model="loteOBJ.dt_saida"
            outlined
            type="date"
            hint="Data de Saida"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
          <q-btn label="Adicionar Lote" @click="addLote" color="green-8" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog style="width: 800px" v-model="viewDialog">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">Animal</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p>
            <span class="text-bold">Nome Animal: </span>{{ viewOBJ.no_animal }}
          </p>
          <p><span class="text-bold">Raça: </span>{{ viewOBJ.no_raca }}</p>
          <p>
            <span class="text-bold">Responsável: </span>{{ viewOBJ.no_pessoa }}
          </p>
          <p><span class="text-bold">Peso: </span>{{ viewOBJ.vr_peso }}</p>
          <p>
            <span class="text-bold">COD Fazenda: </span>{{ viewOBJ.id_fazenda }}
          </p>
          <p>
            <span class="text-bold">Data de Nascimento: </span
            >{{ viewOBJ.dt_nascimento }}
          </p>
          <p>
            <span class="text-bold">Sexo: </span
            >{{ viewOBJ.sexo === 'M' ? 'Masculino' : 'Feminino' }}
          </p>

          <q-table
            :loading="loadingData"
            :data="lotesData"
            :columns="lotesColumns"
            :filter="lotesfilter"
            separator="vertical"
          >
            <template v-slot:top-left>
              <span class="text-h5"> Lotes </span>
              <q-btn
                round
                color="green-8"
                @click="addLoteDialog = true"
                size="sm"
                icon="fas fa-plus"
              />
            </template>
            <template v-slot:top-right>
              <q-input
                borderless
                dense
                debounce="300"
                v-model="lotesfilter"
                placeholder="Pesquisar"
              >
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <q-td
              slot="body-cell-actions"
              slot-scope="props"
              :props="props"
              style="width: 100px"
            >
              <q-btn
                flat
                color="white"
                text-color="black"
                class="caption-text"
                icon="fas fa-trash-alt"
                @click="deleteLote(props.row.id)"
              />
            </q-td>
          </q-table>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import AnimalService from '../service/AnimalService'
import PessoaService from '../service/PessoaService'
import LotexAnimais from '../service/LotexAnimais'
import LoteService from '../service/LoteService'
export default {
  name: 'Pessoa',
  data () {
    return {
      AnimalService: new AnimalService(),
      PessoaService: new PessoaService(),
      LotexAnimais: new LotexAnimais(),
      LoteService: new LoteService(),
      reqObj: {
        no_animal: '',
        no_raca: '',
        fk_id_pessoa: null,
        id_fazenda: null,
        vr_peso: null,
        sexo: '',
        dt_nascimento: Date.now()
      },
      data: [],
      pessoaData: [],
      dataLotes: [],
      lotesData: [],
      lotesColumns: [
        {
          label: 'Lote',
          name: 'fk_id_lote',
          field: 'fk_id_lote',
          align: 'center',
          sortable: true
        },
        {
          label: 'Entrada',
          name: 'dt_entrada',
          field: 'dt_entrada',
          format: dt => new Date(dt).toLocaleDateString(),
          align: 'center',
          sortable: true
        },
        {
          label: 'Saida',
          name: 'dt_saida',
          field: 'dt_saida',
          format: dt => (dt ? new Date(dt).toLocaleDateString() : '-'),
          align: 'center',
          sortable: true
        },
        {
          label: 'Ultima Movimentação',
          name: 'dt_ultima_movimentacao',
          field: 'dt_ultima_movimentacao',
          format: dt => (dt ? new Date(dt).toLocaleDateString() : '-'),
          align: 'center',
          sortable: true
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Ações',
          field: 'actions',
          sortable: true
        }
      ],
      loteOBJ: {
        fk_id_animal: null,
        fk_id_lote: null,
        dt_entrada: Date.now(),
        dt_saida: '',
        dt_ultima_movimentacao: Date.now(),
        ic_bezerro: 1
      },
      lotesfilter: '',
      filter: '',
      columns: [
        {
          label: 'Nome Animal',
          name: 'no_animal',
          field: 'no_animal',
          align: 'center',
          sortable: true
        },
        {
          label: 'Raça',
          name: 'no_raca',
          field: 'no_raca',
          align: 'center',
          sortable: true
        },
        {
          label: 'Responsável',
          field: 'no_pessoa',
          name: 'no_pessoa',
          align: 'center',
          sortable: true
        },
        {
          label: 'COD Fazenda',
          field: 'id_fazenda',
          name: 'id_fazenda',
          align: 'center',
          sortable: true
        },
        {
          label: 'Peso (kg)',
          field: 'vr_peso',
          name: 'vr_peso',
          align: 'center',
          sortable: true
        },
        {
          label: 'Sexo',
          field: 'sexo',
          name: 'sexo',
          align: 'center',
          sortable: true
        },
        {
          label: 'Nascimento',
          field: 'dt_nascimento',
          name: 'dt_nascimento',
          align: 'center',
          sortable: true
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Ações',
          field: 'actions',
          sortable: true
        }
      ],
      editID: null,
      editOBJ: {
        no_animal: '',
        no_raca: '',
        fk_id_pessoa: null,
        id_fazenda: null,
        vr_peso: null,
        sexo: '',
        dt_nascimento: Date.now()
      },
      viewID: null,
      viewOBJ: {
        no_animal: '',
        no_raca: '',
        fk_id_pessoa: null,
        no_pessoa: '',
        id_fazenda: null,
        vr_peso: null,
        sexo: '',
        dt_nascimento: null
      },
      loadingData: false,
      createDialog: false,
      editDialog: false,
      addLoteDialog: false,
      viewDialog: false
    }
  },
  mounted () {
    this.getAnimal()
  },
  watch: {
    editID (id) {
      this.editOBJ = this.data.find(item => item.id === id)
    },
    viewID (id) {
      this.viewOBJ = this.data.find(item => item.id === id)
      this.getByAnimalId(id)
      this.loteOBJ.fk_id_animal = id
    }
  },
  methods: {
    getAnimal () {
      this.loadingData = true
      this.AnimalService.list()
        .then(response => {
          this.data = response
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.loadingData = false
          this.getPessoa()
          this.getLote()
        })
    },
    getLote () {
      this.loadingData = true
      this.LoteService.list()
        .then(response => {
          this.dataLotes = response
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.loadingData = false
          this.getPessoa()
        })
    },
    getByAnimalId (id) {
      this.loadingData = true
      this.LotexAnimais.getByAnimalId(id)
        .then(response => {
          this.lotesData = response
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.loadingData = false
        })
    },
    getPessoa () {
      this.loadingData = true
      this.PessoaService.list()
        .then(response => {
          this.pessoaData = response
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.loadingData = false
          this.addNomePessoa()
        })
    },
    addNomePessoa () {
      this.data = this.data.map(animal => {
        animal.no_pessoa = this.pessoaData.find(
          p => animal.fk_id_pessoa === p.id
        ).no_pessoa

        return animal
      })
    },
    deleteAnimal (id) {
      this.loadingData = true
      this.AnimalService.remove(id)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Animal deletado com sucesso.'
          })
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.loadingData = false
          this.getAnimal()
        })
    },
    deleteLote (id) {
      this.loadingData = true
      this.LotexAnimais.remove(id)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Lote removido com sucesso.'
          })
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.loadingData = false
          this.getByAnimalId(this.viewID)
        })
    },
    addLote () {
      this.loadingData = true
      this.LotexAnimais.create(this.loteOBJ)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Lote adicionado com sucesso.'
          })
          this.clearFieldsLote()
          this.addLoteDialog = false
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.loadingData = false
          this.getByAnimalId(this.viewID)
        })
    },
    createAnimal () {
      this.loadingData = true
      this.AnimalService.create(this.reqObj)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Animal criado com sucesso.'
          })
          this.clearFields()
          this.createDialog = false
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.loadingData = false
          this.getAnimal()
        })
    },
    editAnimal () {
      this.loadingData = true
      this.AnimalService.update(this.editOBJ)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Animal editado com sucesso.'
          })
          this.editDialog = false
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.loadingData = false
          this.getAnimal()
        })
    },
    clearFields () {
      this.reqObj = {
        no_animal: '',
        no_raca: '',
        fk_id_pessoa: null,
        id_fazenda: null,
        vr_peso: null,
        sexo: '',
        dt_nascimento: Date.now()
      }
    },
    clearFieldsLote () {
      this.loteOBJ = {
        fk_id_animal: this.viewID,
        fk_id_lote: null,
        dt_entrada: Date.now(),
        dt_saida: '',
        dt_ultima_movimentacao: Date.now(),
        ic_bezerro: 1
      }
    }
  }
}
</script>

<style></style>
