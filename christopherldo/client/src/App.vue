<template>
  <div id="app">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/main/Header.vue";
import Footer from "@/components/main/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
main {
  min-height: calc(100vh - 56px * 2);
  background-color: var(--light);
  padding: 20px;
}

.pessoa,
.lote,
.animal,
.alocacao {
  .container {
    height: 100%;
    display: flex;
    flex-flow: column;
    justify-content: space-evenly;

    .top--actions {
      display: flex;

      .buttons-area {
        display: flex;

        .button {
          height: 50px;
          width: 50px;
          line-height: 50px;
          font-size: 25px;
          margin: 0 10px 20px 0;
        }
      }

      h1 {
        margin: auto;
        margin-top: 0;
        font-size: 26px;
        line-height: 50px;
      }

      form {
        margin-left: auto;
        height: 50px;

        .input-group,
        input {
          height: 100%;
        }
      }

      @media (max-width: 800px) {
        flex-flow: column;

        h1 {
          margin-top: -15px;
          align-self: flex-start;
        }

        .buttons-area {
          justify-content: center;
        }

        form {
          width: 100%;
          margin: auto;
          margin-bottom: 20px;
        }
      }
    }

    .button {
      display: block;
      height: 40px;
      width: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
    }

    th,
    td {
      padding-top: 0;
      padding-bottom: 0;
      height: 60px;
      line-height: 60px;

      @media (max-width: 1000px) {
        line-height: unset;
        padding-top: 10px;
        padding-bottom: 10px;
      }

      &.th-actions {
        width: 125px;
      }

      &.td-actions {
        display: flex;
        align-items: center;

        a {
          margin-right: 10px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
