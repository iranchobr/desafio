<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-content">
      <ul class="nav flex-column">
        <li class="nav-item"><router-link to="/" :class="{ 'nav-link': true, 'active': this.$route.path === '/'}">
            <home-icon />
            Início
        </router-link></li>
        <li class="nav-item"><router-link to="/pessoa" :class="{ 'nav-link': true, 'active': this.$route.path.match(/^(\/pessoa).*$/)}">
          <user-icon />
          Pessoa
        </router-link></li>
        <li class="nav-item"><router-link to="/animal" :class="{ 'nav-link': true, 'active': this.$route.path.match(/^(\/animal).*$/)}">
          <twitter-icon />
          Animal
        </router-link></li>
        <li class="nav-item"><router-link to="/lote" :class="{ 'nav-link': true, 'active': this.$route.path.match(/^(\/lote).*$/)}">
          <square-icon />
          Lote
        </router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { HomeIcon, SquareIcon, TwitterIcon, UserIcon } from 'vue-feather-icons'
export default {
  components: {
    HomeIcon, SquareIcon, TwitterIcon, UserIcon
  }
}
</script>

<style lang="scss">
.sidebar {
  position: fixed;
  top: 48px;
  bottom: 0;
  left: 0;
  padding: 0;
  z-index: 100;
  box-shadow: inset -1px 0 0 rgba(0,0,0, .1);

  .sidebar-content {
    height: calc(100vh - 48px);
    padding-top: .5rem;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .nav-link {
    font-weight: 500;
    color: #333;

    &:focus {
      outline: none;
    }

    .feather {
      margin-right: 4px;
      color: #999;
    }

    &:hover,
    &.active {
      .feather {
        color: inherit;
      }
    }

    &.active {
      color: #007bff;
    }
  }
}

</style>