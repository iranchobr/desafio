<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.no_pessoa"
          placeholder="Digite seu Nome"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Email address:" label-for="input-2" description="Não iremos compartilhar seu e-mail.">
        <b-form-input
          id="input-2"
          v-model="form.no_email"
          type="email"
          placeholder="Digite seu E-mail"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Endereco:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.endereco"
          placeholder="Digite seu Endereço"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Sexo:" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="form.sexo"
          :options="sexos"
          required
          disabled
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-5" label="Status (Ativo):" label-for="input-5">
        <b-form-select
          id="input-5"
          v-model="form.ic_ativo"
          :options="ativo"
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
        no_pessoa: '',
        no_email: '',
        endereco: '',
        sexo: null,
        ic_ativo: null
      },
      sexos: [{ text: 'Selecione', value: null }, 'M', 'F'],
      ativo: [{ text: 'Selecione', value: null }, { text: 'Sim', value: 1 }, { text: 'Não', value: 0 }],
      show: true
    }
  },
  methods: {
    onSubmit (event) {
      event.preventDefault()
      const pessoa = {
        no_pessoa: this.form.no_pessoa,
        no_email: this.form.no_email,
        endereco: this.form.endereco,
        sexo: this.form.sexo,
        ic_ativo: this.form.ic_ativo
      }
      axios.put('http://localhost:3000/pessoas/' + this.$route.query.id, pessoa)
        .then(pessoa => {
          alert('Usuário Atualizado na Base de Dados!')
          this.$router.push('/listar_pessoas')
        })
        .catch(err => {
          alert('Ocorreu um erro durante a atualização!')
          console.log(err)
        })
    },
    onReset (event) {
      event.preventDefault()
      // Reset our form values
      this.form.no_pessoa = ''
      this.form.no_email = ''
      this.form.endereco = ''
      this.form.ic_ativo = null
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  async created () {
    // Buscar a pessoa na API
    try {
      this.pessoa = await axios.get('http://localhost:3000/pessoas/' + this.$route.query.id)
      this.pessoa = this.pessoa.data

      this.form.no_pessoa = this.pessoa.no_pessoa
      this.form.no_email = this.pessoa.no_email
      this.form.endereco = this.pessoa.endereco
      this.form.sexo = this.pessoa.sexo
      this.pessoa.ic_ativo ? this.form.ic_ativo = 1 : this.form.ic_ativo = 0
    } catch (err) {
      console.log(err)
    }
  }
}

</script>
