const db = require('./database');

async function createTables() {
  await db.connect();

  await db.query(`DROP TABLE animal_x_lote, animal_lote, animal, pessoa;`);
  await db.end();

  console.log('Tables were deleted!');
}

createTables();
