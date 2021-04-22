<template>
  <main class="home">
    <div class="container">
      <router-link
        v-for="(button, key) in buttons"
        v-bind:key="key"
        class="button"
        v-bind:to="button.path"
      >
        <div class="button--area">
          <div class="button-icon">
            <font-awesome-icon v-bind:icon="button.icon" />
          </div>
          <div class="button-desc">
            <div class="name">
              {{ button.name }}
            </div>
            <div class="desc">
              {{ button.desc }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </main>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      buttons: [
        {
          name: "Pessoa",
          path: "/pessoa",
          desc: "Faça o cadastro de pessoas",
          icon: "user-circle",
        },
        {
          name: "Animal",
          path: "/animal",
          desc: "Faça o cadastro de animais",
          icon: "horse-head",
        },
        {
          name: "Lote",
          path: "/lote",
          desc: "Faça o cadastro de lotes",
          icon: "layer-group",
        },
        {
          name: "Alocação",
          path: "/alocacao",
          desc: "Destine os animais aos lotes",
          icon: "map",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  align-items: center;

  .container {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;

    .button {
      flex: 1;
      color: #fff;
      text-decoration: 0;

      .button--area {
        min-width: 200px;
        height: 300px;
        display: flex;
        flex-flow: column;
        margin: 10px;
        padding: 20px;
        background-color: #111;
        border-radius: 20px;
        transition: all 0.2s ease-in-out 0s;

        &:hover {
          background-color: #333;
          transform: translateY(-10px);
        }

        .button-icon {
          flex: 2;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 80px;
        }

        .button-desc {
          flex: 1;
          display: flex;
          flex-flow: column;
          justify-content: space-evenly;
          text-align: center;

          .name {
            font-size: 22px;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
