<template>
  <div class="root">
    <h1 class="ml-5">
      Lotes
      <b-button class="ml-auto" variant="success" size="lg" :href="'/cadastrar_lote'">
        <router-link style="text-decoration: none; color: inherit;" :to="'/cadastrar_lote'"><b-icon-plus-square></b-icon-plus-square></router-link>
      </b-button>
    </h1>
    <div class="container">
      <b-card border-variant="dark" header-bg-variant="dark" header-text-variant="white" body-class="d-flex"
        v-bind:header="lote.no_lote" v-for="(lote, index) in lotes" :key="lote.id">
        <div class="d-flex flex-column col-9">
          <b-card-text>Desc. Lote: {{lote.ds_lote}}</b-card-text>
        </div>
        <div class="d-flex flex-column col-3">
          <b-button class="ml-auto mb-2" variant="dark" size="sm" :href="`/alterar_lote?id=${lote.id}`">
            <router-link style="text-decoration: none; color: inherit;" :to="`/alterar_lote?id=${lote.id}`"><b-icon-pencil-fill></b-icon-pencil-fill></router-link>
          </b-button>
          <b-button class="ml-auto mb-2" variant="danger" size="sm" @click="remove(index, lote.id)"><b-icon-trash-fill></b-icon-trash-fill></b-button>
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
      lotes: [{}]
    }
  },
  methods: {
    remove (index, id) {
      index = parseInt(index)
      id = parseInt(id)

      // Remover o lote pela API
      axios.delete('http://localhost:3000/lotes/' + id)
        .then(res => {
          this.lotes.splice(index, 1) /* Remove o lote da lista renderizada */
          alert('Lote Removido da Base de Dados!')
        }).catch(err => {
          alert('Ocorreu um erro durante a remoção!')
          console.log(err)
        })
    }
  },
  async created () {
    // Buscar os lotes na API
    try {
      this.lotes = await axios.get('http://localhost:3000/lotes')
      this.lotes = this.lotes.data
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
