<template>
  <div>
    <TheNavbar />
    <div class="main">
      <div class="d-flex justify-content-center">
        <h2>Listagem de lotes</h2>
      </div>
      <div class="input-box">
        <div>
          <b-table striped hover :items="batches" :fields="fields">
            <template #cell(Opções)="row">
              <DeleteButton :row="row" @delete="deleteItem" />
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";
import DeleteButton from "@/components/TheDeleteButton";
import api from "@/services/api";
export default {
  components: {
    TheNavbar,
    DeleteButton,
  },
  data: () => ({
    batches: Array,
    fields: ["nome", "descrição", "Opções"],
  }),
  created() {
    this.getList();
  },
  methods: {
    deleteItem(id) {
      api.delete(`/batches/${id}`).then(
        () => {
          this.getList();
        },
        (err) => console.log(err)
      );
    },
    getList() {
      api.get("/batches").then((value) => {
        this.batches = value.data.map((batches) => ({
          id: batches.id,
          nome: batches.no_lote,
          descrição: batches.ds_lote,
        }));
      });
    },
  },
};
</script>

<style scoped>
</style>