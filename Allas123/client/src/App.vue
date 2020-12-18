<template>
  <div id="app">
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand mr-0 mr-md-2" style=" color: #7CE647" href="/">IRancho</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="/pessoa">Pessoa</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/animal">Animal</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/lote">Lote</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/animal-lote">Animais Lote</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* background-color: #A7E8A2; */
}
</style>
