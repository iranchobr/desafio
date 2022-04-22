import getPessoasService from './../services/getPessoas.service';

const getPessoasController = async (req,res) => {
  getPessoasService()
    .then( pessoas_list => {
      return res.status(200).json(pessoas_list);
    })
    .catch( err => { 
      return res.json({"msg":"Something went wrong..."});
    });
};
export default getPessoasController;
