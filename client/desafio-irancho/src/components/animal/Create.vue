<template>
  <div class="wrapper" v-if="!isLoading">
    <ul v-if="erros.length > 0" class="alert alert-danger">
      <li v-for="(erro, idx) in this.erros" :key="idx" v-text="erro"></li>
    </ul>
    <form @submit.prevent="onSubmit" @reset="onReset">
      <div class="form-group row">
        <div class="col">
          <input v-model="form.no_animal" type="text" name="no_animal" placeholder="Nome do Animal" class="form-control">
        </div>
        <div class="col">
          <input v-model="form.no_raca" type="text" name="no_raca" placeholder="Raça do Animal" class="form-control">
        </div>
        <div class="col-2">
          <select v-model="form.sexo" class="form-control" name="sexo" placeholder="teste">
            <option selected disabled value="null">Sexo</option>
            <option value="m">Masculino</option>
            <option value="f">Feminino</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <div class="col">
          <input v-model="form.vr_peso" type="text" placeholder="Peso" class="form-control">
        </div>
        <div class="col">
          <input v-model="form.dt_nascimento" type="date" placeholder="Data de Nascimento" class="form-control">
        </div>
        <div class="col">
          <input v-model="form.id_fazenda" type="text" placeholder="ID Fazenda" class="form-control">
        </div>
      </div>
      <div class="form-group row">
        <div class="col">
          <select v-model="form.fk_id_pessoa" class="form-control">
            <option value="null" selected disabled>Selecione o dono do animal</option>
            <option v-for="pessoa in pessoas" :key="pessoa.id" :value="pessoa.id" v-text="pessoa.no_pessoa"></option>
          </select>
        </div>
      </div>
      <div class="lotes-place">
        <h5>Lotes</h5>
        <hr>
        <div class="form-group row">
          <div class="col">
            <select v-model="formLotes.lote" class="form-control">
              <option :value="null" selected disabled>Selecione o lote</option>
              <option v-for="lote in computedLotes" :key="lote.id" :value="lote.id" v-text="lote.no_lote"></option>
            </select>
          </div>
          <div class="col-1 form-check form-check-inline">
            <input v-model="formLotes.ic_bezerro" id="id_fck_ativo" type="checkbox" name="ic_bezerro" class="form-check-input">
            <label for="id_fck_ativo" class="form-check-label">Bezerro</label>
          </div>
          <div class="col-2 has-text-centered">
            <button @click.prevent="addLote" class="btn btn-primary">Adicionar</button>
          </div>
        </div>
        <hr>
        <ul v-if="this.formLotes.selectedLotes.length > 0" class="list-group">
          <li v-for="loteEntry in formLotes.selectedLotes" :key="loteEntry.lote.id" class="list-group-item">
            <button @click.prevent="evt => removeLote(loteEntry)" class="btn btn-danger"><trash-2-icon /></button>
            <span v-text="loteEntry.lote.no_lote"></span>
            <span v-if="loteEntry.ic_bezerro">- Bezerro</span>
          </li>
        </ul>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Cadastrar</button>
      <button type="reset" class="btn btn-warning" :disabled="isSubmitting">Limpar</button>
    </form>
  </div>
</template>

<script>
import { Trash2Icon } from 'vue-feather-icons'
export default {
  components: {
    Trash2Icon
  },

  async created() {
    this.isLoading = true
    const res = await this.$http.get('http://localhost:8081/api/pessoa')
    this.pessoas = res.data.data
    const res2 = await this.$http.get('http://localhost:8081/api/lote')
    this.lotes = res2.data.data
    this.isLoading = false
  },

  computed: {
    computedLotes() {
      return this.lotes.filter(i => {
        for(let j = 0; j < this.formLotes.selectedLotes.length; j++)
          if (i.id === this.formLotes.selectedLotes[j].lote.id)
            return false
        return true
      })
    }
  },

  data() {
    return {
      isLoading: null,
      isSubmitting: false, 
      form: {
        no_animal: null,
        no_raca: null,
        vr_peso: null,
        sexo: null,
        dt_nascimento: null,
        id_fazenda: null,
        fk_id_pessoa: null
      },
      formLotes: {
        selectedLotes: [],
        lote: null,
        ic_bezerro: false
      },
      erros: [],
      pessoas: [],
      lotes: []
    }
  },

  methods: {
    async onSubmit(evt) {
      let formData = {}
      Object.keys(this.form).forEach(key => {
        if (typeof(this.form[key]) === 'boolean' || !!this.form[key])
          formData[key] = this.form[key]
      })

      this.erros = []
      this.isSubmitting = true
      try {
        const res = await this.$http.post('http://localhost:8081/api/animal', formData)
        if (res.status === 200) {
          if (this.formLotes.selectedLotes.length > 0) {
            const animal = res.data.data
            this.formLotes.selectedLotes.forEach(async loteEntry => {
              await this.$http.post(`http://localhost:8081/api/animal/${animal.id}/lote`, {
                fk_id_lote: loteEntry.lote.id,
                dt_entrada: (new Date()).toLocaleDateString("pt-BR").split('/').reverse().join('-'),
                ic_bezerro: loteEntry.ic_bezerro
              })
            })
          }
          this.$router.push('/animal')
        }
      } catch(err) {
        const { response } = err
        const { data: erros } = response.data
        Object.keys(erros).forEach(key => this.erros.push(erros[key]))
      }
      finally {
        this.isSubmitting = false
      }
    },

    onReset(evt) {
      Object.keys(this.form).forEach(key => this.form[key] = null)
      this.erros = []
    },

    addLote(evt) {
      if (!this.formLotes.lote) {
        this.erros.push('you should select the Lote to be added')
      }
      else {
        const lote = this.lotes.find(i => i.id === this.formLotes.lote)
        this.formLotes.selectedLotes.push({
          lote,
          ic_bezerro: !!this.formLotes.ic_bezerro
        })

        this.formLotes.lote = null
        this.formLotes.ic_bezerro = false
      }
    },

    removeLote(lote) {
      const idx = this.formLotes.selectedLotes.indexOf(lote)
      this.formLotes.selectedLotes.splice(idx, 1)
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  margin-top: 1rem;
}

.lotes-place {
  border: 1px solid #c9c9c9;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 10px;
}
</style>