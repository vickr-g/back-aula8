/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de ALUNOS
 *  Data: 14/04/2023
 *  Versão: 1.0
 **************************************************************************************/
//import do arquivo de config d variaveis, const e funcoes globais
var message = require('./modulo/config.js')
 //Import do arquivo DAO para acessar dados do aluno no BD
 var alunoDAO = require('../model/DAO/alunoDAO.js')

    //Inserir um novo aluno
    const inserirAluno = async function (dadosAluno){  
        //validação para tratar os campos obrigatorios e quanidade de caracteres
        if (dadosAluno.nome == ''            || dadosAluno.nome == undefined            || dadosAluno.nome.length > 100 ||
            dadosAluno.rg == ''              || dadosAluno.rg == undefined              || dadosAluno.rg.length > 15 ||
            dadosAluno.cpf == ''             || dadosAluno.cpf == undefined             || dadosAluno.cpf.length > 15 ||
            dadosAluno.data_nascimento == '' || dadosAluno.data_nascimento == undefined ||dadosAluno.data_nascimento.length > 10 ||
            dadosAluno.email == ''           || dadosAluno.email == undefined           || dadosAluno.email.length > 200
            ){
            return message.ERROR_REQUIRED_FIELDS //status code 400        
    } else {
        //envia os dados para o model inserir no banco de dados

     resultDadosAlunos = await alunoDAO.insertAluno(dadosAluno)

     console.log(resultDadosAlunos);
     // valida se o banco de dados inseriu corretamente os dados
    if (resultDadosAlunos) 
        return message.SUCESSED_CREATEAD_ITEM //status code 201 ;
    else
        return message.ERROR_INTERNAL_SERVER //status code 500 
    
    }
}


    //Atualizar um aluno existente 
    const atualizarAluno = function (dadosAluno) {

    }

    //Excluir um aluno existente
    const deletarAluno = function (id) {

    }

    //Retorna a lista de todos os alunos
    const getAlunos = async function () {

        let dadosAlunosJSON = {}

       

        //Chama a função do arquivo DAO que irá retornar todos os registros do BD
        let dadosAluno = await alunoDAO.selectAllAlunos();

        if (dadosAluno) {
            //Criando um JSON com o atributo aluno, para encaminhar um array de alunos
            dadosAlunosJSON.quantidade = dadosAluno.length;
            dadosAlunosJSON.alunos = dadosAluno
            return dadosAlunosJSON
        } else {
            return false;
        }

    }

    //Retorna o aluno filtrando pelo ID
    const getBuscarAlunoID = async function (id) {

        let idNumero = id

        let dadosAlunosJSON = {}

        //Import do arquivo DAO para acessar dados do aluno no BD
        let alunoDAO = require('../model/DAO/alunoDAO.js')

        let dadosAluno = await alunoDAO.selectByIdAluno(idNumero)
        
        if (dadosAluno){
            dadosAlunosJSON.aluno = dadosAluno
            return dadosAlunosJSON
        } else {
            return false;
        }
    }

    //Retorna o aluno filtrando pelo nome
    const getBuscarAlunoNome = async function (nome) {

        let nomeAluno = nome

        let dadosAlunosJSON = {}

        //Import do arquivo DAO para acessar dados do aluno no BD
        let alunoDAO = require('../model/DAO/alunoDAO.js')

        let dadosAluno = await alunoDAO.selectByNameAluno(nomeAluno)
        
        if (dadosAluno){
            dadosAlunosJSON.aluno = dadosAluno
            return dadosAlunosJSON
        } else {
            return false;
        }
    }

module.exports = {
    getAlunos,
    getBuscarAlunoID,
    getBuscarAlunoNome,
    inserirAluno
}

