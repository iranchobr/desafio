<template>
  <div class="root">
    <h1>Cadastrar Animal</h1>
    {{this.status}}
     <div class="form-cadastro">
       <span class="border-0">
        <form action="#"> 
          <div class="form-group">
            <label for="exampleInputPassword1">Nome:</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Nome" v-model="no_animal">
          </div>

           <div class="form-group">
            <label for="exampleInputPassword1">Raça:</label>
            <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Raça" v-model="no_raca">
          </div>

          <div class="row">
            <div class="col">
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
            </div>
            <div class="col">
              <div class="form-group">
                <label for="exampleInputEmail1">Peso : </label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Digite o Peso" v-model="vr_peso">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
               <div class="form-group">
                  <label for="exampleInputEmail1">ID Fazenda : </label>
                  <input type="text" class="form-control" placeholder="ID da Fazenda" v-model="id_fazenda">
                </div>
            </div>
            <div class="col">
              <div class="form-group">
                  <label for="exampleInputEmail1">ID Dono : </label>
                  <input type="text" class="form-control" placeholder="ID do Dono" v-model="fk_id_pessoa">
                </div>
            </div>
          </div>
          <div class="form-group">
              <label for="exampleInputEmail1">Data de Nascimento : </label>
              <input type="date" class="form-control" placeholder="DD/MM/AAAA" v-model="dt_nascimento">
          </div>

          <button class="btn btn-dark" @click="createAnimal">Cadastrar</button>
        
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
          status : '',
          id_fazenda : 0,
          fk_id_pessoa: 0,
          id_lote: '',
          no_animal: '',
          no_raca: '',
          sexo: '',
          vr_peso: 0,
          dt_nascimento: '',
          ic_bezerro: 0
    }
  },
  methods : {
    createAnimal(){
      const animal = {
         id_fazenda : this.id_fazenda,
         no_animal: this.no_animal,
         no_raca : this.no_raca,
         sexo: this.sexo,
         vr_peso : this.vr_peso,
         dt_nascimento : this.dt_nascimento,
         ic_bezerro : this.ic_bezerro

      }

      if(animal.sexo == '1') {
        animal.sexo = 'M'
      } else {
        animal.sexo = 'F';
      }
      
      this.$http.post(`http://localhost:3333/animais/${this.fk_id_pessoa}`, animal)
        .then(res => {
            this.status = 'Cadastro Efetuado';
            console.log('Animal Cadastrado');
            return;
        })
        .catch(err => console.lof(err));
      
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
