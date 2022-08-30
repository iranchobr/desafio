<template>
  <div class="root">
    <h1 class="ml-5">
      Relações
      <b-button class="ml-auto" variant="success" size="lg" :href="'/cadastrar_animal_lote'">
        <router-link style="text-decoration: none; color: inherit;" :to="'/cadastrar_animal_lote'"><b-icon-plus-square></b-icon-plus-square></router-link>
      </b-button>
    </h1>
    <div class="container">
      <b-card border-variant="dark" header-bg-variant="dark" header-text-variant="white" body-class="d-flex"
        v-bind:header="`Relação ${relacao.id}`" v-for="(relacao, index) in relacoes" :key="relacao.id">
        <div class="d-flex flex-column col-9">
          <b-card-text>ID Animal: {{relacao.fk_id_animal}}</b-card-text>
          <b-card-text>ID Lote: {{relacao.fk_id_lote}}</b-card-text>
          <b-card-text>Data de Entrada: {{relacao.dt_entrada}}</b-card-text>
          <b-card-text>Data de Saída: {{relacao.dt_saida}}</b-card-text>
          <b-card-text>Data da Última Movimentação: {{relacao.dt_ultima_movimentacao}}</b-card-text>
          <b-card-text>Bezerro: {{relacao.ic_bezerro}}</b-card-text>
        </div>
        <div class="d-flex flex-column col-3">
          <b-button class="ml-auto mb-2" variant="dark" size="sm" :href="`/alterar_animal_lote?id=${relacao.id}`">
            <router-link style="text-decoration: none; color: inherit;" :to="`/alterar_animal_lote?id=${relacao.id}`"><b-icon-pencil-fill></b-icon-pencil-fill></router-link>
          </b-button>
          <b-button class="ml-auto mb-2" variant="danger" size="sm" @click="remove(index, relacao.id)"><b-icon-trash-fill></b-icon-trash-fill></b-button>
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
      relacoes: [{}]
    }
  },
  methods: {
    remove (index, id) {
      index = parseInt(index)
      id = parseInt(id)

      // Remover a relação pela API
      axios.delete('http://localhost:3000/animais_lotes/' + id)
        .then(res => {
          this.relacoes.splice(index, 1) /* Remove a relação da lista renderizada */
          alert('Relação Removida da Base de Dados!')
        }).catch(err => {
          alert('Ocorreu um erro durante a remoção!')
          console.log(err)
        })
    }
  },
  async created () {
    // Buscar as relações na API
    try {
      this.relacoes = await axios.get('http://localhost:3000/animais_lotes')
      this.relacoes = this.relacoes.data
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
