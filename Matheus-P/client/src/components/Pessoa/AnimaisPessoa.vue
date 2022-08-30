<template>
  <div class="root">
    <h1 class="ml-5">
      Animais do {{`Usuário: ${this.name_user}`}}
      <b-button class="ml-auto" variant="success" size="lg" :href="`/cadastrar_animal?id=${$route.query.id}`">
        <router-link style="text-decoration: none; color: inherit;" :to="`/cadastrar_animal?id=${$route.query.id}`"><b-icon-plus-square></b-icon-plus-square></router-link>
      </b-button>
    </h1>
    <div class="container">
      <b-card border-variant="dark" header-bg-variant="dark" header-text-variant="white" body-class="d-flex"
        v-bind:header="animal.no_animal" v-for="(animal, index) in animais" :key="animal.id">
        <div class="d-flex flex-column col-9">
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
      id_user: 0,
      name_user: '',
      pessoa: null,
      animais: [{}]
    }
  },
  methods: {
    remove (index, id) {
      alert(index)
      index = parseInt(index)
      id = parseInt(id)

      // Remover animal pela API
      axios.delete('http://localhost:3000/animais/' + id)
        .then(res => {
          this.animais.splice(index, 1) /* Atualiza a lista de animais */
          alert('Animal Removido da Base de Dados!')
        }).catch(err => {
          alert('Ocorreu um erro durante a remoção!')
          console.log(err)
        })
    }
  },
  async created () {
    // Buscar os animais na API
    try {
      this.animais = await axios.get('http://localhost:3000/pessoas/animais/' + this.$route.query.id)
      this.animais = this.animais.data
      // Caso a Pessoa não tenha animais
      if (this.animais.Erro) {
        alert('Esta pessoa não tem animais!')
      }

      this.pessoa = await axios.get('http://localhost:3000/pessoas/' + this.$route.query.id)
      this.name_user = this.pessoa.data.no_pessoa
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
