<template>
  <div><Header /><PeopleForm /><AnimalsForm /></div>
</template>

<script>
import {} from "bootstrap-vue";

import PeopleForm from "./PeopleForm.vue";
import AnimalsForm from "./AnimalsForm.vue";
import Header from "./Header.vue";

export default {
  name: "Home",
  components: {
    Header,
    PeopleForm,
    AnimalsForm
  }
};
</script>

<style scoped></style>
