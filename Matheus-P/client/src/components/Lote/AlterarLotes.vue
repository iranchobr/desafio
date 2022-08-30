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
      axios.put('http://localhost:3000/lotes/' + this.$route.query.id, lote)
        .then(lote => {
          alert('Lote Atualizado na Base de Dados!')
          this.$router.push('/listar_lotes')
        })
        .catch(err => {
          alert('Ocorreu um erro durante a atualização!')
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
  },
  async created () {
    // Buscar o lote na API
    try {
      this.lote = await axios.get('http://localhost:3000/lotes/' + this.$route.query.id)
      this.lote = this.lote.data

      this.form.no_lote = this.lote.no_lote
      this.form.ds_lote = this.lote.ds_lote
    } catch (err) {
      console.log(err)
    }
  }
}

</script>
