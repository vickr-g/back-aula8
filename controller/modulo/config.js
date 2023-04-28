/********************************************************************************************************
 *  Objetivo: Responsavel por padronizar as mensagens de erro, de sucesso, funções e variaveis  para o pjt
 *  Data: 28/04/2023
 * Autor: vick gindre
 *  Versão: 1.0
 *******************************************************************************************************/
/********************************************************************************************************
                                 error message >_<
 *******************************************************************************************************/
const ERROR_REQUIRED_FIELDS =  {status: 400, message: 'campo obgrigatorios nao foram preenchidos'}
const ERROR_INTERNAL_SERVER =  {status: 500, message: 'devido ao um erro interno no servido, nao foi possivel processar a requisição'}

/********************************************************************************************************
                                 sucess message <3
 *******************************************************************************************************/

const SUCESSED_CREATEAD_ITEM = {status : 201, message: 'item cirado com suceso'}

module.exports ={
    ERROR_REQUIRED_FIELDS,
    SUCESSED_CREATEAD_ITEM,
    ERROR_INTERNAL_SERVER

}
