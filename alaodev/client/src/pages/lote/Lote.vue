<template>
  <div>
    <navbar :navtitle="navtitle"></navbar>
    <sidebar></sidebar>
    <b-container class="my-5">
      <form @submit.prevent="create()">
        <b-row>
          <b-col class="my-2">
            <b-form-input
              v-model="lote.no_lote"
              placeholder="Nome do Lote"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-2">
            <b-form-textarea
              id="textarea"
              v-model="lote.ds_lote"
              placeholder="Digite uma descrição para o lote..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
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
      v-b-modal.modal-lg
      @ok="handleOk"
    >
      <form>
        <b-row>
          <b-col>
            <b-form-input
              v-model="loteUpdate.no_lote"
              placeholder="Nome do Lote"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-textarea
              id="textarea"
              v-model="loteUpdate.ds_lote"
              placeholder="Digite uma descrição para o lote..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
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
      navtitle: "Lote",
      fields: [
        {
          key: "id",
          sortable: true,
          label: "Id",
        },
        {
          key: "no_lote",
          sortable: true,
          label: "Nome do Lote",
        },
        {
          key: "ds_lote",
          sortable: true,
          label: "Descrição",
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
      lote: {
        no_lote: "",
        ds_lote: "",
      },
      loteUpdate: {
        no_lote: "",
        ds_lote: "",
      },
      updateConfirm: "",
    };
  },

  methods: {
    create() {
      this.$http.post("http://localhost:3000/lotes", this.lote).then(() => {
        this.$http
          .get("http://localhost:3000/lotes")
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
          this.$http.delete("http://localhost:3000/lotes/" + id).then(() => {
            this.$swal(
              "Deletado!",
              "Registro deletado com sucesso.",
              "success"
            );
            this.$http
              .get("http://localhost:3000/lotes")
              .then((res) => res.json())
              .then((item) => (this.items = item));
          });
        }
      });
    },
    update(id) {
      this.$http
        .get("http://localhost:3000/lotes/" + id)
        .then((res) => res.json())
        .then((lote) => (this.loteUpdate = lote))
        .then(this.$bvModal.show("update-modal"));
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$http
        .patch(
          "http://localhost:3000/lotes/" + this.loteUpdate.id,
          this.loteUpdate
        )
        .then(() => {
          this.$http
            .get("http://localhost:3000/lotes")
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
      .get("http://localhost:3000/lotes")
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
</style>
