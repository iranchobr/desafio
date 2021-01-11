const db = require('../config/database');

module.exports = {
  findAll() {
    return db.query(`SELECT * from animal_lote`);
  },

  async findOne(id) {
    const results = await db.query(
      `
      SELECT * FROM animal_lote WHERE id = $1 limit 1
    `,
      [id]
    );
    if (results.rows && results.rows.length) {
      return results.rows[0];
    }
    return null;
  },

  createBatch(data) {
    const query = `INSERT INTO animal_lote (
      no_lote,
      ds_lote
    ) VALUES ($1, $2)
    RETURNING id
    `;

    const values = [data.no_lote, data.ds_lote];

    return db.query(query, values);
  },

  updateBatch(data) {
    const query = `
      UPDATE animal_lote SET
      no_lote=($1),
      ds_lote=($2)
        WHERE id = $3
    `;

    const values = [data.no_lote, data.ds_lote, data.id];

    return db.query(query, values);
  },

  deleteBatch(id) {
    return db.query(`DELETE FROM animal_lote WHERE id = $1`, [id]);
  },
};
