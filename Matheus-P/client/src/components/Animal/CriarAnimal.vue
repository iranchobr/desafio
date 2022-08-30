<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="ID Fazenda:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.id_fazenda"
          placeholder="Digite o ID da Fazenda"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Nome:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.no_animal"
          placeholder="Digite o nome do animal"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Raça:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.no_raca"
          placeholder="Digite a raça do animal"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Peso:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.vr_peso"
          placeholder="Digite o peso do animal"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Sexo:" label-for="input-5">
        <b-form-select
          id="input-5"
          v-model="form.sexo"
          :options="sexos"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-6" label="Data de Nascimento:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="form.dt_nascimento"
          type="date"
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
        fk_id_pessoa: '',
        id_fazenda: '',
        no_animal: '',
        no_raca: '',
        vr_peso: '',
        sexo: null,
        dt_nascimento: ''
      },
      sexos: [{ text: 'Selecione', value: null }, 'M', 'F'],
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      const animal = {
        fk_id_pessoa: this.$route.query.id,
        id_fazenda: this.form.id_fazenda,
        no_animal: this.form.no_animal,
        no_raca: this.form.no_raca,
        sexo: this.form.sexo,
        vr_peso: this.form.vr_peso,
        dt_nascimento: this.form.dt_nascimento
      }
      console.log(animal)
      axios.post('http://localhost:3000/animais/' + this.$route.query.id, animal)
        .then(animal => {
          alert('Animal Adicionado à Base de Dados!')
          this.$router.push('/listar_animais')
        })
        .catch(err => {
          alert('Ocorreu um erro durante o cadastro!')
          console.log(err)
        })
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.fk_id_pessoa = ''
      this.form.id_fazenda = ''
      this.form.no_animal = ''
      this.form.no_raca = ''
      this.form.vr_peso = ''
      this.form.sexo = null
      this.form.dt_nascimento = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}

</script>
