<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="ID Lote:" label-for="input-1">
        <b-form-select
          id="input-1"
          v-model="form.fk_id_lote"
          :options="lotes"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="ID Animal:" label-for="input-2">
        <b-form-select
          id="input-2"
          v-model="form.fk_id_animal"
          :options="animais"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-3" label="Data de Entrada:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.dt_entrada"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Data de Saída:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.dt_saida"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Data da Última Movimentação:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="form.dt_ultima_movimentacao"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Bezerro:" label-for="input-6">
        <b-form-select
          id="input-6"
          v-model="form.ic_bezerro"
          :options="bezerro"
          required
        ></b-form-select>
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
        fk_id_animal: null,
        fk_id_lote: null,
        dt_entrada: '',
        dt_saida: '',
        dt_ultima_movimentacao: '',
        ic_bezerro: null
      },
      animais: [{ text: 'Selecione', value: null }],
      lotes: [{ text: 'Selecione', value: null }],
      bezerro: [{ text: 'Selecione', value: null }, { text: 'Sim', value: 1 }, { text: 'Não', value: 0 }],
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      const relacao = {
        dt_entrada: this.form.dt_entrada,
        dt_saida: this.form.dt_saida,
        dt_ultima_movimentacao: this.form.dt_ultima_movimentacao,
        ic_bezerro: this.form.ic_bezerro
      }
      console.log(relacao)
      axios.post('http://localhost:3000/animais_lotes/' + this.form.fk_id_animal + '/' + this.form.fk_id_lote, relacao)
        .then(relacao => {
          alert('Relação Adicionado à Base de Dados!')
          this.$router.push('/listar_animal_lote')
        })
        .catch(err => {
          alert('Ocorreu um erro durante o cadastro!')
          console.log(err)
        })
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.fk_id_animal = null
      this.form.fk_id_lote = null
      this.form.dt_entrada = ''
      this.form.dt_saida = ''
      this.form.dt_ultima_movimentacao = ''
      this.form.ic_bezerro = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  async created () {
    // Buscar os lotes na API
    try {
      let listalotes = await axios.get('http://localhost:3000/lotes')
      listalotes = listalotes.data
      for (let lote of listalotes) {
        this.lotes.push(lote.id)
      }
    } catch (err) {
      console.log(err)
    }
    // Buscar os animais na API
    try {
      let listaanimais = await axios.get('http://localhost:3000/animais')
      listaanimais = listaanimais.data
      for (let animal of listaanimais) {
        this.animais.push(animal.id)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

</script>
