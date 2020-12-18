<template>
  <div id="geral">
    <form id="form" @submit="store(user)">
      <div class="form-row" >
        <div class="form-group col-md">
          <label for="inputNome4">Nome</label>
          <input type="Nome" class="form-control" id="inputNome4" placeholder="Nome" v-model="user.no_pessoa" >
        </div>
        <div class="form-group col-md">
          <label for="inputEmail4">Email</label>
          <input :readonly="user.id? true : false" type="Email" class="form-control" id="inputEmail4" placeholder="Email" v-model="user.no_email" >
        </div>
      </div>
      <div class="form-group col-md">
        <label for="inputAddress">Endereço</label>
        <input type="text" class="form-control" id="inputAddress"  placeholder="endereco" v-model="user.endereco">
      </div>
      <div class="form-row">
        <div class="form-group col-md" >
          <label for="inputState">Sexo</label>
          <select id="inputState" class="selectpicker"  v-model="user.sexo" >
            <option selected ></option>
            <option>M</option>
            <option>F</option>
          </select>
        </div>
      </div>
      <div class="form-group col-md ">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="gridCheck" style="position: center;" v-model="user.ic_ativo">
          <label class="form-check-label" for="gridCheck" >
            Ativo
          </label>
        </div>
      </div>
      <button v-if="!user.id" type="submit" class="btn btn-primary">Cadastrar</button>
      <button v-if="user.id" @click="updateUser(user)" class="btn btn-primary" style="margin: 5%">Atualizar</button>
      <button v-if="user.id" @click="user = {}" class="btn btn-primary">Cancelar</button>
    </form>

    <table class="table">
      <thead class="thead-dark">
      <tr>
        <th scope="col">id</th>
        <th scope="col">Nome</th>
        <th scope="col">Email</th>
        <th scope="col">status</th>
        <th scope="col" style="width: 200px;">selecionar</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <th scope="row">{{user.id}}</th>
        <td>{{user.no_pessoa}}</td>
        <td>{{user.no_email}}</td>
        <td>{{user.ic_ativo ? 'Ativo' : 'Inativo'}}</td>
        <td>
          <button @click="findUser(user.id)" class="btn btn-warning">Editar</button>
          <button @click="deleteUser(user.id)" class="btn btn-danger">Remove</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '../axios'
export default {
  /* eslint-disable */
  data() {
    return {
      users: [],
      user: {},
      success: null,
      error: []

    }
  },
  methods: {
    /* eslint-disable */
    print() {
      console.log(this.user)
    },
    /* eslint-disable */
    buscar() {
      this.submitting = true
      axios.get('/pessoa', {crossdomain: true})
        .then(res => {
          this.users = res.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    /* eslint-disable */
    store(usuario) {
      axios.post('/pessoa', usuario)
        .then(res => {
          this.success = res
        })
        .catch(function (error) {
          this.success = error
        })
    },
    /* eslint-disable */
    deleteUser(userId) {
      axios.delete(`/pessoa/${userId}`)
        .then(resp => {
          console.log(resp)
        })
      this.$router.push('/')
    },
    /* eslint-disable */
    findUser(userId) {
      axios.get(`/pessoa/${userId}`)
        .then(resp => {
          this.user = resp.data
          console.log(resp.data)
        })
    },
    /* eslint-disable */
    updateUser(usuario) {
      axios.put(`pessoa/${usuario.id}`, usuario)
        .then(resp => {
          console.log('USUARIO ATUALIZADO COM SUCESSO! ', resp)
        })
        .catch(error => {
          console.log(error)
        })
    }

  },
  /* eslint-disable */
  created() {
    this.buscar()
    console.log(this)
  }
}
</script>

<style>
#form{
  margin: 30px 200px;
  align-items: center;
}

</style>
