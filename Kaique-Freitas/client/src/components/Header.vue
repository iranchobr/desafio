<template>
  <div>
    <b-navbar class="container-fluid" type="dark" variant="info">
      <b-navbar-brand href="/">iRancho</b-navbar-brand>
    </b-navbar>
  </div>
</template>

<script>
import { BNavbar, BNavbarBrand } from "bootstrap-vue";
export default {
  name: "Header",
  components: {
    "b-navbar": BNavbar,
    "b-navbar-brand": BNavbarBrand
  }
};
</script>

<style scoped>
.navbar {
  background: #424923;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.navbar-brand {
  font-size: 30px;
  color: white;
  text-decoration: none;
}
</style>
