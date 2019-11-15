<template>
  <div>
    <table class="table">
      <thead>
        <th>Id</th>
        <th>Nome</th>
        <th>Raça</th>
        <th>Dono</th>
        <th>Operações</th>
      </thead>

      <tbody v-if="loading || animais.length === 0">
        <tr>
          <td class="has-text-centered" colspan="7">
            <Spinner v-if="loading" />
            <span v-if="animais.length === 0">Não há nenhum animal cadastrado.</span>
          </td>
        </tr>
      </tbody>

      <tbody v-if="animais.length">
        <tr v-for="animal in animais" :key="animal.id">
          <td v-text="animal.id"></td>
          <td v-text="animal.no_animal"></td>
          <td v-text="!animal.no_raca ? '-' : animal.no_raca"></td>
          <td v-text="animal.dono.no_pessoa"></td>
          <td class="has-text-centered">
            <div class="btn-group">
              <router-link :to="{ path: `animal/editar/${animal.id}` }" class="btn btn-primary btn-sm"><edit-icon /></router-link>
              <button class="btn btn-danger btn-sm" @click="e => confirmDeletion(animal)"><trash-2-icon /></button>
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
      animais: []
    }
  },
  
  methods: {
    async fetchData() {
      this.animais = []
      this.loading = true
      const options = {
        include: [ 'dono' ]
      }
      const response = await this.$http.get(`http://localhost:8081/api/animal?options=${JSON.stringify(options)}`)
      this.animais = response.data.data
      this.loading = false
    },
    async confirmDeletion(animal) {
      const res = await this.$bvModal.msgBoxConfirm(`Você tem certeza que deseja excluir o Animal '${animal.no_animal}'?`, {
        okVariant: 'danger',
        okTitle: 'Sim',
        cancelTitle: 'Não'
      })

      if (!!res) {
        await this.$http.delete(`http://localhost:8081/api/animal/${animal.id}`)
        this.fetchData()
      }
    }
  }
  
}
</script>