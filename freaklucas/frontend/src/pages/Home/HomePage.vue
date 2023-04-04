<!-- eslint-disable vue/component-name-in-template-casing -->

<template>
  <div>
    <HeaderComponent class="justify-content-center" />
    <div class="b-container center">
      <h1 class="text-center">Página Home...</h1>
      <p>
        Foi um teste bacana, talvez o mais específico que eu já fiz, no quesito
        de detalhamento e completude, sendo um teste fullstack, fiz o meu
        melhor.
      </p>
      <p>Não implementei validações de input ou entradas de dados porque não achei tão necessário, foquei em tentar me aproximar dos requisitos funcionais.</p>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../../components/HeaderComponent.vue';

export default {
  components: {
    HeaderComponent,
  },
};
</script>
