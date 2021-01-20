<template>
  <b-sidebar
    id="sidebar-backdrop"
    title="iRancho"
    :backdrop-variant="variant"
    backdrop
    shadow
    :bg-variant="primary"
  >
    <div class="px-3 py-2">
      <nav class="mb-3">
        <b-nav vertical>
          <b-nav-item active @click="hide">
            <router-link to="/">
              Pessoa
            </router-link>
          </b-nav-item>
          <b-nav-item @click="hide">
            <router-link to="/animal">
              Animal
            </router-link>
          </b-nav-item>
          <b-nav-item @click="hide">
            <router-link to="/lote">
              Lote
            </router-link>
          </b-nav-item>
          <b-nav-item @click="hide">
            <router-link to="/animal_lote">
              Lote do Animal
            </router-link>
          </b-nav-item>
        </b-nav>
      </nav>
    </div>
  </b-sidebar>
</template>
<script>
export default {};
</script>
<style scoped>
</style>
