<template>
  <div class="root">
     <div class="_container-button">
      <a href="/cadastrar_loteanimal" class="btn btn-secondary btn-lg">Vincular Lote ao Animal</a>
    </div>
    <h1>Listar Relação Lote Animal</h1>
    <div class="_card-box">
         <div class="card" v-for="(lote, index) in animais_lotes" :key="lote.id">
          <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text"><b>Lote ID:</b> {{lote.fk_id_lote}}, <b>Animal ID:</b>  {{lote.fk_id_animal}}</p>
              <p class="card-text"><b>Data Entrada :</b>{{lote.dt_entrada}}</p>
              <p class="card-text"><b>Data Saida : </b>{{lote.dt_saida}}</p>
              <p class="card-text"><b>Data Ultima Movimentação : </b>{{lote.dt_ultima_mov}}</p>
              <a type="button" class="btn btn-dark" :href="`/alterar_animal_lote?id=${lote.id}`">Alterar Cadastro</a>
             <button type="button" class="btn btn-danger" @click="remove(index, lote.id)">Excluir</button>
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
      animais_lotes: [{}]
    }
  },
  methods : {
    remove(index, id){
      index = parseInt(index);
      id = parseInt(id);
      console.log(id);
      this.$http.delete('http://localhost:3333/animais_lote/'+id)
        .then(res => {
           this.animais_lotes.splice(index, 1); /*Atualiza a lista de pessoas */
          alert('Animal Removido da Base de Dados !');
          console.log(res);
        }).catch(err => {
          alert('Ocorreu um erro durante a remoção!');
          console.log(err);
        });

     
    }
  },
  created() {
    //  Depois que a tela está montada, executa essa função
    this.$http.get('http://localhost:3333/animais_lote/')
      .then(res => res.json())
      .then(animais_lotes => {
        console.log(animais_lotes);
        this.animais_lotes = animais_lotes
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