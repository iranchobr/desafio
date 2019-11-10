# Desafio iRancho - Aguardamos os seus pull requests! Obrigado.

O projeto é o seguinte, criar um CRUD da entidade/tabela pessoa, utilizando as tecnologias que usamos, são elas:
- [ ] nodejs +npm (utilizar a versão 12.x)
- [ ] mysql (na instalação, manter compatibilidade com a versão 8.x)
- [ ] editor de códigos, gosto do ms visual code
- [ ] git (para quem usa windows, utilizar o git scm)
- [ ] https://dbeaver.io/
- [ ] http://fabforce.eu/dbdesigner4/
- [ ] https://www.mysql.com/products/workbench/
- [ ] https://dbdiagram.io/home
- [ ] https://www.devart.com/dbforge/mysql/studio/
- [ ] https://insomnia.rest/
- [ ] https://www.getpostman.com/
- [ ] https://www.draw.io/
- [ ] https://www.navicat.com/en/

Entender bem: 
- [ ] callback functions
- [ ] arrow functions
- [ ] promisses
- [ ] async/await em javascript
- [ ] try/catch
- [ ] .then()/.catch
- [ ] restful
- [ ] ajax

Fazer um CRUD(operações de criar, recuperar, atualizar e deletar) das entidades: 
- [ ] pessoa
  - [ ] id
  - [ ] no_pessoa
  - [ ] no_email
  - [ ] endereco
  - [ ] sexo(char M/F)
  - [ ] ic_ativo(boolean)
- [ ] animal (1xN -> Animais de pessoas)
  - [ ] id
  - [ ] fk_id_pessoa
  - [ ] id_fazenda
  - [ ] no_animal
  - [ ] no_raca
  - [ ] sexo(char M/F)
  - [ ] vr_peso
  - [ ] dt_nascimento
  - [ ] dt_nascimento
- [ ] animal_lote
  - [ ] id
  - [ ] no_lote
  - [ ] ds_lote
- [ ] animal_x_lote (NxM -> Animais X Lotes)
  - [ ] id
  - [ ] fk_id_animal
  - [ ] fk_id_lote
  - [ ] dt_entrada
  - [ ] dt_saida
  - [ ] dt_ultima_movimentacao
  - [ ] ic_bezerro

Utilizando as tecnologias:
- [ ] webpack
- [ ] vuejs
- [ ] bootstrap
- [ ] express
- [ ] sequelize

Entender 100%: https://gist.github.com/marcelomf/70376aeac3f664fffe8529e59ee7b95d

Para o server, seguir:
* https://sequelize.readthedocs.io/en/1.7.0/articles/express/
* https://medium.com/@programadriano/criando-uma-api-node-em-10-passos-com-express-js-52b2d612a8a9
* https://blog.rocketseat.com.br/nodejs-express-sequelize/
* https://github.com/marcelomf/restful-orm/tree/master/nodejs-express

Para o client, seguir:
* https://medium.com/@adammacias/criando-projeto-vue-js-com-componentes-bootstrap-4-customizados-d540460e54e5
```
Trocar:
$ npx vue init webpack-simple
Por:
$ npx vue init webpack
Rodar:
npm install --save-dev css-loader node-sass sass-loader
```
**Recomendações:**
1. Começar pelo server, e para testar usar o postman ou insomnia.
2. Ter uma pasta para o client e outra totalmente separada para o server.
