<template>
  <div id="app">
    <b-navbar toggleable style="padding: 30px;" type="dark" variant="success">
      <b-navbar-brand>
        <h1>Cadastro De Animal</h1>
      </b-navbar-brand>

      <b-button variant="outline-light" @click="returnHome()" style="width: 100px;" id="pessoa">
        Voltar
        <b-icon icon="arrow-left" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </b-navbar>
    <br />
    <br />
    <section id="body">
      <label>Pessoa:</label>
      <b-form-select v-model="animal.fk_id_pessoa">
        <b-form-select-option
          :value="pessoa.id"
          v-for="pessoa of pessoas"
          :key="pessoa.id"
        >{{ pessoa.nome_pessoa }}</b-form-select-option>
      </b-form-select>
      <label>ID Fazenda:</label>
      <b-form-input v-model="animal.id_fazenda"></b-form-input>
      <label>Nome Do Animal:</label>
      <b-form-input v-model="animal.no_animal" placeholder="Digite o nome do animal..."></b-form-input>
      <label>Raça:</label>
      <b-form-input v-model="animal.no_raca" placeholder="Digite a raçado animal..."></b-form-input>
      <label>Sexo:</label>
      <b-form-group>
        <b-form-radio-group v-model="animal.sexo" :options="OPsexo"></b-form-radio-group>
      </b-form-group>
      <label>Peso:</label>
      <b-form-input v-model="animal.vr_peso" :type="types[1]"></b-form-input>
      <label>Data de Nascimento:</label>
      <b-form-input
        v-model="animal.dt_nascimento"
        :type="types[2]"
        placeholder="Digite o seu endereço..."
      ></b-form-input>
      <br />
      <br />
      <b-button @click="addAnimal()" variant="outline-light" style="width: 100px;" id="CadastroP">
        Salvar
        <b-icon icon="file-earmark-plus" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </section>
    <br />
    <br />
    <h1 style="text-align: center;">Lista de Cadastros</h1>
    <section id="listaAnimal" style="background-color: rgb(164, 223, 164);">
      <b-list-group>
        <table id="tabelaAnimal">
          <tr style="background-color: gray; color:white; ">
            <td>Id</td>
            <td>ID Pessoa</td>
            <td>ID Fazenda</td>
            <td>Nome Do Animal</td>
            <td>Raça</td>
            <td>Sexo</td>
            <td>Peso Kg</td>
            <td>Data de Nascimento</td>
            <td>Ações</td>
          </tr>
          <tr style="background-color: white;" v-for="animal in animais" :key="animal.id">
            <td>{{ animal.id }}</td>
            <td>{{ animal.fk_id_pessoa }}</td>
            <td>{{ animal.id_fazenda }}</td>
            <td>{{ animal.no_animal }}</td>
            <td>{{ animal.no_raca }}</td>
            <td>{{ animal.sexo }}</td>
            <td>{{ animal.vr_peso }}</td>
            <td>{{ formatarData(animal.dt_nascimento, animal) }}</td>
            <td>
              <b-button
                title="Atualizar"
                @click="AtualizaAnimal(animal.id, animal)"
                variant="info"
                style="width: 50px;"
              >
                <b-icon icon="arrow-clockwise" style="width: 25px; height: 30px;"></b-icon>
              </b-button>

              <b-button
                title="Excluir"
                @click="DeletarAnimal(animal.id)"
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
import { moment } from "vue-moment";
import Animal from "../services/animal";
import Pessoa from "../services/pessoa";
export default {
  name: "app",
  data() {
    return {
      animal: {
        id: "",
        fk_id_pessoa: "",
        id_fazenda: "",
        no_animal: "",
        no_raca: "",
        sexo: "",
        vr_peso: "",
        dt_nascimento: ""
      },
      pessoa: {
        id: "",
        nome_pessoa: ""
      },
      animais: [],
      pessoas: [],
      OPsexo: [
        { text: "Macho", value: "M" },
        { text: "Fêmea", value: "F" }
      ],
      types: ["text", "number", "date"]
    };
  },
  methods: {
    returnHome() {
      this.$router.push({
        path: "/"
      });
    },
    listarPessoa() {
      Animal.listarPessoa().then(res => {
        this.pessoas = res.data;
      });
    },
    listar() {
      Animal.listar().then(res => {
        this.animais = [];
        this.animais = res.data;
      });
    },
    formatarData(dt_nascimenton, animal) {
      let data;
      return (this.data = this.$moment(animal.dt_nascimento)
        .add(1, "days")
        .format("DD/MM/YYYY"));
    },
    addAnimal() {
      if (!this.animal.id) {
        if (
          this.animal.fk_id_pessoa === "" ||
          this.animal.id_fazenda === "" ||
          this.animal.no_animal === "" ||
          this.animal.no_raca === "" ||
          this.animal.sexo === "" ||
          this.animal.vr_peso < 0 ||
          this.animal.vr_peso === "" ||
          this.animal.dt_nascimento === ""
        ) {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          Animal.criar(this.animal)
            .then(res => {
              this.animal = {};
              alert("Animal salvo com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao cadastrar animal!! " + err);
            });
        }
      } else {
        if (
          this.animal.fk_id_pessoa === "" ||
          this.animal.id_fazenda === "" ||
          this.animal.no_animal === "" ||
          this.animal.no_raca === "" ||
          this.animal.sexo === "" ||
          this.animal.vr_peso < 0 ||
          this.animal.vr_peso === "" ||
          this.animal.dt_nascimento === ""
        ) {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          Animal.criar(this.animal)
            .then(res => {
              this.animal = {};
              alert("Animal salvo com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao cadastrar animal!! " + err);
            });
        }
      }
    },
    DeletarAnimal(id) {
      if (confirm("Deseja excluir o animal?")) {
        Animal.deletar(id)
          .then(res => {
            alert("Animal apagado com sucesso!");
            this.listar();
          })
          .catch(err => {
            alert("Erro ao Apagar animal!! " + err);
          });
      }
    },
    AtualizaAnimal(id, animal) {
      this.animal = JSON.parse(JSON.stringify(animal));
    }
  },
  created() {
    this.listar();
    this.listarPessoa();
  }
};
</script>

<style lang="scss">
#body {
  padding: 50px 50px 50px 50px;
  background-color: rgb(146, 235, 165);
  margin: auto;
  width: auto;
  border-radius: 30px;
}
#tabelaAnimal {
  border: 1px solid black;
  border-spacing: 0px;
  text-align: center;
}
#listaAnimal {
  padding: 50px;
  background-color: rgb(191, 241, 208);
  margin: auto;
  border-radius: 30px;
  width: auto;
}
td {
  border: 1px solid black;
  padding: 10px;
  width: auto;
}
</style>
