<template>
  <div id="app">
    <b-container class="p-5">
      <router-view>
        <HomePage />
      </router-view>
    </b-container>
  </div>
</template>

<script>
import HomePage from './pages/Home/HomePage.vue';
export default {
  name: 'app',
  data() {
    return {};
  },
  components: {
    HomePage,
  },
};
</script>
