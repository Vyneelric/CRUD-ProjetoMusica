/**************************************************************************************************************************************************************************************************
 * Objetivo: Controller responsável pela integração entre o APP e a MODEL (CRUD de dados),
 *           Validações, Tratamentos de dados e etc...
 * Data: 11/02/2025
 * Autor: Vinicius
 * Versão: 1.0
***************************************************************************************************************************************************************************************************/

//Import do arquivo de mensagens e status code
const message = require('../../modulo/config.js')


//Import do DAO para realizar o CRUD no Banco de dados
const assinaturaDAO = require('../../model/DAO/assinatura.js')

//Função para inserir uma nova música
const inserirAssinatura = async function(assinatura, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(assinatura.data_inicio === '') assinatura.data_inicio = null
            if(assinatura.data_fim === '') assinatura.data_fim = null

            if( assinatura.tipo_plano      == ''        || assinatura.tipo_plano == null      || assinatura.tipo_plano == undefined      || assinatura.tipo_plano.length > 100)
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let resultAssinatura = await assinaturaDAO.insertNovaAssinatura(assinatura)
        
                if (resultAssinatura){
                    return message.SUCESS_CREATED_ITEM //201
                } else{
                    return message.ERROR_INTERNET_SERVER_MODEL //500 que retorna caso haja erro na MODEL
                }
        
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415 que retorna o erro do tipo de conteúdo do header
        }    
    } catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER //500 que retorna caso haja erro CONTROLLER
    }


}

//Função para atulizar uma música existente
const atualizarAssinatura = async function(id, assinatura, contentType){
try {
    if(String(contentType).toLowerCase() == 'application/json'){

        if(assinatura.data_inicio === '') assinatura.data_inicio = null
        if(assinatura.data_fim === '') assinatura.data_fim = null

        if( assinatura.tipo_plano      == ''        || assinatura.tipo_plano == null   || assinatura.tipo_plano == undefined   || assinatura.tipo_plano.length > 100            ||
            id                         == ''        || id == undefined                 || id == null                           || isNaN(id)
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Verifica se o ID existe no BD
                let result = await assinaturaDAO.selectByIDAssinatura(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                    //Update
                    
                    //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                    assinatura.id = id
                    let resultAssinatura = await assinaturaDAO.updateAssinatura(assinatura)

                    
                    if(resultAssinatura){
                        return message.SUCESS_UPDATED_ITEM //200
                    }else{
                        return message.ERROR_NOT_FOUND //404
                    }
                    }

                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
} catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER //500
    }
}



//Função para excluir um artista existente.
const excluirAssinatura = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

            //Antes de excluir, estamos verificando se existe este ID no BD
            let resultAssinatura = await assinaturaDAO.selectByIDAssinatura(id)
            if(resultAssinatura != false || typeof(resultAssinatura) == 'object'){
                if(resultAssinatura.length > 0){
                    //Delete
                    let result = await assinaturaDAO.deleteAssinatura(id)

                    if(result){
                        return message.SUCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNET_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNET_SERVER_MODEL //500
            }

    }
    } catch (error) {
        //Sempre que há problemas na controller
        return message.ERROR_INTERNET_SERVER_CONTROLLER //500
    }
}

//Função para retornar uma lista de músicas
const listarAssinatura = async function(){

    //Objeto JSON
    let dadosAssinatura = {}

    try {
        let resultAssinatura = await assinaturaDAO.selectAllAssinaturas()

        if(resultAssinatura != false || typeof(resultAssinatura) == 'object'){
            if(resultAssinatura.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosAssinatura.status = true,
                dadosAssinatura.status_code = 200,
                dadosAssinatura.items = resultAssinatura.length,
                dadosAssinatura.assinaturas = resultAssinatura

                return dadosAssinatura
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNET_SERVER_MODEL //500
        }

    } catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER //500
    }
}

//Função para retornar um Assinatura pelo seu ID
const buscarAssinatura = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        //Objeto JSON
        let dadosAssinatura = {}
        let resultAssinatura = await assinaturaDAO.selectByIDAssinatura(id)

        if(resultAssinatura != false || typeof(resultAssinatura) == 'object'){
            if(resultAssinatura.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosAssinatura.status = true,
                dadosAssinatura.status_code = 200,
                dadosAssinatura.assinaturas = resultAssinatura

                return dadosAssinatura
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNET_SERVER_MODEL //500
        }
    }
    } catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER //500
    }
}




module.exports = {
    inserirAssinatura,
    atualizarAssinatura,
    excluirAssinatura,
    listarAssinatura,
    buscarAssinatura
}