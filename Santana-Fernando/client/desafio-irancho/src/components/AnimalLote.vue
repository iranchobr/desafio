<template>
  <div id="app">
    <b-navbar toggleable style="padding: 30px;" type="dark" variant="secondary">
      <b-navbar-brand>
        <h1>Cadastro De Animal-Lote</h1>
      </b-navbar-brand>

      <b-button variant="outline-light" @click="returnHome()" style="width: 100px;" id="pessoa">
        Voltar
        <b-icon icon="arrow-left" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </b-navbar>
    <br />
    <br />
    <section id="BodyAnimalLote">
      <label>ID Animal:</label>
      <b-form-select v-model="animalLote.fk_id_animal">
        <b-form-select-option
          :value="animal.id"
          v-for="animal of animais"
          :key="animal.id"
        >{{ animal.no_animal }}</b-form-select-option>
      </b-form-select>
      <label>ID Lote:</label>
      <b-form-select v-model="animalLote.fk_id_lote">
        <b-form-select-option
          :value="lote.id"
          v-for="lote of lotes"
          :key="lote.id"
        >{{ lote.ds_lote }}</b-form-select-option>
      </b-form-select>
      <label>Data de Entrada:</label>
      <b-form-input v-model="animalLote.dt_entrada" :type="types[1]"></b-form-input>
      <label>Data de Saída:</label>
      <b-form-input v-model="animalLote.dt_saida" :type="types[1]"></b-form-input>
      <label>Data da Última Movimentação:</label>
      <b-form-input v-model="animalLote.dt_ultima_movimentacao" :type="types[1]"></b-form-input>
      <label>É Um Bezerro:</label>
      <b-form-group>
        <b-form-radio-group v-model="animalLote.ic_bezerro" :options="options"></b-form-radio-group>
      </b-form-group>
      <br />
      <br />
      <b-button
        @click="addAnimalLote()"
        variant="outline-light"
        style="width: 100px;"
        id="CadastroP"
      >
        Salvar
        <b-icon icon="file-earmark-plus" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </section>
    <h1 style="text-align: center;">Lista de Cadastros</h1>
    <section id="ListaAnimalLote">
      <b-list-group>
        <table id="tabelaAnimalLote">
          <tr style="background-color: gray; color:white; ">
            <td>Id</td>
            <td>ID Animal</td>
            <td>ID Lote</td>
            <td>Data De Entrada</td>
            <td>Data De Saída</td>
            <td>Data De Última Movimentação</td>
            <td>É um Bezerro</td>
            <td>Ações</td>
          </tr>
          <tr
            style="background-color: white;"
            v-for="animalLote of animaisLote"
            :key="animalLote.id"
          >
            <td>{{ animalLote.id }}</td>
            <td>{{ animalLote.fk_id_animal }}</td>
            <td>{{ animalLote.fk_id_lote }}</td>
            <td>{{ formatarDataEntrada(dt_entrada, animalLote) }}</td>
            <td>{{ formatarDataSaida(animalLote.dt_saida, animalLote) }}</td>
            <td>{{ formatarDataNascimento(animalLote.dt_ultima_movimentacao, animalLote) }}</td>
            <td>{{ animalLote.ic_bezerro ? "Sim" : "Não" }}</td>
            <td>
              <b-button
                title="Atulizar"
                @click="AtualizarAnimalLote(animalLote.id, animalLote)"
                variant="info"
                style="width: 50px;"
              >
                <b-icon icon="arrow-clockwise" style="width: 25px; height: 30px;"></b-icon>
              </b-button>

              <b-button
                title="Excluir"
                @click="DeletarAnimalLote(animalLote.id)"
                variant="info"
                style="width: 50px;"
              >
                <b-icon icon="trash" style="width: 25px; height: 30px;"></b-icon>
              </b-button>
            </td>
          </tr>
        </table>
      </b-list-group>
    </section>
  </div>
</template>

<script>
import AnimalLote from "../services/animalLote";
import Lote from "../services/lote";
import Animal from "../services/animal";
export default {
  name: "app",
  data() {
    return {
      animalLote: {
        id: "",
        fk_id_animal: "",
        fk_id_lote: "",
        dt_entrada: "",
        dt_saida: "",
        dt_ultima_movimentacao: "",
        ic_bezerro: ""
      },
      animal: {
        id: "",
        no_animal: "",
        no_raca: ""
      },
      lote: {
        id: "",
        no_lote: "",
        ds_lote: ""
      },
      animais: [],
      lotes: [],
      animaisLote: [],
      types: ["number", "date"],
      options: [
        { text: "Sim", value: true },
        { text: "Não", value: false }
      ]
    };
  },
  methods: {
    returnHome() {
      this.$router.push({
        path: "/"
      });
    },
    listarAnimal() {
      Animal.listar().then(res => {
        this.animais = res.data;
      });
    },
    listarLote() {
      Lote.listar().then(res => {
        this.lotes = res.data;
      });
    },
    listar() {
      AnimalLote.listar().then(res => {
        this.animaisLote = res.data;
      });
    },
    formatarDataEntrada(dt_entrada, animalLote) {
      let data;
      return (this.data = this.$moment(animalLote.dt_entrada)
        .format("DD/MM/YYYY"));
    },
    formatarDataSaida(dt_saida, animalLote) {
      let data;
      return (this.data = this.$moment(animalLote.dt_saida)
        .format("DD/MM/YYYY"));
    },
    formatarDataNascimento(dt_ultima_movimentacao, animalLote) {
      let data;
      return (this.data = this.$moment(animalLote.dt_ultima_movimentacao)
        .add(1, "days")
        .format("DD/MM/YYYY"));
    },
    addAnimalLote() {
      if (!this.animalLote.id) {
        if (
          this.animalLote.fk_id_animal === "" ||
          this.animalLote.fk_id_lote === " " ||
          this.animalLote.dt_entrada === "" ||
          this.animalLote.dt_saida === " " ||
          this.animalLote.dt_ultima_movimentacao === " " ||
          this.animalLote.ic_bezerro === " "
        ) {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          AnimalLote.criar(this.animalLote)
            .then(res => {
              this.animalLote = {};
              alert("Lote do Animal salvo com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao cadastrar Lote do anima!! " + err);
            });
        }
      } else {
        if (
          this.animalLote.fk_id_animal === "" ||
          this.animalLote.fk_id_lote === " " ||
          this.animalLote.dt_entrada === "" ||
          this.animalLote.dt_saida === " " ||
          this.animalLote.dt_ultima_movimentacao === " " ||
          this.animalLote.ic_bezerro === " "
        ) {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          AnimalLote.atualizar(this.animalLote.id, this.animalLote)
            .then(res => {
              this.animalLote = {};
              alert("Lote do animal Atualizado com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao Atualizar Lote do animal!! " + err);
            });
        }
      }
    },
    DeletarAnimalLote(id) {
      if (confirm("Deseja excluir o registro de lote?")) {
        AnimalLote.deletar(id)
          .then(res => {
            alert("Lote do apagado com sucesso!");
            this.listar();
          })
          .catch(err => {
            alert("Erro ao Apagar usuário!! " + err);
          });
      }
    },
    AtualizarAnimalLote(id, animalLote) {
      this.animalLote = JSON.parse(JSON.stringify(animalLote));
    }
  },
  created() {
    this.listar();
    this.listarAnimal();
    this.listarLote();
  }
};
</script>

<style lang="scss">
#BodyAnimalLote {
  padding: 50px 50px 50px 50px;
  background-color: rgb(135, 136, 136);
  margin: auto;
  width: auto;
  border-radius: 30px;
}
#ListaAnimalLote {
  padding: 50px;
  background-color: rgb(177, 177, 177);
  margin: auto;
  border-radius: 30px;
  width: auto;
}
#tabelaAnimalLote {
  border: 1px solid black;
  border-spacing: 0px;
  text-align: center;
}
td {
  border: 1px solid black;
  padding: 10px;
  width: 1100px;
}
</style>
