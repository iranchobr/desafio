<template>
  <div>
  <b-card-group deck>
    <b-card
      header="Pessoas"
      header-tag="header"
    >
      <b-card-text><h3>{{users.length}}</h3>Pessoas Cadastradas</b-card-text>
      <b-button href="/pessoa" variant="primary">Cadastrar Pessoa</b-button>
    </b-card>
    <b-card
      header="Animais"
      header-tag="header"
    >
      <b-card-text><h3>{{animais.length}}</h3>Animais Cadastrados</b-card-text>
      <b-button href="/animal" variant="primary">Cadastrar Animal</b-button>
    </b-card>
    <b-card
      header="Lotes"
      header-tag="header"
    >
     <b-card-text><h3>{{lotes.length}}</h3>Lotes Cadastrados</b-card-text>
      <b-button href="/lote" variant="primary">Cadastrar Lote</b-button>
    </b-card>

   <b-card
      header="Lotes de Animais"
      header-tag="header"
    >
      <b-card-text><h3>{{animais_lotes.length}}</h3>Alocações Cadastradas</b-card-text>
      <b-button href="/alocar" variant="primary">Cadastrar Alocação</b-button>
    </b-card>
  </b-card-group>
</div>
</template>

<script>
import axios from '../axios'
export default {
  data () {
    return {
      users: [],
      animais: [],
      lotes: [],
      animais_lotes: []
    }
  },
  methods: {
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.animal = {
        sexo: null
      }
      this.user = {}
    },
    buscarUsers () {
      axios.get(`/pessoa`, {crossdomain: true})
        .then(res => {
          this.users = res.data
        })
        .catch(error => console.log(error)
        )
    },
    buscarAnimais () {
      axios.get(`/animal`, {crossdomain: true})
        .then(res => {
          this.animais = res.data
        })
        .catch(error => console.log(error)
        )
    },
    buscarLotes () {
      axios.get(`/lote`, {crossdomain: true})
        .then(res => {
          this.lotes = res.data
        })
        .catch(error => console.log(error)
        )
    },
    buscarAnimalLote () {
      axios.get(`/alocar`, {crossdomain: true})
        .then(res => {
          this.animais_lotes = res.data
        })
        .catch(error => console.log(error)
        )
    }
  },
  created () {
    this.buscarUsers()
    this.buscarAnimais()
    this.buscarLotes()
    this.buscarAnimalLote()
  }
}
</script>
