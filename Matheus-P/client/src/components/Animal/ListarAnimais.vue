<template>
  <div class="root">
    <h1 class="ml-5">
      Animais
    </h1>
    <div class="container">
      <b-card border-variant="dark" header-bg-variant="dark" header-text-variant="white" body-class="d-flex"
        v-bind:header="animal.no_animal" v-for="(animal, index) in animais" :key="animal.id">
        <div class="d-flex flex-column col-9">
          <b-card-text :key="pessoaUpdated">Dono: {{no_pessoa = no_pessoas[animal.fk_id_pessoa]}}</b-card-text>
          <b-card-text>Raça: {{animal.no_raca}}</b-card-text>
          <b-card-text>Sexo: {{animal.sexo}}</b-card-text>
          <b-card-text>Peso: {{animal.vr_peso}}</b-card-text>
          <b-card-text>Data de Nascimento: {{animal.dt_nascimento}}</b-card-text>
        </div>
        <div class="d-flex flex-column col-3">
          <b-button class="ml-auto mb-2" variant="dark" size="sm" :href="`/alterar_animal?id=${animal.id}`">
            <router-link style="text-decoration: none; color: inherit;" :to="`/alterar_animal?id=${animal.id}`"><b-icon-pencil-fill></b-icon-pencil-fill></router-link>
          </b-button>
          <b-button class="ml-auto mb-2" variant="danger" size="sm" @click="remove(index, animal.id)"><b-icon-trash-fill></b-icon-trash-fill></b-button>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'index',
  data () {
    return {
      animais: [{}],
      pessoa: '',
      pessoaUpdated: 0,
      no_pessoas: {}
    }
  },
  methods: {
    remove (index, id) {
      index = parseInt(index)
      id = parseInt(id)

      // Remover o animal pela API
      axios.delete('http://localhost:3000/animais/' + id)
        .then(res => {
          this.animais.splice(index, 1) /* Remove o animal da lista renderizada */
          alert('Animal Removido da Base de Dados!')
        }).catch(err => {
          alert('Ocorreu um erro durante a remoção!')
          console.log(err)
        })
    }
  },
  async created () {
    // Buscar animais na API
    try {
      this.animais = await axios.get('http://localhost:3000/animais')
      this.animais = this.animais.data
      // Obter o dono
      for (let animal of this.animais) {
        this.pessoa = await axios.get('http://localhost:3000/pessoas/' + animal.fk_id_pessoa)
        this.pessoa = this.pessoa.data
        this.no_pessoas[animal.fk_id_pessoa] = this.pessoa.no_pessoa
        this.pessoaUpdated += 1
      }
    } catch (err) {
      console.log(err)
    }
  }
}

</script>

<style scoped>
.card {
  margin: 20px;
}
</style>
