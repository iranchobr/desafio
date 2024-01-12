<template>
  <div class="root">
    <div class="_container-button">
      <a href="/cadastrar_animal" class="btn btn-secondary btn-lg">Cadastrar Animal</a>
    </div>
    <h1>Listar Animais</h1>
    <div class="_card-box">
         <div class="card" v-for="(animal, index) in animais" :key="animal.id">
          <div class="card-body">
              <h5 class="card-title">{{animal.no_animal}}</h5>
              <p class="card-text"><b>Dono : </b>{{animal.dono.no_pessoa}}</p>
              <p class="card-text"><b>Raça :</b> {{animal.no_raca}}</p>
              <p class="card-text"><b>Sexo : </b>{{animal.sexo}}</p>
              <p class="card-text"><b>Fazenda : </b>{{animal.id_fazenda}} {{"    "}} <b>Peso : </b>{{animal.vr_peso}}</p>
              <p class="card-text"><b>Data de Nascimento : </b>{{animal.dt_nascimento}}</p>
              <a class="btn btn-dark" :href="`/alterar_animal?id=${animal.id}`">Alterar Cadastro</a>
             <button type="button" class="btn btn-danger" @click="remove(index, animal.id)">Excluir</button>
            </div>
          </div>
    </div>
   
  </div>
</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      animais: [{}]
    }
  },
  methods : {
    remove(index, id){
      alert(index);
      index = parseInt(index);
      id = parseInt(id);
   
      this.$http.delete('http://localhost:3333/animais/'+id)
        .then(res => {
           this.animais.splice(index, 1); /*Atualiza a lista de animais */
        }).catch(err => {
          alert('Ocorreu um erro durante a remoção!');
          console.log(err);
        });

     
    }
  },
  created() {
    //  Depois que a tela está montada, executa essa função
    this.$http.get('http://localhost:3333/animais')
      .then(res => res.json())
      .then(animais => {
        this.animais = animais;
      });
  }
}
</script>

<style scoped>
.root {
  margin: 30px;
}
._card-box {
  width: 80%;
  margin: 0 auto;
}

.card {
  margin: 20px;
}
._container-button {
  width: 100%;
  padding: 40px;
}

._container-button a {
  display: block;
  margin: 0 auto;
}
</style>