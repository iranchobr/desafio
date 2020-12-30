Olá mundo, bem vindo ao Meu Rancho desenvolvido expecialmente para o desafio.

Para iniciar digite os comandos:

    cd server
	
	yarn install 
	or 
	npm install

faça a configuração do arquivo: `config/database.js`


    module.exports = {
    	username: "root",
    	password: "",
    	database: "crud_sequelize",
    	host: "localhost",
    	dialect: "mysql",
    }

Depois destes passos podemos rodar as migrations e criar as tabelas com o comando:


    yarn migrate
	or
	npm run migrate

Logo em seguida podemos rodar o servidor com o comando: 


    yarn start
	or
	npm start

Seguindo temos a inicialização do Front-End com os comandos:


    cd ../client
	// Use o yarn para este projeto
	yarn install

e rode o comando:

    yarn dev


Considerações finais:

O projeto foi construido utilizando as tecnologias: Node.js e frameworks como o sequelize, express e mysql2 na composição do Server ou Backend, e no front utilizei um framework chamado Quasar que roda  o VUE.JS como base e possui diversos componentes prontos que incrementam a produtividade e adiciona algumas possibilidades de BUILD, como por exemplo: Aplicativos desktop e Mobiles utilizando o Cordova.

PS: Sei que o desafio foi proposto o uso do bootstrap o qual tenho amplo dominio, porém quis trazer algo novo para demonstrar a nova tecnologia e meu conhecimento :)