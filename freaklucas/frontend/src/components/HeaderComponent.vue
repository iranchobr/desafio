<template>
  <nav class="q-container navbar navbar-expand-lg navbar-light bg-light">
    <div class="d-flex justify-content-center">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav d-flex justify-content-center flex-wrap">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home <span class="sr-only"></span></router-link>
          </li>
          <li class="nav-item">
            <router-link to="/pessoas" class="nav-link" href="#">Pessoas</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/animais" class="nav-link" href="#">Animais</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/lotes" class="nav-link" href="#">Lotes</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/animais-lotes" class="nav-link" href="#">Animais-lotes</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HeaderComponent',
}
</script>
