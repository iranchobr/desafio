<template>
  <div>
    <navbar :navtitle="navtitle"></navbar>
    <sidebar></sidebar>
    <b-container class="my-5">
      <form @submit.prevent="create()">
        <b-row>
          <b-col class="my-2">
            <b-form-input
              v-model="animal.no_animal"
              placeholder="Nome"
            ></b-form-input>
          </b-col>
          <b-col class="my-2">
            <b-form-input
              v-model="animal.no_raca"
              placeholder="Raça"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-2">
            <b-form-select
              v-model="animal.sexo"
              :options="options"
            ></b-form-select>
          </b-col>
          <b-col class="my-2">
            <b-form-input
              v-model="animal.vr_peso"
              placeholder="Peso"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-2" sm>
            <b-form-datepicker
              id="nascimento-datepicker"
              v-model="animal.dt_nascimento"
              placeholder="DD/MM/AAAA"
            ></b-form-datepicker>
          </b-col>
          <b-col class="my-2" sm>
            <b-form-input
              v-model="animal.fk_id_pessoa"
              placeholder="Id Dono"
            ></b-form-input>
          </b-col>
          <b-col class="my-2" sm>
            <b-form-input
              v-model="animal.id_fazenda"
              placeholder="Id Fazenda"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-button block variant="danger" size="lg" type="submit">
          Cadastrar
        </b-button>
      </form>
    </b-container>
    <b-table
      id="register-animal-table"
      striped
      hover
      :fields="fields"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      responsive="md"
      class="table-styled"
    >
      <template #cell(items)="data">
        <b-button variant="warning" @click="update(data.item.id)">
          <b-icon-pen />
        </b-button>
        <b-button variant="danger" @click="remove(data.item.id)">
          <b-icon-trash />
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="5"
      aria-controls="register-table"
      align="center"
    ></b-pagination>
    <b-modal
      id="update-modal"
      title="Atualização de Registro"
      centered
      v-b-modal.modal-xl
      @ok="handleOk"
    >
      <form>
        <b-row>
          <b-col class="my-2" sm>
            <b-form-input
              v-model="animalUpdate.no_animal"
              placeholder="Nome"
            ></b-form-input>
          </b-col>
          <b-col class="my-2">
            <b-form-input
              v-model="animalUpdate.no_raca"
              placeholder="Raça"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-2">
            <b-form-select
              v-model="animalUpdate.sexo"
              :options="options"
            ></b-form-select>
          </b-col>
          <b-col class="my-2">
            <b-form-input
              v-model="animalUpdate.vr_peso"
              placeholder="Peso"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-2" sm="8">
            <b-form-datepicker
              id="nascimento-update-datepicker"
              v-model="animalUpdate.dt_nascimento"
              locale="pt-BR"
              placeholder="DD/MM/AAAA"
            ></b-form-datepicker>
          </b-col>
          <b-col class="my-2" sm="2">
            <b-form-input
              v-model="animalUpdate.fk_id_pessoa"
              placeholder="Id Dono"
            ></b-form-input>
          </b-col>
          <b-col class="my-2" sm="2">
            <b-form-input
              v-model="animalUpdate.id_fazenda"
              placeholder="Id Fazenda"
            ></b-form-input>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>

<script>
import Navbar from "../../components/shared/navbar/Navbar.vue";
import Sidebar from "../../components/shared/sidebar/Sidebar.vue";
export default {
  data() {
    return {
      navtitle: "Animal",
      fields: [
        {
          key: "id",
          sortable: true,
          label: "Id",
        },
        {
          key: "no_animal",
          sortable: true,
          label: "Nome",
        },
        {
          key: "no_raca",
          sortable: true,
          label: "Raça",
        },
        {
          key: "sexo",
          sortable: true,
          label: "Sexo",
        },
        {
          key: "vr_peso",
          sortable: true,
          label: "Peso",
        },
        {
          key: "dt_nascimento",
          sortable: true,
          label: "Data de Nascimento",
        },
        {
          key: "fk_id_pessoa",
          sortable: true,
          label: "Id Dono",
        },
        {
          key: "id_fazenda",
          sortable: true,
          label: "Id Fazenda",
        },
        {
          key: "createdAt",
          sortable: true,
          label: "Criado em",
        },
        {
          key: "updatedAt",
          sortable: true,
          label: "Atualizado em",
        },
        {
          key: "items",
          sortable: false,
          label: "Ações",
        },
      ],
      perPage: 5,
      currentPage: 1,
      items: [],
      selected: null,
      options: [
        { value: null, text: "Selecione o sexo" },
        { value: "M", text: "Masculino" },
        { value: "F", text: "Feminino" },
      ],
      animal: {
        id_fazenda: null,
        no_animal: null,
        no_raca: null,
        sexo: null,
        vr_peso: null,
        dt_nascimento: null,
        fk_id_pessoa: null,
      },
      animalUpdate: {
        id_fazenda: null,
        no_animal: null,
        no_raca: null,
        sexo: null,
        vr_peso: null,
        dt_nascimento: null,
        fk_id_pessoa: null,
      },
      updateConfirm: "",
    };
  },

  methods: {
    create() {
      this.$http.post("http://localhost:3000/animais", this.animal).then(() => {
        this.$http
          .get("http://localhost:3000/animais")
          .then((res) => res.json())
          .then((item) => (this.items = item))
          .then(() => {
            this.$swal({
              position: "center",
              icon: "success",
              title: "Cadastro realizado com sucesso!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      });
    },
    remove(id) {
      this.$swal({
        title: "Deseja deletar esse registro?",
        text: "Não será possível reverter essa ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#424923",
        cancelButtonColor: "#593c12",
        confirmButtonText: "Sim, deletar!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$http.delete("http://localhost:3000/animais/" + id).then(() => {
            this.$swal(
              "Deletado!",
              "Registro deletado com sucesso.",
              "success"
            );
            this.$http
              .get("http://localhost:3000/animais")
              .then((res) => res.json())
              .then((item) => (this.items = item));
          });
        }
      });
    },
    update(id) {
      this.$http
        .get("http://localhost:3000/animais/" + id)
        .then((res) => res.json())
        .then((animal) => (this.animalUpdate = animal))
        .then(this.$bvModal.show("update-modal"));
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$http
        .patch(
          "http://localhost:3000/animais/" + this.animalUpdate.id,
          this.animalUpdate
        )
        .then(() => {
          this.$http
            .get("http://localhost:3000/animais")
            .then((res) => res.json())
            .then((item) => (this.items = item))
            .then(() => {
              this.$nextTick(() => {
                this.$bvModal.hide("update-modal");
              });
            });
        });
    },
  },

  computed: {
    rows() {
      return this.items.length;
    },
  },

  components: {
    navbar: Navbar,
    sidebar: Sidebar,
  },

  created() {
    this.$http
      .get("http://localhost:3000/animais")
      .then((res) => res.json())
      .then((item) => (this.items = item));
  },
};
</script>
<style scoped>
.table-styled {
  overflow-x: scroll;
  width: 100vw;
}

table#table-transition-example .flip-list-move {
  transition: transform 1s;
}
</style>
