<template>
  <div>
    <TheNavbar />
    <div class="main">
      <div class="d-flex justify-content-center">
        <h2>Listagem de animais</h2>
      </div>
      <div class="input-box">
        <div>
          <b-table striped hover :items="animals" :fields="fields">
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
    animals: Array,
    fields: ["nome", "raça", "peso", "Opções"],
  }),
  created() {
    this.getList();
  },
  methods: {
    deleteItem(id) {
      api.delete(`/animals/${id}`).then(
        () => {
          this.getList();
        },
        (err) => console.log(err)
      );
    },
    getList() {
      api.get("/animals").then((value) => {
        this.animals = value.data.map((animals) => ({
          id: animals.id,
          nome: animals.no_animal,
          raça: animals.no_raca,
          peso: animals.vr_peso,
        }));
      });
    },
  },
};
</script>

<style scoped>
</style>