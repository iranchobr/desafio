<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul class="navbar-nav mr-auto">
        <li v-for="(item, key) in menu" v-bind:key="key" class="nav-item">
          <router-link v-bind:to="item.path" class="nav-link">{{
            item.name
          }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        { name: "Home", path: "/" },
        { name: "Pessoa", path: "/pessoa" },
        { name: "Animal", path: "/animal" },
        { name: "Lote", path: "/lote" },
        { name: "Alocação", path: "/alocacao" },
      ],
    };
  },
};
</script>
