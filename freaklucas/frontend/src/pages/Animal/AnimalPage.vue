<template>
  <div>
    <HeaderComponent />
    <h1>Animais</h1>
    <div>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do animal</th>
            <th>Raça</th>
            <th>Sexo</th>
            <th>Peso</th>
            <th>Data de nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="animal in animais" :key="animal.id">
            <td>{{ animal.id }}</td>
            <td v-if="editingAnimal.id !== animal.id">
              {{ animal.no_animal }}
            </td>
            <td v-else>
              <input v-model="editingAnimal.no_animal" type="text" />
            </td>
            <td v-if="editingAnimal.id !== animal.id">{{ animal.no_raca }}</td>
            <td v-else>
              <input v-model="editingAnimal.no_raca" type="text" />
            </td>
            <td v-if="editingAnimal.id !== animal.id">{{ animal.sexo }}</td>
            <td v-else>
              <input v-model="editingAnimal.sexo" type="text" />
            </td>
            <td v-if="editingAnimal.id !== animal.id">{{ animal.vr_peso }}</td>
            <td v-else>
              <input v-model="editingAnimal.vr_peso" type="text" />
            </td>
            <td v-if="editingAnimal.id !== animal.id">
              {{ animal.dt_nascimento }}
            </td>
            <td v-else>
              <input v-model="editingAnimal.dt_nascimento" type="text" />
            </td>
            <td>
              <button @click="editAnimal(animal)" class="btn btn-primary">
                Editar
              </button>
              <button
                v-if="editingAnimal.id === animal.id"
                @click="updateAnimal(animal)"
                class="btn btn-success"
              >
                Atualizar
              </button>
              <button @click="deleteAnimal(animal.id)" class="btn btn-danger">
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="openForm()" class="btn btn-primary">
        Adicionar animal
      </button>
      <form v-if="showForm" @submit.prevent="addAnimalNow">
        <input type="text" v-model="newAnimal.id" placeholder="ID" />
        <input
          type="text"
          v-model="newAnimal.no_animal"
          placeholder="Nome do animal"
        />
        <input type="text" v-model="newAnimal.no_raca" placeholder="Raça" />
        <input type="text" v-model="newAnimal.sexo" placeholder="Sexo" />
        <input type="text" v-model="newAnimal.vr_peso" placeholder="Peso" />
        <input
          type="text"
          v-model="newAnimal.dt_nascimento"
          placeholder="Data de nascimento"
        />
        <button type="submit" class="btn btn-success">Adicionar</button>
      </form>
      <p>Eu não sei porque, quando eu tento adicionar pelo frontend dá erro, acredito que seja por causa da relação do id passado na url, no insomnia funciona normalmente...</p>
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
      animais: [],
      editingAnimal: {},
      showForm: false,
      newAnimal: {
        id: '',
        no_animal: '',
        no_raca: '',
        sexo: '',
        vr_peso: '',
        dt_nascimento: '',
      },
    };
  },
  mounted() {
    axios.get('http://localhost:3000/animals').then((response) => {
      this.animais = response.data.animals;
    });
  },
  methods: {
    editAnimal(animal) {
      this.editingAnimal = { ...animal };
    },
    deleteAnimal(id) {
      axios.delete(`http://localhost:3000/animals/${id}`).then(() => {
        const index = this.animais.findIndex((a) => a.id === id);
        this.animais.splice(index, 1);
      });
    },
    openForm() {
      this.showForm = true;
    },
    addAnimalNow() {
      axios
        .post('http://localhost:3000/animals', this.newAnimal)
        .then((response) => {
          this.animais.push(response.data);
          this.newAnimal = {
            id: '',
            no_animal: '',
            no_raca: '',
            sexo: '',
            vr_peso: '',
            dt_nascimento: '',
          };
          this.showForm = false;
        });

      console.log(this.newAnimal);
    },

    updateAnimal(animals) {
      axios
        .put(`http://localhost:3000/animals/${animals.id}`, this.editingAnimal)
        .then(() => {
          this.editingAnimal = {};
          this.animais = this.animais.map((a) =>
            a.id === animals.id ? this.editingAnimal : a
          );
        });
      alert('Informação atualizada com sucesso!');
      window.location.reload();
    },
    addAnimal() {
      axios
        .post('http://localhost:3000/animals/${id}', this.newAnimal)
        .then((response) => {
          this.animais.push(response.data);
        });
    },
  },
};
</script>
