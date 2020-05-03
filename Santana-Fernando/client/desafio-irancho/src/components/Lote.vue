<template>
  <div id="app">
    <b-navbar toggleable style="padding: 30px;" type="dark" variant="warning">
      <b-navbar-brand>
        <h1>Cadastro De Lote</h1>
      </b-navbar-brand>

      <b-button variant="outline-light" @click="returnHome()" style="width: 100px;" id="pessoa">
        Voltar
        <b-icon icon="arrow-left" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </b-navbar>
    <br />
    <br />
    <section id="BodyLote">
      <label>Nome Do Lote:</label>
      <b-form-textarea
        t
        v-model="lote.no_lote"
        style="height: 200px;"
        placeholder="Digite o seu nome completo"
      ></b-form-textarea>
      <label>Descrição do lote:</label>
      <b-form-textarea
        v-model="lote.ds_lote"
        style="height: 200px;"
        placeholder="Digite o seu nome completo"
      ></b-form-textarea>
      <br />
      <br />
      <b-button @click="addLote()" variant="outline-light" style="width: 100px;" id="CadastroP">
        Salvar
        <b-icon icon="file-earmark-plus" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </section>
    <br />
    <br />
    <h1 style="text-align: center;">Lista de Cadastros</h1>
    <br />
    <br />
    <section id="listaDeCadastros">
      <b-list-group>
        <table id="tabela">
          <tr style="background-color: gray; color:white; ">
            <td>Id</td>
            <td>Nome Do Lote</td>
            <td>Descríção</td>
            <td>Ações</td>
          </tr>
          <tr style="background-color: white;" v-for="lote of lotes" :key="lote.id">
            <td>{{ lote.id }}</td>
            <td>{{ lote.no_lote }}</td>
            <td>{{ lote.ds_lote }}</td>
            <td>
              <b-button
                title="Atualizar"
                @click="AtualizaLote(id, lote)"
                variant="info"
                style="width: 50px;"
              >
                <b-icon icon="arrow-clockwise" style="width: 25px; height: 30px;"></b-icon>
              </b-button>

              <b-button
                title="Excluir"
                @click="DeletarLote(lote.id)"
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
import Lote from "../services/lote";
export default {
  name: "app",
  data() {
    return {
      lote: {
        id: "",
        no_lote: "",
        ds_lote: ""
      },
      lotes: []
    };
  },
  methods: {
    returnHome() {
      this.$router.push({
        path: "/"
      });
    },
    listar() {
      Lote.listar().then(res => {
        this.lotes = res.data;
      });
    },
    addLote() {
      if (!this.lote.id) {
        if (this.lote.no_lote == "" || this.lote.ds_lote == "") {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          Lote.criar(this.lote)
            .then(res => {
              this.lote = {};
              alert("Lote salvo com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao cadastrar Lote!! " + err);
            });
        }
      } else {
        if (this.lote.no_lote == "" || this.lote.ds_lote == "") {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          Lote.atualizar(this.lote.id, this.lote)
            .then(res => {
              this.lote = {};
              alert("Lote Atualizado com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao Atualizar Lote!! " + err);
            });
        }
      }
    },
    AtualizaLote(id, lote) {
      this.lote = JSON.parse(JSON.stringify(lote));
    },
    DeletarLote(id) {
      if (confirm("Deseja excluir o Lote?")) {
        Lote.deletar(id)
          .then(res => {
            alert("Lote apagado com sucesso!");
            this.listar();
          })
          .catch(err => {
            alert("Erro ao Apagar usuário!! " + err);
          });
      }
    }
  },
  created() {
    this.listar();
  }
};
</script>

<style lang="scss">
#BodyLote {
  padding: 50px 50px 50px 50px;
  background-color: rgb(241, 215, 66);
  margin: auto;
  border-radius: 30px;
}

#listaDeCadastros {
  padding: 50px;
  background-color: rgb(247, 239, 139);
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
