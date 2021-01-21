<template>
  <div>
    <TheNavbar />
    <div class="main">
      <div class="d-flex justify-content-center">
        <h2>Listagem de pessoas</h2>
      </div>
      <div class="input-box">
        <div>
          <b-table striped hover :items="people" :fields="fields">
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
    people: Array,
    fields: ["nome", "endereço", "Opções"],
  }),
  created() {
    this.getList();
  },
  methods: {
    deleteItem(id) {
      api.delete(`/people/${id}`).then(
        () => {
          this.getList();
        },
        (err) => console.log(err)
      );
    },
    getList() {
      api.get("/people").then((value) => {
        this.people = value.data.map((people) => ({
          id: people.id,
          nome: people.no_pessoa,
          endereço: people.endereco,
        }));
      });
    },
  },
};
</script>

<style scoped>
</style>