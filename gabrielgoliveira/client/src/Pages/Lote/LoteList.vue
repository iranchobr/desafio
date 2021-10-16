<template>
  <div class="root">
    <div class="_container-button">
      <a href="/cadastrar_lote" class="btn btn-secondary btn-lg">Cadastrar Lote</a>
    </div>
    <h1>Listar Lotes</h1>
    <div class="_card-box">
         <div class="card" v-for="(lote, index) in lotes" :key="lote.id">
          <div class="card-body">
              <h5 class="card-title"><b>{{lote.id}}</b> - {{lote.no_lote}}</h5>
              <p class="card-text"><b>ID : </b> {{lote.no_nome}}</p>
              <p class="card-text"><b>Descrição : </b>{{lote.ds_lote}}</p>
              <a type="button" class="btn btn-dark" :href="`/alterar_lote?id=${lote.id}`">Alterar Cadastro</a>
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
      lotes: [{}]
    }
  },
  methods : {
    remove(index, id){

      index = parseInt(index);
      id = parseInt(id);
   
      this.$http.delete('http://localhost:3333/lotes/'+id)
        .then(res => {
           this.lotes.splice(index, 1); /*Atualiza a lista de pessoas */
          alert('Usuário Removido da Base de Dados !');
          console.log(res);
        }).catch(err => {
          alert('Ocorreu um erro durante a remoção!');
          console.log(err);
        });

     
    }
  },
  created() {
    //  Depois que a tela está montada, executa essa função
    this.$http.get('http://localhost:3333/lotes')
      .then(res => res.json())
      .then(lotes => this.lotes = lotes);
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