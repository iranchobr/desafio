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
        <tr v-for="lote in displayedLotes" :key="lote.id">
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
            <button class="btn btn-sm btn-dark mr-10" @click="showModal(lote)">
              <b-icon icon="search"></b-icon>
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
    <div class="offset">
      <nav class="col-12" aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              v-if="page != 1"
              @click="page--"
            >
              <b-icon icon="caret-left"></b-icon>
            </button>
          </li>
          <li class="page-item">
            <button
              type="button"
              class="page-link"
              v-for="pageNumber in pages.slice(page - 1, page + 5)"
              v-bind:key="pageNumber"
              @click="page = pageNumber"
              displayedPessoas
            >
              {{ pageNumber }}
            </button>
          </li>
          <li class="page-item">
            <button
              type="button"
              @click="page++"
              v-if="page < pages.length"
              class="page-link"
            >
              <b-icon icon="caret-right"></b-icon>
            </button>
          </li>
        </ul>
      </nav>
    </div>
    <b-modal ref="my-modal" hide-header hide-footer title="Detalhe Lote">
      <div class="d-block text-center">
        <Detail :dados="elementoDetalhe" />
      </div>
      <button
        class="btn btn-dark bt-modal"
        variant="outline-danger"
        block
        @click="hideModal"
      >
        Fechar
      </button>
    </b-modal>
  </div>
</template>

<script>
import Detail from "../details/Detail";

export default {
  name: "TableLotes",
  components: {
    Detail,
  },
  data() {
    return {
      lSel: [],
      lotes: [
        {
          id: "7e6e98cc-1413-4aa2-958e-d204326ca591",
          no_lote: "Red",
          ds_lote: "Gado corte",
          created_at: "2020-04-05",
          updated_at: "2020-06-19",
        },
        {
          id: "cc178e85-9911-4bcc-a10a-e86e590518a3",
          no_lote: "Teal",
          ds_lote: "Gado corte",
          created_at: "2019-12-24",
          updated_at: "2020-05-21",
        },
        {
          id: "abe2f382-ed87-49da-87e0-b308f4d7304c",
          no_lote: "Turquoise",
          ds_lote: "Gado corte",
          created_at: "2020-02-03",
          updated_at: "2020-08-19",
        },
        {
          id: "5a36f658-913e-464c-aa36-6de75d58fd29",
          no_lote: "Yellow",
          ds_lote: "Gado corte",
          created_at: "2020-04-20",
          updated_at: "2020-06-11",
        },
        {
          id: "367b3d52-1c58-4ac6-b529-db5972bf04df",
          no_lote: "Mauv",
          ds_lote: "Gado corte",
          created_at: "2020-03-12",
          updated_at: "2020-07-28",
        },
        {
          id: "367b3d52-1c58-4ac6-b529-db5972bf04df",
          no_lote: "Mauv",
          ds_lote: "Gado corte",
          created_at: "2020-03-12",
          updated_at: "2020-07-28",
        },
        {
          id: "367b3d52-1c58-4ac6-b529-db5972bf04df",
          no_lote: "Mauv",
          ds_lote: "Gado corte",
          created_at: "2020-03-12",
          updated_at: "2020-07-28",
        },
        {
          id: "367b3d52-1c58-4ac6-b529-db5972bf04df",
          no_lote: "Mauv",
          ds_lote: "Gado corte",
          created_at: "2020-03-12",
          updated_at: "2020-07-28",
        },
      ],
      page: 1,
      perPage: 4,
      pages: [],
      lote: {},
      elementoDetalhe: {},
    };
  },
  methods: {
    showModal(lote) {
      this.elementoDetalhe = lote;
      this.$refs["my-modal"].show();
      console.log(lote);
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    setPages() {
      let numberOfPages = Math.ceil(this.lotes.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(lotes) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return lotes.slice(from, to);
    },
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
  computed: {
    displayedLotes() {
      return this.paginate(this.lotes);
    },
  },
  created() {
    this.setPages();
  },
};
</script>

<style scoped>
button.page-link {
  display: inline-block;
}
button.page-link {
  font-size: 12px;
  color: #222;
  font-weight: bold;
  width: 40px;
}

button.bt-modal {
  width: 200px;
  margin: 0 120px;
}

.offset {
  width: 500px !important;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

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
  width: 700px;
  background: #d070462d;
}

button {
  margin: 0 10px;
}
</style>
