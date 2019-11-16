<template>
  <div class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <h1>Pessoa</h1>
    <div class="nav nav-tabs">
      <router-link to="/pessoa" :class="{'nav-link': true, 'active': this.$route.path === '/pessoa'}">Listar</router-link>
      <router-link to="/pessoa/criar" :class="{'nav-link': true, 'active': this.$route.path === '/pessoa/criar'}">Criar</router-link>
      <a :class="{'nav-link': true, 'disabled': true, 'active': this.$route.path.match(/^(\/pessoa\/editar\/).*$/)}">Editar</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.nav-link:focus { 
  outline: none;
}
</style>