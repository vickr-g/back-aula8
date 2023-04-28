/**************************************************************************************
 *  Objetivo: Responsavel pela manipulação de dados dos ALUNOS no banco de dados
 *  Autor: Muryllo
 *  Data: 14/04/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import da biblioteca do prisma client
let { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
let prisma = new PrismaClient();

//Inserir dados do aluno no Banco de dados
const insertAluno = async function (dadosAluno) {

    //script sql para inserir dados
  let sql = `insert into tbl_aluno(
    nome,
    rg,
    cpf,
    data_nascimento,
    email
  ) values(

    '${dadosAluno.nome}',
    '${dadosAluno.rg}',
    '${dadosAluno.cpf}',
    '${dadosAluno.data_nascimento}',
    '${dadosAluno.email}'
  )`
   let resultStatus = await prisma.$executeRawUnsafe(sql)

   if (resultStatus) {
       return true
   } else {
       return false
   }
}

//Atualizar um aluno existente 
const updateAluno = function (dadosAluno) {

}

//Excluir um aluno existente
const deleteAluno = function (id) {

}

//Retorna a lista de todos os alunos
const selectAllAlunos = async function () {

    //Script para buscar todos os itens no BD
    let sql = 'select * from tbl_aluno';

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_aluno') - permite interpretar o scriptSQL direto no metodo
    let rsAluno = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

//Retorna o aluno filtrando pelo ID
const selectByIdAluno = async function (id) {

    let idAluno = id

    //Script para buscar um aluno filtrando pelo ID
    let sql = `select * from tbl_aluno where id = ${idAluno}`;

    console.log(sql);
    let rsAluno = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

//Retorna o aluno filtrando pelo ID
const selectByNameAluno = async function (name) {

    let nameAluno = name

    //Script para buscar um aluno filtrando pelo ID
    let sql = `select * from tbl_aluno where nome = ${nameAluno}`;

    console.log(sql);
    let rsAluno = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsAluno.length > 0) {
        return rsAluno
    } else {
        return false;
    }
}

module.exports = {
    selectAllAlunos,
    selectByIdAluno,
    selectByNameAluno,
    insertAluno
}