<template>
  <div class="container-view">
    <h1>{{ title }}</h1>
    <div class="div-btn-m">
      <b-button v-b-modal.modal-batch variant="success" @click="open">Adicionar Lote</b-button>
    </div>
    <div>

      <b-modal id="modal-batch" size="xl" centered title="Lote" @ok="save">
        <b-row>
          <b-col>
            <b-form-input class="my-1" v-model="batch.no_lote" placeholder="Nome"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <template>
              <div>
                <b-form-textarea
                  id="textarea"
                  class="my-1"
                  v-model="batch.ds_lote"
                  placeholder="Descrição"
                  rows="6"
                  max-rows="12"
                ></b-form-textarea>
              </div>
            </template>
          </b-col>
        </b-row>
        <template #modal-footer="{ ok, cancel }">
          <b-button size="md" variant="success" @click="ok()">
            Salvar
          </b-button>
          <b-button size="md" variant="danger" @click="cancel()">
            Cancelar
          </b-button>
        </template>
      </b-modal>
    </div>

    <div>
      <b-table
        id="register-batch-table"
        striped
        hover
        :fields="fields"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        responsive="md"
      >
        <template #cell(items)="data">
          <b-button variant="warning" @click="edit(data.item.id)">
            <b-icon-pen />
          </b-button>
          <b-button variant="danger" @click="remove(data.item.id)">
            <b-icon-trash />
          </b-button>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="rows"
        aria-controls="register-table"
        align="center"
      ></b-pagination>
    </div>
    <div>
      <b-alert
        :show="dismissCountDown"
        dismissible
        :variant="variantAlert"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >
        <p>{{ messageAlert }}</p>
        <b-progress
          :variant="variantAlert"
          :max="dismissSecs"
          :value="dismissCountDown"
          height="4px"
        ></b-progress>
      </b-alert>
    </div>
  </div>
</template>

<script src="./Batch.js">
</script>

<style lang="scss">
  .modal-footer {
    justify-content: center;
  }

  .alert {
    max-width: 500px;
    margin: auto;
  }

  .container-view {
    padding: 20px;
  }

  .div-btn-m {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
</style>