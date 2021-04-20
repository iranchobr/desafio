<template>
  <div class="container-view">
    <h1>{{ title }}</h1>
    <div class="div-btn-m">
      <b-button v-b-modal.modal-animal-batch variant="success" @click="open">Adicionar Movimentação</b-button>
    </div>
    <div>

      <b-modal id="modal-animal-batch" size="xl" centered title="Movimentação" @ok="save">
        <b-row>
          <b-col>
            <b-form-select class="my-1" v-model="animalBatch.fk_id_animal" placeholder="Animal" center>
              <b-form-select-option :value="null" disabled>Selecione o animal</b-form-select-option>
              <b-form-select-option v-for="a, index in animals" :key="index" :value="a.id">{{a.no_animal}}</b-form-select-option>
            </b-form-select>
          </b-col>
          <b-col>
            <b-form-select class="my-1" v-model="animalBatch.fk_id_batch" placeholder="Lote" center>
              <b-form-select-option :value="null" disabled>Selecione o lote</b-form-select-option>
              <b-form-select-option v-for="b, index in batches" :key="index" :value="b.id">{{b.no_lote}}</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-1">
            <b-form-datepicker
              id="dt-entrada"
              class="my-1"
              v-model="animalBatch.dt_entrada"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              :max="animalBatch.dt_saida"
              locale="pt-BR"
              placeholder="Data de Entrada"
            ></b-form-datepicker>
          </b-col>
          <b-col class="my-1">
            <b-form-datepicker
              id="dt-saida"
              class="my-1"
              v-model="animalBatch.dt_saida"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              :min="animalBatch.dt_entrada"
              locale="pt-BR"
              placeholder="Data de Saída"
            ></b-form-datepicker>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-1">
            <b-form-datepicker
              id="dt-ultima-movimentacao"
              class="my-1"
              v-model="animalBatch.dt_ultima_movimentacao"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              locale="pt-BR"
              placeholder="Data da Última Movimentação"
            ></b-form-datepicker>
          </b-col>
          <b-col class="my-1">
            <b-form-checkbox
              id="ic-bezerro"
              class="my-1"
              v-model="animalBatch.ic_bezerro"
              name="ic-bezerro"
              value=true
              unchecked-value=false
            >
              Bezerro
            </b-form-checkbox>
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
        id="register-animal-batch-table"
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
        <template #cell(animal)="data">
          {{ data.item.animal ? data.item.animal.no_animal : '' }}
        </template>
        <template #cell(batch)="data">
          {{ data.item.batch ? data.item.batch.no_lote : '' }}
        </template>
        <template #cell(dt_entrada)="data">
          {{ data.item.dt_entrada ? moment(data.item.dt_entrada).format('DD/MM/YYYY') : '' }}
        </template>
        <template #cell(dt_saida)="data">
          {{ data.item.dt_saida ? moment(data.item.dt_saida).format('DD/MM/YYYY') : '' }}
        </template>
        <template #cell(dt_ultima_movimentacao)="data">
          {{ data.item.dt_ultima_movimentacao ? moment(data.item.dt_ultima_movimentacao).format('DD/MM/YYYY') : '' }}
        </template>
        <template #cell(ic_bezerro)="data">
          {{ data.item.ic_bezerro ? 'Sim' : 'Não' }}
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

<script src="./AnimalBatch.js">
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