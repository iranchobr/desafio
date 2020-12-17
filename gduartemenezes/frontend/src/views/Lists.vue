<template>
  <div class="lists">
    <h3>Listas</h3>

    <h6>Selecione o tipo de Entidade:</h6>
    <b-form-group class="col-md-2">
      <b-form-select
        v-model="form.entidades"
        :options="entidades"
      ></b-form-select>
    </b-form-group>

    <div class="col-12" v-if="form.entidades == 'Pessoa'">
      <TablePessoas />
    </div>

    <div class="col-12" v-if="form.entidades == 'Animal'">
      <TableAnimais />
    </div>

    <div class="col-12" v-if="form.entidades == 'Lote'">
      <TableLotes />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TablePessoas from "../components/tables/TablePessoas";
import TableLotes from "../components/tables/TableLotes";
import TableAnimais from "../components/tables/TableAnimais";

export default {
  name: "Listas",
  components: {
    TablePessoas,
    TableLotes,
    TableAnimais,
  },
  data() {
    return {
      form: {
        entidades: null,
      },

      entidades: [
        { text: "Selecione", value: null },
        "Pessoa",
        "Animal",
        "Lote",
      ],
    };
  },
};
</script>

<style scoped>
.lists {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1000px;
}
</style>
