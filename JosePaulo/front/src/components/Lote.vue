<template>
  <div id="geral">
  <form id="form" @submit="store(lote)">
  <div class="form-row" >
    <div class="form-group col-md-6">
      <label for="inputNome4">Nome</label>
      <input type="Nome" class="form-control" id="inputNome4" placeholder="Nome" v-model="lote.nome" >
    </div>
    <div class="form-group col-md-6">
      <label for="input4">descrição</label>
      <input type="text" class="form-control" id="input4" placeholder="Descrição" v-model="lote.descricao" >
    </div>
  </div>
  <button v-if="!lote.id" type="submit" class="btn btn-primary" style="margin: 4%" >Cadastrar</button>
  <button v-if="lote.id" @click="updateLote(lote)" class="btn btn-primary">Atualizar</button> 
  <button v-if="lote.id" @click="lote = {}" class="btn btn-primary">Cancelar</button> 
</form>

<table class="table">
  <thead class="thead-dark">

    <tr>
      <th scope="col">Id</th>
      <th scope="col">Nome</th>
      <th scope="col">Descrição</th>
      <th scope="col" style="width: 200px;">Ativo</th>
    </tr>
  </thead>
  <tbody>

    <tr v-for="lote in lotes" :key="lote.id">
      <th scope="row">{{lote.id}}</th>
      <td>{{lote.nome}}</td>
      <td>{{lote.descricao}}</td>
      <td>
        <button @click="findLote(lote.id)" class="btn btn-warning" >Editar</button>
        <button @click="deleteLote(lote.id)" class="btn btn-danger">Remove</button>
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
      lotes: [],
      lote: {}, 
      success: null, 
      error: [] 
    }
  },
  methods: {
    print () {
      console.log(this.lote)
    },
    buscar () {
     
      this.submitting = true
    
      axios.get('/lote', {crossdomain: true}) 
        .then(res => {
          this.lotes = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    
    store (novo) {
      axios.post('/lote', novo)
        .then(res => {
          this.success = res
        })
        .catch(function (error) {
          this.success = error
        })
    },
    
    findLote (loteId) {
      axios.get(`/lote/${loteId}`)
        .then(res => {
          this.lote = res.data
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
   
    updateLote (loteUp) {
      axios.put(`/lote/${loteUp.id}`, loteUp)
        .then(res => {
          console.log('atualizado')
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteLote (loteId) {
      axios.delete(`/lote/${loteId}`)
        .then(res => {
          console.log(res)
        })
      this.$router.push('/')
    }
  },
  created () {
    this.buscar()
    console.log(this)
  }
}

</script>

<style>
#geral{
  display: flex-colum;
}
#form{
  padding: 50px 150px;
  margin: 10px 200px;
  border-radius: 20px;
  display: flex;
  align-items: center;
}
</style>
