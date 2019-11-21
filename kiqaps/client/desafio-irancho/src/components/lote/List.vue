<template>
  <div>
    <table class="table">
      <thead>
        <th>Id</th>
        <th>Nome</th>
        <th>Descrição</th>
        <th>Operações</th>
      </thead>

      <tbody v-if="loading || lotes.length === 0">
        <tr>
          <td class="has-text-centered" colspan="7">
            <Spinner v-if="loading" />
            <span v-if="lotes.length === 0">Não há nenhum lote cadastrado.</span>
          </td>
        </tr>
      </tbody>

      <tbody v-if="lotes.length">
        <tr v-for="lote in lotes" :key="lote.id">
          <td v-text="lote.id"></td>
          <td v-text="lote.no_lote"></td>
          <td v-text="!lote.ds_lote ? '-' : lote.ds_lote"></td>
          <td class="has-text-centered">
            <div class="btn-group">
              <router-link :to="{ path: `lote/editar/${lote.id}` }" class="btn btn-primary btn-sm"><edit-icon /></router-link>
              <button class="btn btn-danger btn-sm" @click="e => confirmDeletion(lote)"><trash-2-icon /></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner'
import { EditIcon, Trash2Icon } from 'vue-feather-icons'
export default {
  components: {
    Spinner, EditIcon, Trash2Icon
  },

  async created() {
    this.fetchData()
  },

  data() {
    return {
      loading: true,
      lotes: []
    }
  },
  
  methods: {
    async fetchData() {
      this.lotes = []
      this.loading = true
      const response = await this.$http.get('http://localhost:8081/api/lote')
      this.lotes = response.data.data
      this.loading = false
    },

    async confirmDeletion(lote) {
      const res = await this.$bvModal.msgBoxConfirm(`Você tem certeza que deseja excluir o lote '${lote.no_lote}'?`, {
        okVariant: 'danger',
        okTitle: 'Sim',
        cancelTitle: 'Não'
      })

      if (!!res) {
        await this.$http.delete(`http://localhost:8081/api/lote/${lote.id}`)
        this.fetchData()
      }
    }
  }
  
}
</script>