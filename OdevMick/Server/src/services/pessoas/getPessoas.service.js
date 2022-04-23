import { Pessoa } from '../../app/models/pessoa';

const getPessoasService = async() => {
 const pessoas  = await Pessoa.findAll();
 return pessoas;
};
export default getPessoasService;
