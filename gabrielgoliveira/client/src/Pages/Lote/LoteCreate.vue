<template>
  <div class="root">
    
    <h1>Cadastrar Lote</h1>
    
     <div class="form-cadastro">
       <span class="border-0">
        <form action="#"> 
          <div class="form-group">
            <label for="exampleInputPassword1">Nome Lote:</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Nome" v-model="no_lote">
          </div>

         <div class="form-group">
          <label for="exampleFormControlTextarea1">Descrição</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="ds_lote"></textarea>
        </div>

          <button type="submit" class="btn btn-dark" @click="createLote">Cadastrar</button>
        </form>
        </span>
      </div>
  </div>
</template>

<script>


export default {
  
  name: 'index',
  data () {
    return {
      no_lote: '',
      ds_lote: ''
    }
  },
  methods : {
    createLote(){
      const lote = {
        no_lote : this.no_lote,
        ds_lote : this.ds_lote,
      }

      this.$http.post('http://localhost:3333/lotes', lote)
        .then(res => {
            alert('Usuário Cadastrado com sucesso');
        })
        .catch(err => alert('Erro : Usuário não cadastrado'))
    }
  }
}
</script>

<style scoped>
  .root {
    margin: 30px;
  }
  .form-cadastro {
    width: 800px;
    padding: 60px;
    margin : 0 auto;
  }

  .form-cadastro button {
    margin-top: 10px;
  }
</style>
