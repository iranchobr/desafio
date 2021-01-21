const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Sequelize  = require('sequelize');
const consign    = require('consign');

app.set('views', __dirname + '/app/views');
app.use(express.static(__dirname + '/app/public'))


app.engine('handlebars',handlebars({defaultLayout:'main'}));
app.set("view engine","handlebars");

//Body Parser 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Conexão com Banco de Dados
const sequelize = new Sequelize('irancho','adrianoa_sismei','adriano630',
	{host:'localhost',dialect:'mysql',define: {timestamps: false}});


const Pessoa = sequelize.define("pessoa",{
	id: {type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true},
	no_pessoa: {type: Sequelize.STRING},
	no_email: {type: Sequelize.STRING},
	endereco: {type: Sequelize.STRING},
	sexo: {type: Sequelize.STRING},
	ic_ativo: {type: Sequelize.BOOLEAN},
},{ freezeTableName: true });

//Dados do Post

app.post('/addPessoas',(req,res)=>{
	var checked = req.body.ic_ativo;
	if(checked != 1)
	{
		req.body.ic_ativo = 0;
	}
	if(req.body.id)
	{
		Pessoa.update({ 
						no_pessoa: req.body.no_pessoa,
						no_email:  req.body.no_email,
						endereco:  req.body.endereco,
						sexo:      req.body.sexo,
						ic_ativo:  req.body.ic_ativo
					}, {
						where: {id: req.body.id}
		}).then(function(){
			res.redirect('/lista_pessoas');
		}).catch(function(erro){
			res.send("Erro ao Cadastrar Pessoa: " + erro)
		});
	}else{
		Pessoa.create({
			id: req.body.id,
			no_pessoa: req.body.no_pessoa,
			no_email:  req.body.no_email,
			endereco:  req.body.endereco,
			sexo:      req.body.sexo,
			ic_ativo:  req.body.ic_ativo
		}).then(function(){
			res.redirect('/lista_pessoas');
		}).catch(function(erro){
			res.send("Erro ao Cadastrar Pessoa: " + erro)
		})
	}
	console.log(checked);
	
});

app.get('/form_pessoas',(req,res)=>{
	dados = {id:''}
	res.render('forms/form_pessoas',{dados});
});

app.get('/',function(req,res){
	res.render('index');
});

app.get('/lista_pessoas', (req,res)=>{
	Pessoa.findAll({raw: true}).then(function(dados){

		res.render('listas/lista_pessoas',{dados});
	}).catch(function(erro){
		res.sender('Ocorreu um Erro ao listar Registros: ' + erro);
	})
});


app.get('/lista_animais', (req,res)=>{
    res.render('listas/lista_animais');
});

app.get('/lista_lotes', (req,res)=>{
    res.render('listas/lista_lotes');
});

app.get('/lista_alocacao', (req,res)=>{
    res.render('listas/lista_alocacao');
});

app.get('/exclui_pessoa/:id',(req,res)=>{
	Pessoa.destroy({
		where:{'id': req.params.id}
	}).then(function(){
		res.redirect('/lista_pessoas');
	}).catch(function(erro){
		res.send('Erro ao Escluir');
	})
})

app.get('/edita_pessoa/:id',(req,res)=>{
	Pessoa.findAll({where: {id: req.params.id}}).then(function(dados){
		res.render('forms/form_pessoas',{dados});
		//res.render('listas/lista_pessoas',{dados});
		console.log(dados);
	}).catch(function(erro){
		res.send('Erro ao carregar dados');
	});	
})


app.listen(3000,function(){
    console.log("Servidor ON");    
});