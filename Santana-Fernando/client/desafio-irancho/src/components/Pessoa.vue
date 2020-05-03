<template>
  <div id="app">
    <b-navbar toggleable style="padding: 30px;" type="dark" variant="info">
      <b-navbar-brand>
        <h1>Cadastro De Pessoa</h1>
      </b-navbar-brand>

      <b-button variant="outline-light" @click="returnHome()" style="width: 100px;">
        Voltar
        <b-icon icon="arrow-left" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </b-navbar>
    <!--Corpo da aplicação-->
    <br />
    <br />
    <section id="BodyPessoa">
      <label>Nome:</label>
      <b-form-input v-model="pessoa.nome_pessoa" placeholder="Digite o seu nome completo..."></b-form-input>

      <label>E-mail:</label>
      <b-form-input
        v-model="pessoa.email"
        :type="types[0]"
        placeholder="Digite o seu melhor E-mail..."
      ></b-form-input>

      <label>Endereço:</label>
      <b-form-input v-model="pessoa.endereco" placeholder="Digite o seu endereço..."></b-form-input>

      <label>Sexo:</label>
      <b-form-group>
        <b-form-radio-group v-model="pessoa.sexo" :options="options" name="SexoPessoa"></b-form-radio-group>
      </b-form-group>

      <label>Está Ativo:</label>
      <b-form-group>
        <b-form-radio-group v-model="pessoa.ic_ativo" :options="OPativo" name="radio-inline"></b-form-radio-group>
      </b-form-group>

      <b-button @click="addPessoa()" variant="outline-light" style="width: 100px;" id="CadastroP">
        Salvar
        <b-icon icon="file-earmark-plus" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </section>

    <br />
    <br />

    <h1 style="text-align: center;">Lista de Cadastros</h1>
    <!--Corpo de listagem e alterações-->
    <section id="listaDePessoa">
      <b-list-group>
        <!--Lista-->
        <table id="tabela">
          <tr style="background-color: gray; color:white; ">
            <td>Id</td>
            <td>Nome</td>
            <td>E-Mail</td>
            <td>Endereço</td>
            <td>Sexo</td>
            <td>Está Ativo:</td>
            <td>Ações</td>
          </tr>
          <tr style="background-color: white;" v-for="pessoa in pessoas" :key="pessoa.id">
            <td>{{ pessoa.id }}</td>
            <td>{{ pessoa.nome_pessoa }}</td>
            <td>{{ pessoa.email }}</td>
            <td>{{ pessoa.endereco }}</td>
            <td>{{ pessoa.sexo }}</td>
            <td>{{ pessoa.ic_ativo ? "Sim" : "Não" }}</td>
            <td>
              <b-button
                title="Atualizar"
                @click="AtualizaPessoa(id, pessoa)"
                variant="info"
                style="width: 50px;"
              >
                <b-icon icon="arrow-clockwise" style="width: 25px; height: 30px;"></b-icon>
              </b-button>

              <b-button
                title="Excluir"
                @click="DeletarPessoa(pessoa.id)"
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
import Pessoa from "../services/pessoa";

export default {
  name: "app",
  data() {
    return {
      pessoa: {
        id: "",
        nome_pessoa: "",
        email: "",
        endereco: "",
        sexo: "",
        ic_ativo: ""
      },
      pessoas: [],
      types: ["email"],
      options: [
        { text: "Masculino", value: "M" },
        { text: "Feminino", value: "F" }
      ],
      OPativo: [
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
    listar() {
      Pessoa.listar().then(res => {
        this.pessoas = res.data;
      });
    },
    addPessoa() {
      if (!this.pessoa.id) {
        if (
          this.pessoa.nome_pessoa === "" ||
          this.pessoa.email === "" ||
          this.pessoa.endereco === "" ||
          this.pessoa.sexo === "" ||
          this.pessoa.ic_ativo === ""
        ) {
          alert("Nenhum campo pode ser nulo!!");
        } else {
          Pessoa.criar(this.pessoa)
            .then(res => {
              this.pessoa = {};
              alert("Usuário salvo com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao cadastrar usuário!! " + err);
            });
        }
      } else {
        if (
          this.pessoa.nome_pessoa === "" ||
          this.pessoa.email === "" ||
          this.pessoa.endereco === "" ||
          this.pessoa.sexo === "" ||
          this.pessoa.ic_ativo === ""
        ) {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          if (
            this.pessoa.nome_pessoa === "" ||
            this.pessoa.email === "" ||
            this.pessoa.endereco === "" ||
            this.pessoa.sexo === "" ||
            this.pessoa.ic_ativo === ""
          ) {
            alert("Algum campo está nulo ou com valor inválido!!");
          } else {
            Pessoa.atualizar(this.pessoa.id, this.pessoa)
              .then(res => {
                this.pessoa = {};
                alert("Usuário Atualizado com sucesso!!");
                this.listar();
              })
              .catch(err => {
                alert("Erro ao Atualizar usuário!! " + err);
              });
          }
        }
      }
    },
    DeletarPessoa(id) {
      if (confirm("Deseja excluir o o usuário?")) {
        Pessoa.deletar(id)
          .then(res => {
            alert("Usuario apagado com sucesso!");
            this.listar();
          })
          .catch(err => {
            alert("Erro ao Apagar usuário!! " + err);
          });
      }
    },
    AtualizaPessoa(id, pessoa) {
      this.pessoa = JSON.parse(JSON.stringify(pessoa));
    }
  },
  created() {
    this.listar();
  }
};
</script>

<style lang="scss">
#BodyPessoa {
  padding: 50px;
  background-color: rgb(66, 206, 241);
  margin: auto;
  border-radius: 30px;
  width: auto;
}
#listaDePessoa {
  padding: 50px;
  background-color: rgb(191, 231, 241);
  margin: auto;
  border-radius: 30px;
  width: auto;
}
#tabela {
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
