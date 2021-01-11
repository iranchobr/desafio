const db = require('../config/database');

module.exports = {
  findAll() {
    return db.query(`SELECT * from animal_x_lote`);
  },

  async findOne(id) {
    const results = await db.query(
      `
      SELECT * FROM animal_x_lote WHERE id = $1 limit 1
    `,
      [id]
    );
    if (results.rows && results.rows.length) {
      return results.rows[0];
    }
    return null;
  },

  createRegister(data) {
    const query = `INSERT INTO animal_x_lote (
      fk_id_animal,
      fk_id_lote,
      dt_entrada,
      dt_saida,
      dt_ultima_movimentacao,
      ic_bezerro
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
    `;

    const values = [
      data.fk_id_animal,
      data.fk_id_lote,
      data.dt_entrada,
      data.dt_saida,
      data.dt_ultima_movimentacao,
      data.ic_bezerro,
    ];

    return db.query(query, values);
  },

  updateRegister(data) {
    const query = `
      UPDATE animal_x_lote SET
        fk_id_animal=($1),
        fk_id_lote=($2),
        dt_entrada=($3),
        dt_saida=($4),
        dt_ultima_movimentacao=($5),
        ic_bezerro=($6)
      WHERE id = $7
    `;

    const values = [
      data.fk_id_animal,
      data.fk_id_lote,
      data.dt_entrada,
      data.dt_saida,
      data.dt_ultima_movimentacao,
      data.ic_bezerro,
      data.id,
    ];

    return db.query(query, values);
  },

  deleteRegister(id) {
    return db.query(`DELETE FROM animal_x_lote WHERE id = $1`, [id]);
  },
};
