<template>
  <div id="app">
    <Header />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
export default {
  name: 'App',
  components: {
    Header, Sidebar
  }
}
</script>

<style lang="scss">
@import './assets/styles/variables';
@import './assets/styles/bootstrap';

body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

.has-text-centered {
  text-align: center;
}
</style>