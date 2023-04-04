<template>
  <div>
    <HeaderComponent/>
    <h1>Lote</h1>
    <div>
      <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Lote</th>
          <th>Descrição</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lote in lotes" :key="lote.id">
          <td>{{ lote.id }}</td>
          <td v-if="editingLote.id !== lote.id">{{ lote.no_lote }}</td>
          <td v-else>
            <input v-model="editingLote.no_lote" type="text" />
          </td>
          <td v-if="editingLote.id !== lote.id">{{ lote.ds_lote }}</td>
          <td v-else>
            <input v-model="editingLote.ds_lote" type="text" />
          </td>
          <td>
            <button @click="editLote(lote)" class="btn btn-primary">Editar</button>
            <button
              v-if="editingLote.id === lote.id"
              @click="updateLote(lote)"
              class="btn btn-success"
            >
              Atualizar
            </button>
            <button @click="deleteLote(lote.id)" class="btn btn-danger">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="openForm()" class="btn btn-primary">Adicionar</button>

  <form v-if="showForm" @submit.prevent="addLoteNow">
    <input type="text" v-model="newLote.id" placeholder="ID">
    <input type="text" v-model="newLote.no_lote" placeholder="Nome do Lote">
    <input type="text" v-model="newLote.ds_lote" placeholder="Descrição">
    <button type="submit" class="btn btn-success">Adicionar</button>
  </form>
  </div>
  </div>
</template>

<script>
import axios from 'axios';

import HeaderComponent from '@/components/HeaderComponent.vue'
export default {
  components: {
    HeaderComponent,
  },
  data() {
    return {
      lotes: [],
      editingLote: {},
      showForm: false,
      newLote: {
        id: '',
        no_lote: '',
        ds_lote: '',
      },
    };
  },
  mounted() {
    axios.get('http://localhost:3000/lotes').then((response) => {
      this.lotes = response.data.lotes;
    });
  },
  methods: {
    editLote(lote) {
      this.editingLote = { ...lote };
    },
    deleteLote(id) {
      axios
        .delete(`http://localhost:3000/lotes/${id}`)
        .then(() => {
          const index = this.lotes.findIndex((l) => l.id === id);
          this.lotes.splice(index, 1);
        });
    },
    openForm() {
      this.showForm = true;
    },
    addLoteNow() {
      axios
        .post('http://localhost:3000/lotes', this.newLote)
        .then((response) => {
          this.lotes.push(response.data);
          this.newLote = {
            id: '',
            no_lote: '',
            ds_lote: '',
          };
          this.showForm = false;
        });
    },
    updateLote(lote) {
      axios
        .put(`http://localhost:3000/lotes/${lote.id}`, this.editingLote)
        .then(() => {
          this.editingLote = {};
          this.lotes = this.lotes.map((l) =>
            l.id === lote.id ? this.editingLote : l
          );
        });
      alert('Informação atualizada com sucesso!');
      window.location.reload();
    },
    addLote() {
      axios
        .post('http://localhost:3000/lotes', this.newLote)
        .then((response) => {
          this.lotes.push(response.data);
        });
    },
  },
};
</script>
