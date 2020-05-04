//configuaração da cominicação com o banco de dados 
module.exports = {
  username: 'root',
  password: '123456',
  database: 'crud_irancho',
  host: '127.0.0.1',
  dialect: 'mysql',
  define : {
    timestamps: true,//created at - upadate at(colunas bd)
    underscored:true, // padrao de nomeclatura de tabelas
    underscoredAll: true, 
  }
}