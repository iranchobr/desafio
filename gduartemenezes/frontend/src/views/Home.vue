<template>
  <div class="home">
    <div>
      Lotes
      <table class="table">
        <thead class="thead-dark">
          <!-- parte superior da tabela - |id| nome| descricao| up - del | -->
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">descrição</th>
            <th scope="col" style="width: 200px;">action</th>
          </tr>
        </thead>
        <tbody>
          <!--  imput de dados  -->
          <tr v-for="lote in lotes" :key="lote.id">
            <th scope="row">{{ lote.id }}</th>
            <td>{{ lote.no_lote }}</td>
            <td>{{ lote.ds_lote }}</td>
            <td>
              <button @click="findLote(lote.id)" class="btn btn-warning">
                Editar
              </button>
              <button @click="deleteLote(lote.id)" class="btn btn-danger">
                Remover
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      Pessoas
      <table class="table-sm">
        <thead class="thead-dark">
          <!-- parte superior da tabela - |id| nome| descricao| up - del | -->
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Ativo</th>
            <th scope="col" style="width: 200px;">action</th>
          </tr>
        </thead>
        <tbody>
          <!--  imput de dados  -->
          <tr v-for="lote in lotes" :key="lote.id">
            <th scope="row">{{ lote.id }}</th>
            <td>{{ lote.no_lote }}</td>
            <td>{{ lote.ds_lote }}</td>
            <td>
              <button @click="findPessoa(pessoa.id)" class="btn btn-warning">
                Editar
              </button>
              <button @click="deletePessoa(pessoa.id)" class="btn btn-danger">
                Remover
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  data() {
    return {
      pessoas: [
        [
          {
            id: "80290a21-ce96-4301-9b7f-a219a14e2a97",
            no_pessoa: "Frederich",
            no_email: "fmerwede0@quantcast.com",
            sexo: "M",
            ativo: false,
            created_at: "2019-12-08",
            updated_at: "2020-09-02",
          },
          {
            id: "ddfec3d9-b174-493b-a197-b806542aed0e",
            no_pessoa: "Samaria",
            no_email: "sgauchier1@wp.com",
            sexo: "F",
            ativo: true,
            created_at: "2019-11-11",
            updated_at: "2020-08-01",
          },
          {
            id: "d44dca18-213d-40d3-842d-1995f610f746",
            no_pessoa: "Addy",
            no_email: "asurpliss2@addthis.com",
            sexo: "F",
            ativo: true,
            created_at: "2019-10-23",
            updated_at: "2020-07-29",
          },
          {
            id: "280e6ed1-05ce-4900-beb5-a2e441b2e4ca",
            no_pessoa: "Emmalee",
            no_email: "egilchriest3@craigslist.org",
            sexo: "F",
            ativo: false,
            created_at: "2019-11-06",
            updated_at: "2020-07-08",
          },
          {
            id: "f9dcb542-3b46-407d-ac68-68515c952b04",
            no_pessoa: "Hyatt",
            no_email: "hransom4@nih.gov",
            sexo: "M",
            ativo: true,
            created_at: "2019-11-29",
            updated_at: "2020-07-06",
          },
          {
            id: "5b6a108e-c550-4fe7-931d-34dc652e2e3d",
            no_pessoa: "Leia",
            no_email: "lgribben5@indiegogo.com",
            sexo: "F",
            ativo: true,
            created_at: "2019-11-04",
            updated_at: "2020-09-14",
          },
          {
            id: "c259548c-1a65-4c9a-aa03-09fa3fdbde1e",
            no_pessoa: "Konstantin",
            no_email: "kbutrimovich6@shop-pro.jp",
            sexo: "M",
            ativo: true,
            created_at: "2019-09-22",
            updated_at: "2020-09-14",
          },
          {
            id: "23b74756-8029-4024-be46-9766c036e794",
            no_pessoa: "Ibbie",
            no_email: "icoleridge7@bigcartel.com",
            sexo: "F",
            ativo: true,
            created_at: "2020-03-01",
            updated_at: "2020-07-26",
          },
          {
            id: "0c4ac463-e412-47e7-a04b-5e0e71ada031",
            no_pessoa: "Nealon",
            no_email: "naspell8@typepad.com",
            sexo: "M",
            ativo: false,
            created_at: "2020-01-11",
            updated_at: "2020-08-09",
          },
          {
            id: "0babd8f2-a6b1-4049-9713-e7155629f2d8",
            no_pessoa: "Moselle",
            no_email: "mmildmott9@hexun.com",
            sexo: "F",
            ativo: false,
            created_at: "2019-10-08",
            updated_at: "2020-08-11",
          },
        ],
      ],
      pessoa: {},
      lotes: [
        { nome: "Lote 1", descrição: "Lote Corte" },
        { nome: "Lote 2", descrição: "Lote Corte" },
        { nome: "Lote 3", descrição: "Lote Corte" },
        { nome: "Lote 4", descrição: "Lote Corte" },
      ],
      lote: {},
    };
  },
  name: "Home",
  components: {},
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
