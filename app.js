/**************************************************************************************
 *  Objetivo: API para integração entre back e banco de dados (GET, POST, PUT, DELETE)
 *  Autor: Muryllo
 *  Data: 14/04/2023
 *  Versão: 1.0
 **************************************************************************************/

/**
 * Express - dependencia para realizar requisições de API pelo protocolo HTTP 
 *      npm install express --save
 * 
 *  Cors - dependencia para gerenciar permissões de requisição da API
 *      npm install cors --save
 * 
 *  Body-Parser - dependencia que gerencia o corpo das resquisições 
 *      npm install body-parser --save
 **/

//Dependencia para criar as requisições de API
const express = require('express');

//Dependencia para gerenciar as permissões da API
const cors = require('cors');

//Dependencia para gerenciar o corpo das requisições da API
const bodyParser = require('body-parser');
const { request, response } = require('express');

//Cria o objeto app conforme a classe do express
const app = express()

app.use((request, response, next) => {
    //Define quem poderá acessar a API (* - Todos)
    response.header('Acess-Control-Allow-Origin', '*');
    //Define quais metodos serão utilizados na API
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

    //Atribui as permissões ao cors
    app.use(cors());

    next();
});

//CRUD (Create, Read, Update e Delete)

/************************************ 
* Objetivo: API de controle de ALUNOS
* Data: 14/04/2023
* Autor: Muryllo
* Versão: 1.0
***********************************/

    /*
    Instalação do PRISMA no projeto (biblioteca para conexão com Banco de Dados)
        npm install prisma --save
        npx prisma
        npx prisma init
        npm install @prisma/client --save

        npx prisma migrate dev  ###Serve para realizar o sincronismo entre o prisma e o Banco de Dados
    */
// define que os dados que irao chega na requisição sera no padrao json
const bodyParserJSON = bodyParser.json()

  //Import do arquivo da controller que irá solicitar a model os dados do BD
  var controllerAluno = require('./controller/controller_aluno.js')

    //EndPoint: Retorna todos os dados de alunos
    app.get('/v1/lion-school/aluno', cors(), async function(request, response){
      
        //Recebe os dados da controller do aluno
        let dadosAluno = await controllerAluno.getAlunos();

        //Valida se existe registros de aluno
        if(dadosAluno){
            response.json(dadosAluno);
            response.status(200);
        } else {
            response.json();
            response.status(404);
        }
    })

    //EndPoint: Retorna o aluno filtrando pelo ID
    app.get('/v1/lion-school/aluno/:id', cors(), async function(request, response){

        let numeroID = request.params.id;

        //Import do arquivo da controller que irá solicitar a model os dados do BD
        let controllerAluno = require('./controller/controller_aluno.js')

        //Recebe os dados da controller do aluno
        let dadosAluno = await controllerAluno.getBuscarAlunoID(numeroID);
        if(dadosAluno){
            response.json(dadosAluno);
            response.status(200);
        } else {
            response.json();
            response.status(404);
        }
    })

    //EndPoint: Retorna o aluno filtrando pelo nome
    app.get('/v1/lion-school/aluno/:nome', cors(), async function(request, response){

        let nome = request.params.nome;

        //Import do arquivo da controller que irá solicitar a model os dados do BD
        let controllerAluno = require('./controller/controller_aluno.js')

        //Recebe os dados da controller do aluno
        let dadosAluno = await controllerAluno.getBuscarAlunoID(nome);
        if(dadosAluno){
            response.json(dadosAluno);
            response.status(200);
        } else {
            response.json();
            response.status(404);
        }
    })

    //EndPoint: Insere um dado novo 
    app.post('/v1/lion-school/aluno', cors(), bodyParserJSON, async function(request, response){
        let dadosBody = request.body
       let resultDadosAluno = await controllerAluno.inserirAluno(dadosBody)

       response.status(resultDadosAluno.status)
       response.json(resultDadosAluno)
    })

    //EndPoint: Atualiza um aluno existente, filtrando pelo ID
    app.put('/v1/lion-school/aluno/:id', cors(), async function(request, response){

    })

    //EndPoint: Exclui um aluno, filtrando pelo ID
    app.delete('/v1/lion-school/aluno/:id', cors(), async function(request, response){

    })


    app.listen(8080, function () {
        console.log('Servidor aguardando requisições na porta 8080.');
    })