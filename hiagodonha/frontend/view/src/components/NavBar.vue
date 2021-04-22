<template>
  <div class="background">
    <b-nav tabs>
      <router-link to="/pessoa" class="space" style="color: white">Pessoa</router-link>
      <router-link to="/animal" class="space" style="color: white">Animal</router-link>
      <router-link to="/lote" class="space" style="color: white">Lote</router-link>
      <router-link to="/AnimalLote" class="space" style="color: white">Animal x Lote</router-link>
      <b-nav-item class="center"
        ><img width="130" height="30.95" src="../assets/logo-irancho.png"
      /></b-nav-item>
     <!-- <a href="https://github.com/hiagodonha" style="">hiagodonha</a> -->
    </b-nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.space {
  margin-top: 1%;
  margin-left: 1%;
}
.center {
  margin-left: 20%;
}
.background {
  background-color: #424923;
}
.color {
  color: white !important;
}
</style>
