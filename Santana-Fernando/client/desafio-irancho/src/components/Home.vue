<template>
  <div id="app">
    <div id="barra">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">
          <h1>IRancho</h1>
        </b-navbar-brand>
        <b-navbar-nav></b-navbar-nav>
      </b-navbar>
    </div>
    <br />
    <section id="corpo">
      <!--Botão de cadastrar pessoas-->
      <b-button
        variant="outline-primary"
        @click="CadastrarPessoa()"
        style="width: 500px;"
        id="pessoa"
      >
        <b-icon icon="person-plus" style="width: 200px; height: 200px;"></b-icon>
        <h1>Cadastrar Pessoa</h1>
      </b-button>
      <!--Botão de cadastrar pessoas-->
      <b-button
        variant="outline-success"
        @click="CadastrarAnimal()"
        style="width: 500px;"
        id="animal"
      >
        <b-icon icon="plus" style="width: 200px; height: 200px;"></b-icon>
        <h1>Cadastrar Animal</h1>
      </b-button>
      <!--Botão de cadastrar pessoas-->
      <b-button variant="outline-warning" @click="CadastrarLote()" style="width: 500px;" id="Lote">
        <b-icon icon="list-check" style="width: 200px; height: 200px;"></b-icon>
        <h1>Cadastrar Lote</h1>
      </b-button>
      <!--Botão de cadastrar pessoas-->
      <b-button
        variant="outline-secondary"
        @click="CadastrarAnimalLote()"
        style="width: 500px;"
        id="Lote"
      >
        <b-icon icon="list-check" style="width: 200px; height: 200px;"></b-icon>
        <h1>Cadastrar Animal-Lote</h1>
      </b-button>
    </section>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your React.js App"
    };
  },
  methods: {
    CadastrarPessoa() {
      this.$router.push({
        path: "/pessoa"
      });
    },
    CadastrarAnimal() {
      this.$router.push({
        path: "/animal"
      });
    },
    CadastrarLote() {
      this.$router.push({
        path: "/Lote"
      });
    },
    CadastrarAnimalLote() {
      this.$router.push({
        path: "/loteAnimal"
      });
    }
  }
};
</script>

<style lang="scss">
#corpo {
  margin: 105px;
  width: auto;
}
</style>

