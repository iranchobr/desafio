<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-icon-list
        v-b-toggle.sidebar-backdrop
        font-scale="2"
        class="text-white"
      />
      <span class="text-white">Menu</span>
      <h3 class="ml-auto text-white">{{ navtitle }}</h3>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Alaodev" right>
          <b-dropdown-item href="#">Perfil</b-dropdown-item>
          <b-dropdown-item href="#">Configurações</b-dropdown-item>
          <b-dropdown-item href="#">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { BList } from "bootstrap-vue";
export default {
  props: ["navtitle"],
  components: {
    blist: BList,
  },
};
</script>

<style scoped>
.router-link-styled {
  color: #fff;
  opacity: 0.8;
  text-decoration: none;
}
</style>
