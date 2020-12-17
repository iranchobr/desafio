<template>
  <div id="app">
    <img src="./assets/logo_transparent.png" alt="" />
    <hr />
    <div id="nav">
      <router-link to="/">Home <b-icon icon="house"></b-icon></router-link> |
      <router-link to="/lists"
        >Listas <b-icon icon="journal-text"></b-icon
      ></router-link>
      |
      <router-link to="/create"
        >Criar <b-icon icon="plus"></b-icon
      ></router-link>
      |
      <router-link to="/alocar"
        >Alocar <b-icon icon="diagram3"></b-icon
      ></router-link>
    </div>
    <hr />
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #a10e2e;
  min-height: 100vh;
  background: #fbeeca;
}

#nav {
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-evenly;

  a {
    font-weight: bold;
    color: #63091c;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
img {
  margin-top: 20px;
  width: 200px;
  height: auto;
}

.form-input {
  background: #fcf3da;
  width: 350px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
  padding: 5px 10px;
}
label {
  width: 80px;
  text-align: initial;
  margin: 5px;
}

form {
  display: inherit;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px 0;
}

button {
  margin: 10px;
  width: 250px;
}

.checkbox {
  margin: 0 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
