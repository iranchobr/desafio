<template>
  <div class="container-view">
    <h1>{{ title }}</h1>
    <div class="div-btn-m">
      <b-button v-b-modal.modal-animal variant="success" @click="open">Adicionar Animal</b-button>
    </div>
    <div>

      <b-modal id="modal-animal" size="xl" centered title="Animal" @ok="save">
        <b-row>
          <b-col sm=12 md=6>
            <b-form-input class="my-1" v-model="animal.no_animal" placeholder="Nome"></b-form-input>
          </b-col>
          <b-col sm=12 md=6>
            <b-form-input class="my-1" v-model="animal.no_raca" placeholder="Raça"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm=12>
            <b-form-input class="my-1" type="number" v-model="animal.vr_peso" placeholder="Peso"></b-form-input>
          </b-col>
          <b-col>
            <b-form-select class="my-1" v-model="animal.sexo" placeholder="Sexo" center>
              <b-form-select-option :value="null" disabled>Selecione o sexo</b-form-select-option>
              <b-form-select-option value="M">Masculino</b-form-select-option>
              <b-form-select-option value="F">Feminino</b-form-select-option>
            </b-form-select>
          </b-col>
          <b-col>
            <b-form-input class="my-1" v-model="animal.id_fazenda" placeholder="Id na Fazenda"></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-1">
            <b-form-select class="my-1" v-model="animal.fk_id_people" placeholder="Propietário" center>
              <b-form-select-option :value="null" disabled>Selecione o proprietário</b-form-select-option>
              <b-form-select-option v-for="p, index in people" :key="index" :value="p.id">{{p.no_pessoa}}</b-form-select-option>
            </b-form-select>
          </b-col>
          <b-col class="my-1">
            <b-form-datepicker
              id="datepicker-animal"
              class="my-1"
              v-model="animal.dt_nascimento"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              locale="pt-BR"
              placeholder="Data de Nascimento"
            ></b-form-datepicker>
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
        id="register-animal-table"
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
        <template #cell(sexo)="data">
          {{ data.item.sexo == 'M' ? 'Masculino' : 'Feminino' }}
        </template>
        <template #cell(people)="data">
          {{ data.item.people ? data.item.people.no_pessoa : '' }}
        </template>
        <template #cell(dt_nascimento)="data">
          {{ data.item.dt_nascimento ? moment(data.item.dt_nascimento).format('DD/MM/YYYY') : '' }}
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

<script src="./Animal.js">
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