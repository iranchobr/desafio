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
        <span class="text-h5"> Pessoas </span>
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

              <q-item @click="deletePessoa(props.row.id)" clickable v-ripple>
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
          <div class="text-h6">Adicionar Novas Pessoas</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="reqObj.no_pessoa"
            label="Nome"
          />
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="reqObj.no_email"
            label="Email"
          />
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="reqObj.endereco"
            label="Endereço"
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
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
          <q-btn label="Criar Pessoa" @click="createPessoa" color="green-8" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog style="width: 700px;" v-model="editDialog">
      <q-card class="full-width">
        <q-card-section>
          <div class="text-h6">Editar Pessoa</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="editOBJ.no_pessoa"
            label="Nome"
          />
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="editOBJ.no_email"
            label="Email"
          />
          <q-input
            color="green-8"
            class="q-pa-sm"
            outlined
            v-model="editOBJ.endereco"
            label="Endereço"
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
          <q-toggle v-model="editOBJ.ic_ativo" color="green-8" label="Ativo" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
          <q-btn label="Editar Pessoa" @click="editPessoa" color="green-8" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="viewDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Pessoa</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <p><span class="text-bold">Nome: </span>{{ viewOBJ.no_pessoa }}</p>
          <p><span class="text-bold">Email: </span>{{ viewOBJ.no_email }}</p>
          <p><span class="text-bold">Endereço: </span>{{ viewOBJ.endereco }}</p>
          <p>
            <span class="text-bold">Sexo: </span
            >{{ viewOBJ.sexo === 'M' ? 'Masculino' : 'Feminino' }}
          </p>
          <p>
            <span class="text-bold">Ativo: </span
            >{{ viewOBJ.ic_ativo ? 'Sim' : 'Não' }}
          </p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar" color="grey" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import PessoaService from '../service/PessoaService'
export default {
  name: 'Pessoa',
  data () {
    return {
      PessoaService: new PessoaService(),
      reqObj: {
        no_pessoa: '',
        no_email: '',
        endereco: '',
        sexo: ''
      },
      data: [],
      filter: '',
      columns: [
        {
          name: 'no_pessoa',
          label: 'Nome',
          align: 'center',
          field: 'no_pessoa',
          sortable: true
        },
        {
          name: 'no_email',
          align: 'center',
          label: 'Email',
          field: 'no_email',
          sortable: true
        },
        {
          name: 'endereco',
          align: 'center',
          label: 'Endereço',
          field: 'endereco',
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
        no_pessoa: '',
        no_email: '',
        endereco: '',
        sexo: '',
        ic_ativo: true
      },
      viewID: null,
      viewOBJ: {
        no_pessoa: '',
        no_email: '',
        endereco: '',
        sexo: '',
        ic_ativo: true
      },
      loadingData: false,
      createDialog: false,
      editDialog: false,
      viewDialog: false
    }
  },
  mounted () {
    this.getPessoa()
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
    getPessoa () {
      this.loadingData = true
      this.PessoaService.list()
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
    deletePessoa (id) {
      this.loadingData = true
      this.PessoaService.remove(id)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Pessoa deletada com sucesso.'
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
          this.getPessoa()
        })
    },
    createPessoa () {
      this.loadingData = true
      this.PessoaService.create(this.reqObj)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Pessoa criada com sucesso.'
          })
          this.clearFields()
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.createDialog = false
          this.loadingData = false
          this.getPessoa()
        })
    },
    editPessoa () {
      this.loadingData = true
      this.PessoaService.update(this.editOBJ)
        .then(response => {
          this.$q.notify({
            type: 'positive',
            message: 'Pessoa Editada com sucesso.'
          })
          this.clearFields()
        })
        .catch(error => {
          this.$q.notify({
            type: 'negative',
            message: 'Um erro aconteceu:' + error
          })
        })
        .finally(() => {
          this.loadingData = false
          this.editDialog = false
          this.getPessoa()
        })
    },
    clearFields () {
      this.reqObj = {
        no_pessoa: '',
        no_email: '',
        endereco: '',
        sexo: ''
      }
    }
  }
}
</script>

<style></style>
