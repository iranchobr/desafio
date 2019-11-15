<template>
  <div class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
    <h1>Animal</h1>
    <div class="nav nav-tabs">
      <router-link to="/animal" :class="{'nav-link': true, 'active': this.$route.path === '/animal'}">Listar</router-link>
      <router-link to="/animal/criar" :class="{'nav-link': true, 'active': this.$route.path === '/animal/criar'}">Criar</router-link>
      <a :class="{'nav-link': true, 'disabled': true, 'active': this.$route.path.match(/^(\/animal\/editar\/).*$/)}">Editar</a>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.nav-link:focus { 
  outline: none;
}
</style>