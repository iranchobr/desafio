<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item-dropdown text="Cadastros" right>
          <b-dropdown-item href="/pessoa">Pessoa</b-dropdown-item>
          <b-dropdown-item href="/animal">Animal</b-dropdown-item>
          <b-dropdown-item href="/lote">Lote</b-dropdown-item>
          <b-dropdown-item href="/loteAnimal">Lote de Animais</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
