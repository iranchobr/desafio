<template>
  <footer class="text-center p-3 bg-dark text-light">
    &copy; {{ getCurrentYear }} Copyright:
    <a
      class="text-white font-weight-bold"
      href="https://christopherldo.github.io"
      target="_blank"
      rel="noreferrer"
      >ChristopherLDO</a
    >
  </footer>
</template>

<script>
export default {
  computed: {
    getCurrentYear() {
      const date = new Date();
      return date.getFullYear();
    },
  },
};
</script>
