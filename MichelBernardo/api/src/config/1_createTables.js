const db = require('./database');

async function createTables() {
  await db.connect();

  await db.query(
    `CREATE TABLE "pessoa" (
      "id" SERIAL PRIMARY KEY,
      "no_pessoa" varchar NOT NULL,
      "no_email" varchar NOT NULL,
      "endereco" varchar NOT NULL,
      "sexo" varchar NOT NULL,
      "ic_ativo" boolean NOT NULL
    );
    
    CREATE TABLE "animal" (
      "id" SERIAL PRIMARY KEY,
      "fk_id_pessoa" int NOT NULL,
      "id_fazenda" int NOT NULL,
      "no_animal" varchar NOT NULL,
      "no_raca" varchar NOT NULL,
      "sexo" varchar NOT NULL,
      "vr_peso" int NOT NULL,
      "dt_nascimento" date NOT NULL
    );
    
    CREATE TABLE "animal_lote" (
      "id" SERIAL PRIMARY KEY,
      "no_lote" varchar NOT NULL,
      "ds_lote" varchar
    );
    
    CREATE TABLE "animal_x_lote" (
      "id" SERIAL PRIMARY KEY,
      "fk_id_animal" int NOT NULL,
      "fk_id_lote" int NOT NULL,
      "dt_entrada" date,
      "dt_saida" date,
      "dt_ultima_movimentacao" date,
      "ic_bezerro" int
    );
    
    ALTER TABLE "animal" ADD FOREIGN KEY ("fk_id_pessoa") REFERENCES "pessoa" ("id");
    
    ALTER TABLE "animal_x_lote" ADD FOREIGN KEY ("fk_id_animal") REFERENCES "animal" ("id");
    
    ALTER TABLE "animal_x_lote" ADD FOREIGN KEY ("fk_id_lote") REFERENCES "animal_lote" ("id");
    
    `
  );
  await db.end();

  console.log('Tables were created!');
}

createTables();
