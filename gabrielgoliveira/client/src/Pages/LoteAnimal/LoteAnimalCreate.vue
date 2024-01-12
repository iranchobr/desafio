<template>
  <div class="root">
  
    <h1>Vincular Lote ao Animal</h1>
    
      <div class="form-cadastro">
       <span class="border-0">
        <form action="#"> 

          <div class="row">
           <div class="col">
              <div class="form-group">
                <label for="exampleInputEmail1">ID Lote : </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite seu email" v-model="fk_id_lote">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="exampleInputEmail1">ID Animal : </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite seu email" v-model="fk_id_animal">
              </div>
            </div>
          </div>

          <div class="form-group">
              <label for="exampleInputEmail1">Data de Entrada : </label>
              <input type="date" class="form-control" placeholder="DD/MM/AAAA" v-model="dt_entrada">
          </div>

          <div class="form-group">
              <label for="exampleInputEmail1">Data de Saida : </label>
              <input type="date" class="form-control" placeholder="DD/MM/AAAA" v-model="dt_saida">
          </div>

          <div class="form-group">
              <label for="exampleInputEmail1">Data da Ultima Movimentação : </label>
              <input type="date" class="form-control" placeholder="DD/MM/AAAA" v-model="dt_ultima_mov">
          </div>

          <button type="submit" class="btn btn-dark" @click="createRelacao">Cadastrar</button>
        
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
      fk_id_lote: 0,
      fk_id_animal: 0,
      dt_entrada: '',
      dt_saida: '',
      dt_ultima_mov: '',
      ic_bezerro: false
    }
  },
  methods : {
    createRelacao(){
      const relacao = {
        dt_entrada: this.dt_entrada,
        dt_saida: this.dt_saida,
        dt_ultima_mov: this.dt_ultima_mov,
        ic_bezerro: this.ic_bezerro
      }

      this.$http.post(`http://localhost:3333/animais_lote/${this.fk_id_animal}/${this.fk_id_lote}`, relacao)
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
