<template>
  <div>
    <b-form-input v-model="selected" v-show="selected" @click="resetSelected" />
    <b-form-input
      ref="searchOption"
      v-model.trim="searchName"
      v-show="!selected"
    />
    <div
      v-for="(option, index) in filterNameOptions"
      :key="index"
      class="dropdown-item"
      @click="selectedOption(option)"
      v-show="!selected"
    >
      <!--      <img :src="item.flag" class="dropdown-item-flag"/>-->
      {{ option.text }}
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  name: "About",
  data: () => ({
    selected: null,
    searchName: "",
    animals: [],
  }),
  computed: {
    filterNameOptions() {
      return this.animals.filter((item) =>
        item.text.toLowerCase().includes(this.searchName.toLowerCase())
      );
    },
  },
  methods: {
    selectedOption(option) {
      this.selected = option.text;

      api.get("/animalRegisters").then((value) => {
        const filterAnimals = value.data.filter((animal) => {
          if (animal.fk_id_animal === option.value.id) {
            return animal;
          }
          return null;
        });
        this.$emit("animal", {
          animals: option.value,
          filterAnimals,
        });
      });
    },
    resetSelected() {
      this.selected = null;
      this.$nextTick(() => this.$refs.searchOption.focus());
    },
  },
  created() {
    api.get("/animals").then((value) => {
      this.animals = value.data.map((animal) => ({
        value: animal,
        text: animal.no_animal,
      }));
    });
  },
};
</script>

<style scoped>
</style>