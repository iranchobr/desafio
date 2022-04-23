import { Pessoa } from '../../app/models/pessoa';

const getPessoasService = async() => {
 const pessoasDb  = await Pessoa.findAll();
 const pessoasObj = pessoasDb.map(pessoa=>pessoa.dataValues); 
 return pessoasObj;
};
export default getPessoasService;
