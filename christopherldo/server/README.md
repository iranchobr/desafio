# How to RUN

* ```mv .env.example .env``` to copy the env example to a real .env;
* Go to .env file and configure your MySQL connection;
* ```npm install``` or ```yarn install``` to install all needed libraries;
* ```npx sequelize db:migrate``` or ```yarn sequelize db:migrate``` to set the database with its columns and fields;
* ```npm start``` or ```yarn start``` to start the server;
* If you want to undo the database creation: ```npx sequelize db:migrate:undo:all``` or ```yarn sequelize db:migrate:undo:all```;

# Front-end
Front-end app here: <a href="https://github.com/christopherldo/desafio-iRancho-client">iRancho Client</a>