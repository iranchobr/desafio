<template>
  <q-page padding>
    <q-table
      :loading="loadingData"
      :data="data"
      :columns="columns"
      row-key="no_email"
      :filter="filter"
      separator="vertical"
    >
      <template v-slot:top-left>
        <span class="text-h5"> Lotes </span>
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

              <q-item @click="deleteLote(props.row.id)" clickable v-ripple>
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
          <div class="text-h6">Adicionar Novos Lotes</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="reqObj.no_lote"
            label="Nome"
          />
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="reqObj.ds_lote"
            label="Descrição"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
          <q-btn label="Criar Lote" @click="createLote" color="green-8" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog style="width: 700px;" v-model="editDialog">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">Editar Lote</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="editOBJ.no_lote"
            label="Nome"
          />
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="editOBJ.ds_lote"
            label="Descrição"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
          <q-btn label="Editar Lote" @click="editLote" color="green-8" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="viewDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Lote</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p><span class="text-bold">Lote: </span>{{ viewOBJ.no_lote }}</p>
          <p><span class="text-bold">Descrição: </span>{{ viewOBJ.ds_lote }}</p>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import LoteService from '../service/LoteService'
export default {
  name: 'Pessoa',
  data () {
    return {
      LoteService: new LoteService(),
      reqObj: {
        no_lote: '',
        ds_lote: ''
      },
      data: [],
      filter: '',
      columns: [
        {
          label: 'Lote',
          name: 'no_lote',
          field: 'no_lote',
          align: 'center',
          sortable: true
        },
        {
          label: 'Descrição',
          name: 'ds_lote',
          field: 'ds_lote',
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
        no_lote: '',
        ds_lote: ''
      },
      viewID: null,
      viewOBJ: {
        no_lote: '',
        ds_lote: ''
      },
      loadingData: false,
      createDialog: false,
      editDialog: false,
      viewDialog: false
    }
  },
  mounted () {
    this.getLote()
  },
  watch: {
    editID (id) {
      this.editOBJ = this.data.find(item => item.id === id)
    },
    viewID (id) {
      this.viewOBJ = this.data.find(item => item.id === id)
    }
  },
  methods: {
    getLote () {
      this.loadingData = true
      this.LoteService.list()
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
        })
    },
    deleteLote (id) {
      this.loadingData = true
      this.LoteService.remove(id)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Lote deletado com sucesso.'
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
          this.getLote()
        })
    },
    createLote () {
      this.loadingData = true
      this.LoteService.create(this.reqObj)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Lote criado com sucesso.'
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
          this.getLote()
        })
    },
    editLote () {
      this.loadingData = true
      this.LoteService.update(this.editOBJ)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Lote editado com sucesso.'
          })
          this.clearFields()
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
          this.getLote()
        })
    },
    clearFields () {
      this.reqObj = {
        no_lote: '',
        ds_lote: ''
      }
    }
  }
}
</script>

<style></style>
