<template>
  <div class="root">
    <h1 class="ml-5">
      Pessoas
      <b-button class="ml-auto" variant="success" size="lg" :href="'/cadastrar_pessoa'">
        <router-link style="text-decoration: none; color: inherit;" :to="'/cadastrar_pessoa'"><b-icon-plus-square></b-icon-plus-square></router-link>
      </b-button>
    </h1>
    <div class="container">
      <b-card border-variant="dark" header-bg-variant="dark" header-text-variant="white" body-class="d-flex"
        v-bind:header="pessoa.no_pessoa" v-for="(pessoa, index) in pessoas" :key="pessoa.id">
        <div class="d-flex flex-column col-9">
          <b-card-text>E-mail: {{pessoa.no_email}}</b-card-text>
          <b-card-text>Endereço: {{pessoa.endereco}}</b-card-text>
          <b-card-text>Sexo: {{pessoa.sexo}}</b-card-text>
        </div>
        <div class="d-flex flex-column col-3">
          <b-button class="ml-auto mb-2" variant="dark" size="sm" :href="`/pessoas/animais?id=${pessoa.id}`">
            <router-link style="text-decoration: none; color: inherit;" :to="`/pessoas/animais?id=${pessoa.id}`">Ver animais</router-link>
          </b-button>
          <b-button class="ml-auto mb-2" variant="dark" size="sm" :href="`/alterar_pessoa?id=${pessoa.id}`">
            <router-link style="text-decoration: none; color: inherit;" :to="`/alterar_pessoa?id=${pessoa.id}`"><b-icon-pencil-fill></b-icon-pencil-fill></router-link>
          </b-button>
          <b-button class="ml-auto mb-2" variant="danger" size="sm" @click="remove(index, pessoa.id)"><b-icon-trash-fill></b-icon-trash-fill></b-button>
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
      pessoas: [{}]
    }
  },
  methods: {
    remove (index, id) {
      index = parseInt(index)
      id = parseInt(id)

      // Remover a pessoa pela API
      axios.delete('http://localhost:3000/pessoas/' + id)
        .then(res => {
          this.pessoas.splice(index, 1) /* Remove a pessoa da lista renderizada */
          alert('Usuário Removido da Base de Dados!')
        }).catch(err => {
          alert('Ocorreu um erro durante a remoção!')
          console.log(err)
        })
    }
  },
  async created () {
    // Buscar as pessoas na API
    try {
      this.pessoas = await axios.get('http://localhost:3000/pessoas')
      this.pessoas = this.pessoas.data
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
