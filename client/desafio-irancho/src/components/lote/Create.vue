<template>
  <div class="wrapper">
    <ul v-if="erros.length > 0" class="alert alert-danger">
      <li v-for="(erro, idx) in this.erros" :key="idx" v-text="erro"></li>
    </ul>
    <form @submit.prevent="onSubmit" @reset="onReset">
      <div class="form-group row">
        <div class="col">
          <input v-model="form.no_lote" type="text" name="no_lote" placeholder="Nome do Lote" class="form-control">
        </div>
        <div class="col">
          <input v-model="form.ds_lote" type="text" name="no_email" placeholder="Descrição do lote" class="form-control">
        </div>
      </div>
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Cadastrar</button>
      <button type="reset" class="btn btn-warning" :disabled="isSubmitting">Limpar</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSubmitting: false, 
      form: {
        no_lote: null,
        ds_lote: null
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
        const res = await this.$http.post('http://localhost:8081/api/lote', formData)
        if (res.status === 200) {
          this.$router.push('/lote')
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
    }
  }
}
</script>

<style lang="scss">
.wrapper {
  margin-top: 1rem;
}
</style>