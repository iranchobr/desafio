const db = require('../config/database');

module.exports = {
  findAll() {
    return db.query(`SELECT * from animal`);
  },

  async findOne(id) {
    const results = await db.query(
      `
      SELECT * FROM animal WHERE id = $1 limit 1
    `,
      [id]
    );
    if (results.rows && results.rows.length) {
      return results.rows[0];
    }
    return null;
  },

  createAnimal(data) {
    const query = `INSERT INTO animal (
      fk_id_pessoa,
      id_fazenda,
      no_animal,
      no_raca,
      sexo,
      vr_peso,
      dt_nascimento
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
    `;

    const values = [
      data.fk_id_pessoa,
      data.id_fazenda,
      data.no_animal,
      data.no_raca,
      data.sexo,
      data.vr_peso,
      data.dt_nascimento,
    ];

    return db.query(query, values);
  },

  updateAnimal(data) {
    const query = `
      UPDATE animal SET
      fk_id_pessoa=($1),
      id_fazenda=($2),
      no_animal=($3),
      no_raca=($4),
      sexo=($5),
      vr_peso=($6),
      dt_nascimento=(7)
        WHERE id = $8
    `;

    const values = [
      data.fk_id_pessoa,
      data.id_fazenda,
      data.no_animal,
      data.no_raca,
      data.sexo,
      data.vr_peso,
      data.dt_nascimento,
      data.id,
    ];

    return db.query(query, values);
  },

  deleteAnimal(id) {
    return db.query(`DELETE FROM animal WHERE id = $1`, [id]);
  },
};
