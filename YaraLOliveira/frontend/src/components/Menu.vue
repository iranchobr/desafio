<template>
<div>
<nav  class="navbar navbar-expand-lg navbar-dark bg-dark" >
  <a class="navbar-brand mr-0 mr-md-2" style=" color: #7CE647" href="/home">CRUD</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item" >
        <a class="nav-link" href="/pessoa">Pessoa</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/animal">Animal</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/lote">Lote</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  href="/alocar">Alocar Animais</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" style=" color:  #FFE41F" href="/" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Code Review
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="https://github.com/YaraLOliveira">GitHub</a>

        </div>
      </li>
    </ul>
  </div>
</nav>
</div>
</template>

<script>
export default {}
</script>

<style>

</style>
