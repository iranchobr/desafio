<template>
  <div class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <h1>Lote</h1>
    <div class="nav nav-tabs">
      <router-link to="/lote" :class="{'nav-link': true, 'active': this.$route.path === '/lote'}">Listar</router-link>
      <router-link to="/lote/criar" :class="{'nav-link': true, 'active': this.$route.path === '/lote/criar'}">Criar</router-link>
      <a :class="{'nav-link': true, 'disabled': true, 'active': this.$route.path.match(/^(\/lote\/editar\/).*$/)}">Editar</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.nav-link:focus { 
  outline: none;
}
</style>