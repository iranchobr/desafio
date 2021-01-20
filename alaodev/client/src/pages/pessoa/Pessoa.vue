<template>
  <div>
    <navbar :navtitle="navtitle"></navbar>
    <sidebar></sidebar>
    <b-container class="my-5">
      <form @submit.prevent="create()">
        <b-row>
          <b-col class="my-2" sm>
            <b-form-input
              v-model="pessoa.no_pessoa"
              placeholder="Nome"
            ></b-form-input>
          </b-col>
          <b-col class="my-2" sm>
            <b-form-input
              v-model="pessoa.no_email"
              placeholder="E-mail"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-2">
            <b-form-input
              v-model="pessoa.endereco"
              placeholder="Endereço"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row align-v="center">
          <b-col class="my-2">
            <b-form-select
              v-model="pessoa.sexo"
              :options="options"
            ></b-form-select>
          </b-col>
          <b-col class="my-2">
            <b-form-checkbox
              id="pessoa-checkbox"
              v-model="pessoa.ic_ativo"
              name="pessoa-checkbox"
              value="true"
              unchecked-value="false"
            >
              Ativo
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-button block variant="danger" type="submit" size="lg">
          Cadastrar
        </b-button>
      </form>
    </b-container>
    <b-table
      id="register-person-table"
      striped
      hover
      :fields="fields"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      responsive="lg"
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
      v-b-modal.modal-lg
      @ok="handleOk"
    >
      <form>
        <b-row>
          <b-col class="my-2">
            <b-form-input
              v-model="pessoaUpdate.no_pessoa"
              placeholder="Nome"
            ></b-form-input>
          </b-col>
          <b-col class="my-2">
            <b-form-input
              v-model="pessoaUpdate.no_email"
              placeholder="E-mail"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-2">
            <b-form-input
              v-model="pessoaUpdate.endereco"
              placeholder="Endereço"
              value="teste"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-2">
            <b-form-select
              v-model="pessoaUpdate.sexo"
              :options="options"
            ></b-form-select>
          </b-col>
          <b-col>
            <b-form-checkbox
              id="pessoa-update-checkbox"
              v-model="pessoaUpdate.ic_ativo"
              name="pessoa-update-checkbox"
              value="true"
              unchecked-value="false"
            >
              Ativo
            </b-form-checkbox>
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
      navtitle: "Pessoa",
      fields: [
        {
          key: "id",
          sortable: true,
          label: "Id",
          tdClass: "td-align-middle",
        },
        {
          key: "no_pessoa",
          sortable: true,
          label: "Nome",
          tdClass: "td-align-middle",
        },
        {
          key: "no_email",
          sortable: true,
          label: "E-mail",
          tdClass: "td-align-middle",
        },
        {
          key: "endereco",
          sortable: true,
          label: "Endereço",
          tdClass: "td-align-middle",
        },
        {
          key: "sexo",
          sortable: true,
          label: "Sexo",
          tdClass: "td-align-middle",
        },
        {
          key: "ic_ativo",
          sortable: true,
          label: "Ativo",
          tdClass: "td-align-middle",
        },
        {
          key: "createdAt",
          sortable: true,
          label: "Criado em",
          tdClass: "td-align-middle",
        },
        {
          key: "updatedAt",
          sortable: true,
          label: "Atualizado em",
          tdClass: "td-align-middle",
        },
        {
          key: "items",
          sortable: false,
          label: "Ações",
          tdClass: "td-align-middle",
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
      pessoa: {
        no_pessoa: null,
        no_email: null,
        endereco: null,
        sexo: null,
        ic_ativo: false,
      },
      pessoaUpdate: {
        no_pessoa: null,
        no_email: null,
        endereco: null,
        sexo: null,
        ic_ativo: false,
      },
      updateConfirm: "",
    };
  },

  methods: {
    create() {
      this.$http.post("http://localhost:3000/pessoas", this.pessoa).then(() => {
        this.$http
          .get("http://localhost:3000/pessoas")
          .then((res) => res.json())
          .then((item) => (this.items = item))
          .then(() => {
            this.$swal({
              position: "top-end",
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
          this.$http.delete("http://localhost:3000/pessoas/" + id).then(() => {
            this.$swal(
              "Deletado!",
              "Registro deletado com sucesso.",
              "success"
            );
            this.$http
              .get("http://localhost:3000/pessoas")
              .then((res) => res.json())
              .then((item) => (this.items = item));
          });
        }
      });
    },
    update(id) {
      this.$http
        .get("http://localhost:3000/pessoas/" + id)
        .then((res) => res.json())
        .then((pessoa) => (this.pessoaUpdate = pessoa))
        .then(this.$bvModal.show("update-modal"));
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$http
        .patch(
          "http://localhost:3000/pessoas/" + this.pessoaUpdate.id,
          this.pessoaUpdate
        )
        .then(() => {
          this.$http
            .get("http://localhost:3000/pessoas")
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
      .get("http://localhost:3000/pessoas")
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

.td-align-middle {
  vertical-align: middle;
}
</style>
