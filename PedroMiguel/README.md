# Desafio para Vaga Dev FullStack 

Projeto criado usando Node.js, Vue.js, MySQL & Bootstrap.

Para iniciar digite os comandos:

```
cd server

yarn install 
ou
npm install
```

Edite o arquivo de configuração do banco conforme sua necessidade: `config\database.js`

```
module.exports = {
	username: "root",
	password: "password",
	database: "desafio",
	host: "localhost",
	dialect: "mysql",
}
```

Logo após rode o comando abaixo para a criação das tabelas:


```
yarn sequelize db:migrate
ou
npx sequelize db:migrate
```

E por fim rode o comando abaixo para iniciar o server:


```
yarn start
ou
npm start
```

Agora que nosso server está pronto, vamos iniciar nosso client:

Primeiro rode os comandos abaixo para instalarmos as depedências: 


```
cd ../client

yarn install 
ou
npm install
```

E depois apenas execute o comando abaixo:

```
yarn dev 
ou
npm run dev
```
