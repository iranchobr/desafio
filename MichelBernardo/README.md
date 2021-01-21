### projeto Iranchobr
projeto criado usando Node.js, Vue.js, Postgres & Bootstrap.

Para iniciar digite os comandos:

    cd api
	
	yarn install 
	or 
	npm install

faça a configuração do banco de dados: `config/database.js`


  ``
  const client = new Pool({
    user: 'nome_usuario',
    password: 'sua_senha',
    host: 'localhost',
    port: 'sua_porta',
    database: nome_database,
  });
  ``

Depois destes passos podemos rodar o arquivo `config/1_createTables.js` e criar as tabelas com o comando:

	node src/config/1_createTables.js

Logo em seguida podemos rodar o servidor com o comando: 


  yarn start
	or
	npm start

Seguindo temos a inicialização do Front-End com os comandos:


    cd ../frontend
	npm install
  
e rode o comando:

    npm start
