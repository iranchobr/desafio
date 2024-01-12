<template>
  <div class="root">
    <div class="_container-button">
      <a href="/cadastrar_pessoa" class="btn btn-secondary btn-lg">Cadastrar Pessoa</a>
    </div>
    <h1>Listar Pessoas</h1>
    <div class="_card-box">
         <div class="card" v-for="(pessoa, index) in pessoas" :key="pessoa.id">
          <div class="card-body">
              <h5 class="card-title">{{pessoa.no_pessoa}}</h5>
              <p class="card-text"><b>Email :</b> {{pessoa.no_email}}</p>
              <p class="card-text"><b>Endereço :</b>{{pessoa.endereco}}</p>
              <p class="card-text"><b>Sexo : </b>{{pessoa.sexo}}</p>
              <a class="btn btn-dark" :href="`/alterar_pessoa?id=${pessoa.id}`">Alterar Cadastro</a>
              <a class="btn btn-dark" :href="`/pessoas/animais?id=${pessoa.id}`">Ver animais</a>
             <button type="button" class="btn btn-danger" @click="remove(index, pessoa.id)">Excluir</button>
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
      pessoas: [{}]
    }
  },
  methods : {
    remove(index, id){

      index = parseInt(index);
      id = parseInt(id);
   
      this.$http.delete('http://localhost:3333/pessoas/'+id)
        .then(res => {
           this.pessoas.splice(index, 1); /*Atualiza a lista de pessoas */
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
    this.$http.get('http://localhost:3333/pessoas')
      .then(res => res.json())
      .then(pessoas => this.pessoas = pessoas);
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