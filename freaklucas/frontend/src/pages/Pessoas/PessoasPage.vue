
<template>
  <div class="q-container">
    <HeaderComponent />
    <h1>Olá Pessoas!!!!</h1>
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Endereço</th>
            <th>Sexo</th>
            <th>Ativo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pessoa in pessoas" :key="pessoa.id">
            <td>{{ pessoa.id }}</td>
            <td v-if="editingPessoa.id !== pessoa.id">
              {{ pessoa.no_pessoa }}
            </td>
            <td v-else>
              <input v-model="editingPessoa.no_pessoa" type="text" />
            </td>
            <td v-if="editingPessoa.id !== pessoa.id">{{ pessoa.no_email }}</td>
            <td v-else>
              <input v-model="editingPessoa.no_email" type="text" />
            </td>
            <td v-if="editingPessoa.id !== pessoa.id">{{ pessoa.endereco }}</td>
            <td v-else>
              <input v-model="editingPessoa.endereco" type="text" />
            </td>
            <td v-if="editingPessoa.id !== pessoa.id">{{ pessoa.sexo }}</td>
            <td v-else>
              <input v-model="editingPessoa.sexo" type="text" />
            </td>
            <td v-if="editingPessoa.id !== pessoa.id">{{ pessoa.ic_ativo }}</td>
            <td v-else>
              <input v-model="editingPessoa.ic_ativo" type="text" />
            </td>
            <td>
              <button @click="editPessoa(pessoa)" class="btn btn-primary">
                Editar
              </button>
              <button
                v-if="editingPessoa.id === pessoa.id"
                @click="updatePessoa(pessoa)"
                class="btn btn-success"
              >
                Atualizar
              </button>
              <button @click="deletePessoa(pessoa.id)" class="btn btn-danger">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="openForm()" class="btn btn-primary">Adicionar</button>
      <form v-if="showForm" @submit.prevent="addPessoaNow">
        <input type="text" v-model="newPessoa.id" placeholder="ID">
        <input type="text" v-model="newPessoa.no_pessoa" placeholder="Nome">
        <input type="text" v-model="newPessoa.no_email" placeholder="E-mail">
        <input type="text" v-model="newPessoa.endereco" placeholder="Endereço">
        <input type="text" v-model="newPessoa.sexo" placeholder="Sexo">
        <input type="text" v-model="newPessoa.ic_ativo" placeholder="Ativo">
        <button type="submit" class="btn btn-success">Adicionar</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  components: {
    HeaderComponent,
  },

  data() {
    return {
      pessoas: [],
      editingPessoa: {},
      showForm: false,
      newPessoa: {
        id: '',
        no_pessoa: '',
        no_email: '',
        endereco: '',
        sexo: '',
        ic_ativo: '',
      },
    };
  },
  mounted() {
    axios.get('http://localhost:3000/pessoas').then((response) => {
      this.pessoas = response.data;
    });
  },
  methods: {
    editPessoa(pessoa) {
      this.editingPessoa = { ...pessoa };
    },
    deletePessoa(id) {
      axios
        .delete(`http://localhost:3000/pessoas/${id}`)
        .then(() => {
          const index = this.pessoas.findIndex((p) => p.id === id);
          this.pessoas.splice(index, 1);
        });
    },
    openForm() {
      this.showForm = true;
    },
    addPessoaNow() {
      axios
        .post('http://localhost:3000/pessoas', this.newPessoa)
        .then((response) => {
          this.pessoas.push(response.data);
          this.newPessoa = {
            id: '',
            no_pessoa: '',
            no_email: '',
            endereco: '',
            sexo: '',
            ic_ativo: '',
          };
          this.showForm = false;
        });
    },

    updatePessoa(pessoa) {
      axios
        .put(`http://localhost:3000/pessoas/${pessoa.id}`, this.editingPessoa)
        .then(() => {
          this.editingPessoa = {};
          this.pessoas = this.pessoas.map((p) =>
            p.id === pessoa.id ? this.editingPessoa : p
          );
        });
      alert('Informação atualizada com sucesso!');
      window.location.reload();
    },
    addPessoa() {
      axios
        .post('http://localhost:3000/pessoas', this.newPessoa)
        .then((response) => {
          this.pessoas.push(response.data);
        });
    },
  },
};
</script>
