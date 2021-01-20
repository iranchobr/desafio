<template>
  <div>
    <navbar :navtitle="navtitle"></navbar>
    <sidebar></sidebar>
    <b-container class="my-5">
      <form @submit.prevent="create()">
        <b-row>
          <b-col sm>
            <b-row>
              <b-col class="my-2">
                <b-form-input
                  v-model="animalLote.fk_id_animal"
                  placeholder="Id Animal"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="my-2">
                <b-form-input
                  v-model="animalLote.fk_id_lote"
                  placeholder="Id Lote"
                ></b-form-input>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="my-2">
                <b-form-checkbox
                  id="animal-lote-checkbox"
                  v-model="animalLote.ic_bezerro"
                  name="animal-lote-checkbox"
                  value="true"
                  unchecked-value="false"
                >
                  Bezerro
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-col>
          <b-col sm>
            <b-row>
              <b-col class="my-2">
                <b-form-datepicker
                  id="dt-entrada-datepicker"
                  v-model="animalLote.dt_entrada"
                  locale="pt-BR"
                  placeholder="Data de Entrada"
                ></b-form-datepicker>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="my-2">
                <b-form-datepicker
                  id="dt-saida-datepicker"
                  v-model="animalLote.dt_saida"
                  locale="pt-BR"
                  placeholder="Data de Saída"
                ></b-form-datepicker>
              </b-col>
            </b-row>
            <b-row>
              <b-col class="my-2">
                <b-form-datepicker
                  id="dt-movimentacao-datepicker"
                  v-model="animalLote.dt_ultima_movimentacao"
                  locale="pt-BR"
                  placeholder="Data da Última Movimentação"
                ></b-form-datepicker>
              </b-col>
            </b-row>
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
              v-model="animalLoteUpdate.fk_id_animal"
              placeholder="Id Animal"
            ></b-form-input>
          </b-col>
          <b-col>
            <b-form-input
              v-model="animalLoteUpdate.fk_id_lote"
              placeholder="Id Lote"
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="my-2" sm="12">
            <b-form-datepicker
              id="dt-entrada-datepicker"
              v-model="animalLoteUpdate.dt_entrada"
              locale="pt-BR"
              placeholder="Data de Entrada"
            ></b-form-datepicker>
          </b-col>
          <b-col class="my-2" sm="12">
            <b-form-datepicker
              id="dt-saida-datepicker"
              v-model="animalLoteUpdate.dt_saida"
              locale="pt-BR"
              placeholder="Data de Saída"
            ></b-form-datepicker>
          </b-col>
          <b-col class="my-2" sm="12">
            <b-form-datepicker
              id="dt-movimentacao-datepicker"
              v-model="animalLoteUpdate.dt_ultima_movimentacao"
              locale="pt-BR"
              placeholder="Data da Última Movimentação"
            ></b-form-datepicker>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <b-form-checkbox
              id="animal-lote-update-checkbox"
              v-model="animalLoteUpdate.ic_bezerro"
              name="animal-lote-update-checkbox"
              value="true"
              unchecked-value="false"
            >
              Bezerro
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
      navtitle: "Lote do Animal",
      fields: [
        {
          key: "id",
          sortable: true,
          label: "Id",
        },
        {
          key: "fk_id_animal",
          sortable: true,
          label: "Id Animal",
        },
        {
          key: "fk_id_lote",
          sortable: true,
          label: "Id Lote",
        },
        {
          key: "dt_entrada",
          sortable: true,
          label: "Data de Entrada",
        },
        {
          key: "dt_saida",
          sortable: true,
          label: "Data de Saída",
        },
        {
          key: "dt_ultima_movimentacao",
          sortable: true,
          label: "Data da Última Movimentação",
        },
        {
          key: "ic_bezerro",
          sortable: true,
          label: "Bezerro",
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
      animalLote: {
        dt_entrada: "",
        dt_saida: "",
        dt_ultima_movimentacao: "",
        ic_bezerro: "",
        fk_id_animal: null,
        fk_id_lote: null,
      },
      animalLoteUpdate: {
        dt_entrada: "",
        dt_saida: "",
        dt_ultima_movimentacao: "",
        ic_bezerro: "",
        fk_id_animal: null,
        fk_id_lote: null,
      },
      updateConfirm: "",
    };
  },

  methods: {
    create() {
      this.$http
        .post("http://localhost:3000/animais_x_lotes", this.animalLote)
        .then(() => {
          this.$http
            .get("http://localhost:3000/animais_x_lotes")
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
          this.$http
            .delete("http://localhost:3000/animais_x_lotes/" + id)
            .then(() => {
              this.$swal(
                "Deletado!",
                "Registro deletado com sucesso.",
                "success"
              );
              this.$http
                .get("http://localhost:3000/animais_x_lotes")
                .then((res) => res.json())
                .then((item) => (this.items = item));
            });
        }
      });
    },
    update(id) {
      this.$http
        .get("http://localhost:3000/animais_x_lotes/" + id)
        .then((res) => res.json())
        .then((animalLote) => (this.animalLoteUpdate = animalLote))
        .then(this.$bvModal.show("update-modal"));
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.$http
        .patch(
          "http://localhost:3000/animais_x_lotes/" + this.animalLoteUpdate.id,
          this.animalLoteUpdate
        )
        .then(() => {
          this.$http
            .get("http://localhost:3000/animais_x_lotes")
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
      .get("http://localhost:3000/animais_x_lotes")
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
