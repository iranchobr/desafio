const db = require('../config/database');

module.exports = {
  findAll() {
    return db.query(`SELECT * from pessoa`);
  },

  async findOne(id) {
    const results = await db.query(
      `
      SELECT * FROM pessoa WHERE id = $1 limit 1
    `,
      [id]
    );
    if (results.rows && results.rows.length) {
      return results.rows[0];
    }
    return null;
  },

  createPerson(data) {
    const query = `INSERT INTO pessoa (
      no_pessoa,
      no_email,
      endereco,
      sexo,
      ic_ativo
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING id
    `;

    const values = [
      data.no_pessoa,
      data.no_email,
      data.endereco,
      data.sexo,
      data.ic_ativo,
    ];

    return db.query(query, values);
  },

  updatePerson(data) {
    const query = `
      UPDATE pessoa SET
        no_pessoa=($1),
        no_email=($2),
        endereco=($3),
        sexo=($4),
        ic_ativo=($5)
        WHERE id = $6
    `;

    const values = [
      data.no_pessoa,
      data.no_email,
      data.endereco,
      data.sexo,
      data.ic_ativo,
      data.id,
    ];

    return db.query(query, values);
  },

  deletePerson(id) {
    return db.query(`DELETE FROM pessoa WHERE id = $1`, [id]);
  },
};
