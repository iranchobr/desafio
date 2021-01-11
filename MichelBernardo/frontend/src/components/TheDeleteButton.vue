<template>
  <b-button size="sm" class="mr-2" @click="deleteItem(row.item.id)">
    Apagar
  </b-button>
</template>
<script>
import api from "@/services/api";
export default {
  name: "TheDeleteButton",
  props: {
    row: {
      type: Object,
    },
  },
  methods: {
    deleteItem(id) {
      this.$emit("delete", id);
    },
  },
};
</script>

<style scoped>
</style>