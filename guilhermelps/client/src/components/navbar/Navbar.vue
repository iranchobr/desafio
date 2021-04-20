<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <!-- <b-navbar-brand href="#">NavBar</b-navbar-brand> -->
      <router-link to="/">
        <b-img class="img-header" src="src\assets\images\logo-irancho.png" fluid alt="Logo IRancho"></b-img>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item v-for="route, index in routes" :to="route.path" :key="index">{{ route.label }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
                <b-img class="img-user" src="src\assets\images\farmer.png" fluid alt="Foto Usuário"></b-img>
              <!-- <em>User</em> -->
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script src="./Navbar.js">
</script>

<style scoped>
  .img-header {
    width: 80px;
    cursor: pointer;
  }

  .img-user {
    width: 50px;
  }

  .navbar-dark .navbar-nav .nav-link:hover, .navbar-dark .navbar-nav .nav-link:focus {
    color: rgba(255, 255, 255);
  }

  .navbar-dark .navbar-nav .nav-link {
    color: rgba(255, 255, 255, 0.75);
    font-size: 19px;
  }
</style>