<template>
  <div class="table-lotes">
    <table class=" table table-striped tb-rendered col-8" id="tb-lotes">
      <thead class="thead-dark">
        <tr>
          <th scope="col">--</th>
          <th scope="col">Nome</th>
          <th scope="col">Descrição</th>
          <th scope="col" style="width: 200px;">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="lote in lotes" :key="lote.id">
          <td>
            <!-- checkbox se limita a uma seleção apenas -->
            <!-- quando clicada emite uma função com dado pessoa a ser usado na importação do componente -->

            <input
              type="checkbox"
              name="sel-Lote"
              @click="$emit('lote-sel', lote)"
              v-model="lSel"
              :value="lote"
              :disabled="lSel.length == 1"
            />
          </td>
          <td>{{ lote.no_lote }}</td>
          <td>{{ lote.ds_lote }}</td>

          <td class="button-gp">
            <button @click="findLote(lote.id)" class=" btn btn-sm btn-dark">
              <b-icon
                icon="search
"
              ></b-icon>
            </button>

            <button @click="editLote(lote.id)" class=" btn btn-sm btn-warning">
              <b-icon icon="pencil-square"></b-icon>
            </button>
            <button @click="deleteLote(lote.id)" class=" btn btn-sm btn-danger">
              <b-icon icon="trash"></b-icon>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableLotes",
  data() {
    return {
      lSel: [],
      lotes: [
        {
          id: "7e6e98cc-1413-4aa2-958e-d204326ca591",
          no_lote: "Red",
          ds_lote:
            "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
          created_at: "2020-04-05",
          updated_at: "2020-06-19",
        },
        {
          id: "cc178e85-9911-4bcc-a10a-e86e590518a3",
          no_lote: "Teal",
          ds_lote:
            "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
          created_at: "2019-12-24",
          updated_at: "2020-05-21",
        },
        {
          id: "abe2f382-ed87-49da-87e0-b308f4d7304c",
          no_lote: "Turquoise",
          ds_lote:
            "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
          created_at: "2020-02-03",
          updated_at: "2020-08-19",
        },
        {
          id: "5a36f658-913e-464c-aa36-6de75d58fd29",
          no_lote: "Yellow",
          ds_lote:
            "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
          created_at: "2020-04-20",
          updated_at: "2020-06-11",
        },
        {
          id: "367b3d52-1c58-4ac6-b529-db5972bf04df",
          no_lote: "Mauv",
          ds_lote:
            "Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.",
          created_at: "2020-03-12",
          updated_at: "2020-07-28",
        },
      ],

      lote: {},
    };
  },
  methods: {
    findLote(id) {
      console.log(id);
    },
    editLote(id) {
      console.log(id);
    },
    deleteLote(id) {
      console.log(id);
    },
  },
  created: {
    buscaLotes() {
      console.log("buscando");
    },
  },
};
</script>

<style scoped>
.button-gp {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.btn {
  width: 40px;
}
.tb-rendered {
  margin: auto;
}

button {
  margin: 0 10px;
}
</style>
