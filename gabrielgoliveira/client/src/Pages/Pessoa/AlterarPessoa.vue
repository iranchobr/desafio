<template>
  <div class="root">
    <h1>Alterar</h1>
    {{this.status}}
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
      
          <button type="submit" class="btn btn-dark" @click="updateUser">Atualizar</button>
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
            id : 0,
            status: '',
            no_pessoa: '',
            no_email: '',
            endereco: '',
            sexo: '',
            ic_ativo: 0
        }
    },
    methods : {
        updateUser(){
            const user = {
                status: '',
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

            this.$http.put('http://localhost:3333/pessoas/'+this.id, user)
                .then(res => {
                    this.status = 'Usuário alterado com sucesso';
                })
                .catch(err => alert('Erro : Usuário não cadastrado'))
        }
    },
    created(){
            console.log('query : ' + this.$route.query.id)
            this.$http.get('http://localhost:3333/pessoas?=id'+this.$route.query.id)
                .then(user_res => {
                    
                    const user = user_res.body[0];
                    this.id = user.id;
                    this.no_pessoa = user.no_pessoa;
                    this.no_email = user.no_email;
                    this.endereco = user.endereco;

                    if(user.sexo == 'M') {
                        this.sexo = 1;
                    } else {
                        this.sexo = 0;
                    }

                    if(user.ic_ativo) {
                        this.ic_ativo = 1;
                    } else {
                        this.ic_ativo = 0;
                    }
                    
                })
                .catch(err => alert('Erro : Usuário não cadastrado'))
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
