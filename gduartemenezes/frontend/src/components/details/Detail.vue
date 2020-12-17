<template>
  <div class="Detail col-md">
    <ul>
      <li v-for="(value, index) in dados" v-bind:key="index">
        {{ index }} -- {{ value }}
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Detail",
  components: {},
  props: ["dados"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
ul {
  list-style: none;
  text-align: left;
}
</style>
