<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="Nome do Lote:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.no_lote"
          placeholder="Digite o Nome do Lote"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Descrição do Lote:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.ds_lote"
          placeholder="Digite a Descrição do Lote"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Confirmar</b-button>
      <b-button type="reset" variant="danger">Limpar</b-button>
    </b-form>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'index',
  data () {
    return {
      form: {
        no_lote: '',
        ds_lote: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      const lote = {
        no_lote: this.form.no_lote,
        ds_lote: this.form.ds_lote
      }
      console.log(lote)
      axios.post('http://localhost:3000/lotes/', lote)
        .then(lote => {
          alert('Lote Adicionado à Base de Dados!')
          this.$router.push('/listar_lotes')
        })
        .catch(err => {
          alert('Ocorreu um erro durante o cadastro!')
          console.log(err)
        })
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.no_lote = ''
      this.form.ds_lote = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}

</script>
