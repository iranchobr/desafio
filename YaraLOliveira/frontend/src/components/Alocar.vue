<template>
  <div>
    <br />
    <form id="form" @submit="store(alocar)">
      <div id="ladoL" class="form-group col-md-6">
        <label for="input4">Selecione um Lote:</label>
        <input
          type="text"
          class="form-control"
          placeholder="selecione na tabela abaixo"
          readonly="readonly"
          v-model="alocar.id_fk_lote"
        />
      </div>
      <div id="ladoA" class="form-group col-md-6">
        <label for="input4">Selecione um Animal:</label>
        <input
          type="text"
          class="form-control"
          placeholder="selecione na tabela abaixo"
          readonly="readonly"
          v-model="alocar.id_fk_animal"
        />
      </div>
      <!--  -->
      <table id="L" class="table table-dark">
        <thead class="thead-dark">
          <!-- parte superior da tabela - |id| nome|  seleciona | -->
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nome</th>
            <th scope="col" style="width: 200px;">action</th>
          </tr>
        </thead>
        <tbody>
          <!--  imput de dados  -->
          <tr v-for="lote in lotes" :key="lote.id">
            <th scope="row">{{lote.id}}</th>
            <td>{{lote.nome}}</td>
            <td>
              <button
                @click.prevent="alocar.id_fk_lote = lote.id"
                class="btn btn-warning"
              >selecionar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!--  -->
      <table id="A" class="table">
        <thead class="thead-dark">
          <!-- parte superior da tabela - |id| nome|  seleciona | -->
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nome</th>
            <th scope="col" style="width: 200px;">action</th>
          </tr>
        </thead>
        <tbody>
          <!--  imput de dados  -->
          <tr v-for="animal in animais" :key="animal.id">
            <th scope="row">{{animal.id}}</th>
            <td>{{animal.nome}}</td>
            <td>
              <button
                @click.prevent="alocar.id_fk_animal= animal.id"
                class="btn btn-warning"
              >selecionar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <!--  -->
      <div id="l" class="form-group col-md-6">
        <label for="inputNome4">Data entrada</label>
        <input :readonly="alocar.id? true : false" type="date" class="form-control" v-model="dataEntrada" />
      </div>
      <div id="a" class="form-group col-md-6">
        <label for="inputNome4">Data saida</label>
        <input :readonly="!alocar.id? true : false" type="date" class="form-control" v-model="dataSaida" />
      </div>
      <!-- arrumar  -->
      <div>
       <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="alocar.ativo_bez">
        <label class="form-check-label" for="exampleCheck1">Tem Bezerro</label>
       </div>
      <!--  -->
      <button v-if="!alocar.id" type="submit" class="btn btn-primary" style="margin: 5%">Cadastrar</button>
      <!-- se o lote nao existir=> cadastre -->
      <button v-if="alocar.id" @click="updateAlocar(alocar)" style="margin: 5%" class="btn btn-primary">Atualizar</button>
      <!-- se o lote existir => atualize -->
      <button v-if="alocar.id" @click="alocar = {}" style="margin: 5%" class="btn btn-primary">Cancelar</button>

    </form>
    <!--  -->

    <table class="table table-striped table-dark">
      <thead class="thead-dark">
        <tr>
          <th scope="col">id</th>
          <th scope="col">lote</th>
          <th scope="col">animal</th>
          <th scope="col">bezerro</th>
          <th scope="col">data entrada</th>
          <th scope="col">data saida</th>
          <th scope="col" style="width: 200px;">action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alocar in alocacoes" :key="alocar.id">
          <th scope="row">{{alocar.id}}</th>
          <td>{{alocar.id_fk_lote}}</td>
          <td>{{alocar.id_fk_animal}}</td>
          <td>{{alocar.ativo_bez ? 'sim' : 'não'}}</td>
          <td>{{getFormato(alocar.dt_entrada)}}</td>
          <td>{{alocar.dt_saida ? getFormato(alocar.dt_saida) : 'em andamento'}}</td>
          <td>
            <button @click="findAlocar(alocar.id)" class="btn btn-warning">Saida</button>
          </td>
        </tr>
      </tbody>
    </table>
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
      lotes: []
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
    buscarAnimais () {
      axios
        .get(`/animal`)
        .then(res => {
          this.animais =
            res.data /* .map(animal => { this.options.push({'text': animal.nome, 'value': animal.id}) }) */
        })
        .catch(error => console.log(error))
    },
    buscarLotes () {
      axios
        .get(`/lote`)
        .then(res => {
          this.lotes =
            res.data /* .map(animal => { this.options.push({'text': animal.nome, 'value': animal.id}) }) */
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
        })
        .catch(error => console.log(error))
    },
    findAlocar (alocaId) {
      axios
        .get(`/alocar/${alocaId}`)
        .then(res => {
          this.alocar = res.data
        })
        .catch(error => console.log(error))
    },
    getData (data) {
      return moment.parseZone(data).utcOffset(0).format('YYYY-MM-DD')
    },
    getFormato (data) {
      return moment.parseZone(data).utcOffset(0).format('DD/MM/YYYY')
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
#a {
  width: 50%;
  float: right;
}
#l {
  width: 50%;
  float: left;
}
#A {
  transform: scale(0.9);
  width: 50%;
  float: right;
}
#L {
  transform: scale(0.9);
  width: 50%;
  float: left;
}
#ladoA {
  width: 50%;
  float: right;
}
#ladoL {
  width: 50%;
  float: left;
}
#geral {
  display: flex-colum;
}
#form {
  margin: 20px 250px;
}
</style>
