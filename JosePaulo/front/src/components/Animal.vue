<template>
  <div>
       
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
          <label for="input4">Raça</label>
          <input type="text" class="form-control" id="input4" placeholder="ex: Nelore .." v-model="animal.raca" >
        </div>
        <div class="form-group col-md-6">
          <label for="input4">Peso</label>
          <input type="number" class="form-control" id="number" min="0" placeholder="ex: 200" v-model="animal.peso" >
        </div>
        <div class="form-group col-md-6">
          <label for="input4">Data de Nascimento</label>
          <input type="date" class="form-control" id="date" placeholder="" v-model="animal.nascimento" >
        </div>
      
         <div class="form-group col-md-6">
          <label for="input4">Id usuario</label>
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

      <button v-if="!animal.id" type="submit" class="btn btn-primary" style="margin: 3%" >Cadastrar</button> 
      <button v-if="animal.id" @click="updateAnimal(animal)" class="btn btn-primary">Atualizar</button> 
      <button v-if="animal.id" @click="animal = {}" class="btn btn-primary">Cancelar</button> 
    </form>
 <p style=" width: 50%"> Pessoa X Animal</p>
    <table class="table table-dark">
      <thead class="thead-dark">
        
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nome</th>
          <th scope="col" style="width: 200px;">Ativo</th>
        </tr>
      </thead>
      <tbody>
        
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{user.id}}</th>
          <td>{{user.nome}}</td>
          <td>
            <button @click="animal.fk_id_pessoas = user.id" class="btn btn-warning" >selecionar</button>
          </td>
        </tr>
      </tbody>
    </table>

    

<table class="table" >
   <thead class="thead-dark">
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Animal</th>
      <th scope="col">Raça</th>
      <th scope="col">Peso</th>
      <th scope="col" style="width: 200px;">Ativo</th>
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
      users: [], 
      user: {},
      animal: {
        fk_id_pessoas: ''
      }, 
      animais: {}, 
      success: null,
      error: []
    }
  },
  methods: {
    buscarUser () {
      axios.get(`/pessoa`, {crossdomain: true})
        .then(res => {
          this.users = res.data 
        })
        .catch(error => console.log(error)
        )
    },
   
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
  transform: scale(0.9); 
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
