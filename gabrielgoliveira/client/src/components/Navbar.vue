<template>

  <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
    <a class="navbar-brand" href="/">IRancho</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="/listar_pessoas">Pessoas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/listar_animais">Animal</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/listar_lotes">Lote</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/listar_loteanimal">Lote Animal</a>
        </li>
      </ul>
    </div>
  </nav>

</template>

<script>

export default {
  
};
</script>

<style scoped>
 .nav {
   margin: 10px;
 }
</style>