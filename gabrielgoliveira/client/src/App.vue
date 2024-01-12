<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>

import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    navbar: Navbar,
  },
}
</script>

