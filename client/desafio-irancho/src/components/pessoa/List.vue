<template>
  <div>
    <table class="table">
      <thead>
        <th>Id</th>
        <th>Nome</th>
        <th>E-mail</th>
        <th>Endereço</th>
        <th>Sexo</th>
        <th>Ativo</th>
        <th>Operações</th>
      </thead>

      <tbody v-if="loading || pessoas.length === 0">
        <tr>
          <td class="has-text-centered" colspan="7">
            <Spinner v-if="loading" />
            <span v-if="pessoas.length === 0">Não há nenhuma pessoa cadastrada.</span>
          </td>
        </tr>
      </tbody>

      <tbody v-if="pessoas.length">
        <tr v-for="pessoa in pessoas" :key="pessoa.id">
          <td v-text="pessoa.id"></td>
          <td v-text="pessoa.no_pessoa"></td>
          <td v-text="pessoa.no_email"></td>
          <td v-text="!pessoa.endereco ? '-' : pessoa.endereco"></td>
          <td v-text="getSexo(pessoa.sexo)"></td>
          <td v-text="pessoa.ic_ativo  ? 'Sim' : 'Não'"></td>
          <td class="has-text-centered">
            <div class="btn-group">
              <router-link :to="{ path: `pessoa/editar/${pessoa.id}` }" class="btn btn-primary btn-sm"><edit-icon /></router-link>
              <button class="btn btn-danger btn-sm" @click="e => confirmDeletion(pessoa)"><trash-2-icon /></button>
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
      pessoas: []
    }
  },
  
  methods: {
    async fetchData() {
      this.pessoas = []
      this.loading = true
      const response = await this.$http.get('http://localhost:8081/api/pessoa')
      this.pessoas = response.data.data
      this.loading = false
    },
    async confirmDeletion(pessoa) {
      const res = await this.$bvModal.msgBoxConfirm(`Você tem certeza que deseja excluir a Pessoa '${pessoa.no_pessoa}'?`, {
        okVariant: 'danger',
        okTitle: 'Sim',
        cancelTitle: 'Não'
      })

      if (!!res) {
        await this.$http.delete(`http://localhost:8081/api/pessoa/${pessoa.id}`)
        this.fetchData()
      }
    },
    getSexo(sexo) {
      if (sexo === 'm' || sexo === 'M') return 'Masculino'
      else if (sexo === 'f' || sexo === 'F') return 'Feminino'
      else return '-'
    }
  }
  
}
</script>