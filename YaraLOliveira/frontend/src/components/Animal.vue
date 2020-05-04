<template>
  <div>
        <!-- formulario cadastro animal -->
    <form id="form" @submit="store(animal)">
      <div class="form-row" >
        <div class="form-group col-md-6">
          <label for="inputNome4">Nome</label>
          <input type="Nome" class="form-control" id="inputNome4" placeholder="Nome" v-model="animal.nome" >
        </div>
        <div class="form-group col-md-6">
          <label for="input4">Fazenda</label>
          <input type="number" class="form-control" id="number" min="0" placeholder="ID" v-model="animal.id_fazenda" >
        </div>
        <div class="form-group col-md-6">
          <label for="input4">raça</label>
          <input type="text" class="form-control" id="input4" placeholder="ex: Nelore .." v-model="animal.raca" >
        </div>
        <div class="form-group col-md-6">
          <label for="input4">peso</label>
          <input type="number" class="form-control" id="number" min="0" placeholder="ex: 200" v-model="animal.peso" >
        </div>
        <div class="form-group col-md-6">
          <label for="input4">Data de Nascimento</label>
          <input type="date" class="form-control" id="date" placeholder="" v-model="animal.nascimento" >
        </div>
        <!-- disabilitar -->
         <div class="form-group col-md-6">
          <label for="input4">id usuario</label>
          <input type="text" class="form-control" id="input4" placeholder="selecione na tabela abaixo"  readonly="readonly" v-model="animal.fk_id_pessoas" >
        </div>
      </div>
      <div style="margin: 1%" class="form-row">
        <div class="form-group col" >
          <label  for="inputState">Sexo</label>
          <select id="inputState" class="selectpicker"  v-model="animal.sexo" >
            <option selected ></option>
            <option>M</option>
            <option>F</option>
          </select>
        </div>
      </div>
  <!--  -->
      <button v-if="!animal.id" type="submit" class="btn btn-primary" style="margin: 3%" >Cadastrar</button> <!-- se o lote nao existir=> cadastre -->
      <button v-if="animal.id" @click="updateAnimal(animal)" class="btn btn-primary">Atualizar</button> <!-- se o lote existir => atualize -->
      <button v-if="animal.id" @click="animal = {}" class="btn btn-primary">Cancelar</button> <!-- se cancelar limpe os campos -->
    </form>
<!-- tabela pessoa -->
 <p style=" width: 50%">  Selecione a pessoa vinculada ao animal</p>
    <table class="table table-dark">
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
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{user.id}}</th>
          <td>{{user.nome}}</td>
          <td>
            <button @click="animal.fk_id_pessoas = user.id" class="btn btn-warning" >selecionar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- tabela animal cadastrado -->

<table class="table" >
   <thead class="thead-dark">
    <tr>
      <th scope="col">id</th>
      <th scope="col">animal</th>
      <th scope="col">raça</th>
      <th scope="col">peso</th>
      <th scope="col" style="width: 200px;">action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="animal in animais" :key="animal.id">
      <th scope="row">{{animal.id}}</th>
      <td>{{animal.nome}} </td>
      <td>{{animal.raca}}</td>
      <td>{{animal.peso}}</td>
      <td>
        <button @click="findAnimal(animal.id)" class="btn btn-warning" >Editar</button>
        <button @click="deleteAnimal(animal.id)" class="btn btn-danger">Remove</button>
      </td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import axios from '../axios'
export default {
  data () {
    return {
      users: [], // dados pessoa
      user: {},
      animal: {
        fk_id_pessoas: ''
      }, // dados animais
      animais: {}, // todos dos animais
      success: null,
      error: []
    }
  },
  methods: {
    buscarUser () {
      axios.get(`/pessoa`, {crossdomain: true})
        .then(res => {
          this.users = res.data // <- user
        })
        .catch(error => console.log(error)
        )
    },
    /* -------------------------------------- */
    buscar () {
      axios.get('/animal', {crossdomain: true})
        .then(res => {
          this.animais = res.data
        })
        .catch(error => console.log(error)
        )
    },
    store (novo) {
      axios.post('/animal', novo)
        .then(res => {
          this.success = res
        })
        .catch(error => console.log(error))
    },
    updateAnimal (animalUp) {
      axios.put(`/animal/${animalUp.id}`, animalUp)
        .then(res => {
          console.log('atualizado')
        })
        .catch(error => console.log(error))
    },
    findAnimal (animalId) {
      axios.get(`/animal/${animalId}`)
        .then(res => {
          this.animal = res.data
          console.log(res.data)
        })
        .catch(error => console.log(error))
    },
    deleteAnimal (animalId) {
      axios.delete(`/animal/${animalId}`)
        .then(res => {
          console.log(res)
        })
      this.$router.push('/')
    }
  },
  created () {
    this.buscarUser()
    this.buscar()
  }
}
</script>

<style>
.table {
  transform: scale(0.9); /* diminui em 50% o tamanho total da tabela na impressão */
  width: 50%; float: left ;
 }
#geral{
  display: flex-colum;
}
#form{
  padding: 50px 150px;
  display: flex;
  align-items: center;
}
</style>
