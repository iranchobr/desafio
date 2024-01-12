<template>
  <div class="root">

    <h1>Cadastrar Pessoa</h1>
    {{status}}
     <div class="form-cadastro">
       <span class="border-0">
        <form action="#"> 
          <div class="form-group">
            <label for="exampleInputPassword1">Nome:</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Digite seu nome" v-model="no_pessoa">
          </div>

          <div class="form-group">
            <label for="exampleInputEmail1">Email : </label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite seu email" v-model="no_email">
          </div>

          <div class="form-group">
            <label for="exampleInputPassword1">Endereço :</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Endereço" v-model="endereco">
          </div>

          <div class="form-group">
              <fieldset>
              <label for="sexo">Sexo</label>         
              <select name="sexo" class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="sexo" id="sexo">
                <option name="sexo" selected>Selecione :</option>
                <option name="sexo" value="1">Masculino</option>
                <option name="sexo" value="0">Feminio</option>
              </select> 
              </fieldset>               
          </div>

            <div class="form-group">
                <fieldset>
              <label for="ic_ativo">Ativo ?</label>         
              <select name="ic_ativo" class="form-select form-select-sm" aria-label=".form-select-sm example" v-model="ic_ativo" id="ic_ativo">
                <option name="ic_ativo" selected>Selecione :</option>
                <option name="ic_ativo" value="1">Sim</option>
                <option name="ic_ativo" value="0">Não</option>
              </select>   
              </fieldset>             
          </div>
      
          <button type="submit" class="btn btn-dark" @click="createUser">Cadastrar</button>
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
      no_pessoa: '',
      no_email: '',
      endereco: '',
      sexo: '',
      status: '',
      ic_ativo: 0
    }
  },
  methods : {
    createUser(){
      const user = {
        no_pessoa : this.no_pessoa,
        no_email : this.no_email,
        endereco : this.endereco,
        sexo : this.sexo,
        ic_ativo : this.ic_ativo
      }

      if(user.ic_ativo == '1') {
        user.ic_ativo = true;
      } else {
        user.ic_ativo = false;
      }

      if(user.sexo == '1') {
        user.sexo = 'M'
      } else {
        user.sexo = 'F';
      }

      this.$http.post('http://localhost:3333/pessoas', user)
        .then(res => {
            this.status = 'Usuário Cadastrado com sucesso';
            this.no_pessoa = '';
            this.no_email = '';
            this.endereco = '';
            this.sexo = '';
            this.ic_ativo = '';
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
