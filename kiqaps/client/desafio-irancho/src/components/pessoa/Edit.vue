<template>
  <div class="wrapper" v-if="!isLoading">
    <ul v-if="erros.length > 0" class="alert alert-danger">
      <li v-for="(erro, idx) in this.erros" :key="idx" v-text="erro"></li>
    </ul>
    <form @submit.prevent="onSubmit" @reset="onReset">
      <div class="form-group row">
        <div class="col">
          <input v-model="form.no_pessoa" type="text" name="no_pessoa" placeholder="Nome Completo" class="form-control">
        </div>
        <div class="col">
          <input v-model="form.no_email" type="text" name="no_email" placeholder="E-mail" class="form-control">
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
          <input v-model="form.endereco" type="text" name="endereco" placeholder="Endereço" class="form-control">
        </div>
        <div class="col-1 form-check form-check-inline">
          <input v-model="form.ic_ativo" id="id_fck_ativo" type="checkbox" name="ic_ativo" class="form-check-input">
          <label for="id_fck_ativo" class="form-check-label">Ativo</label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Salvar</button>
      <button type="reset" class="btn btn-warning" :disabled="isSubmitting">Limpar</button>
    </form>
  </div>
</template>

<script>
export default {
  async created() {
    try {
      this.isLoading = true
      const res = await this.$http.get(`http://localhost:8081/api/pessoa/${this.$route.params.id}`)
      this.pessoa = res.data.data
      Object.keys(this.form).forEach(key => this.form[key] = this.pessoa[key])
      this.isLoading = false
    }
    catch(err) {
      this.$router.replace('/pessoa')
    }
  },

  data() {
    return {
      isLoading: null,
      pessoa: null,
      isSubmitting: false, 
      form: {
        no_pessoa: null,
        no_email: null,
        endereco: null,
        sexo: null,
        ic_ativo: false
      },
      erros: []
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
        const res = await this.$http.put(`http://localhost:8081/api/pessoa/${this.pessoa.id}`, formData)
        if (res.status === 200) {
          this.$router.push('/pessoa')
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
      this.form.ic_ativo = false
      this.erros = []
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  margin-top: 1rem;
}
</style>