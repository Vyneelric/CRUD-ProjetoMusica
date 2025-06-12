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
const generoDAO = require('../../model/DAO/genero.js')

//Função para inserir um novo genero
const inserirGenero = async function(genero, contentType){
    try {
        
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 100){
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let resultGenero = await generoDAO.insertNovoGenero(genero)
        
                if (resultGenero){
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

//Função para atulizar um genero já existente
const atualizarGenero = async function(id, genero, contentType){
try {
    if(String(contentType).toLowerCase() == 'application/json'){
        if( genero.nome            == ''        || genero.nome == null            || genero.nome == undefined            || genero.nome.length > 45           ||
            id                     == ''        || id == undefined                || id == null                          || isNaN(id)
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Verifica se o ID existe no BD
                let result = await generoDAO.selectByIDGenero(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                    //Update
                    
                    //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                    genero.id = id
                    let resultGenero = await generoDAO.updateGenero(genero)
                    
                    if(resultGenero){
                        return message.SUCESS_UPDATED_ITEM //200
                    }else{
                        return message.ERROR_NOT_FOUND //404
                    }
                    }

                }else{
                    return message.ERROR_NOT_FOUND
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
} catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER //500
    }
}



//Função para excluir uma genero já existente
const excluirGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{
            //Antes de excluir, estamos verificando se existe este ID no BD
            let resultGenero = await generoDAO.selectByIDGenero(id)
            if(resultGenero != false || typeof(resultMusica) == 'object'){
                if(resultGenero.length > 0){
                    //Delete
                    let result = await generoDAO.deleteGenero(id)

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

//Função para retornar uma lista de todos oos generos
const listarGeneros = async function(){

    //Objeto JSON
    let dadosGeneros = {}

    try {
        let resultGenero = await generoDAO.selectAllGeneros()

        if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosGeneros.status = true,
                dadosGeneros.status_code = 200,
                dadosGeneros.items = resultGenero.length,
                dadosGeneros.genero = resultGenero

                return dadosGeneros
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

//Função para retornar uma música pelo ID
//id = recebe o ID
const buscarGenero = async function (id_genero){
    try {
        if(id_genero == '' || id_genero == undefined || id_genero == null || isNaN(id_genero)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        //Objeto JSON
        let dadosGeneros = {}
        let resultGenero = await generoDAO.selectByIDGenero(id_genero)

        if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosGeneros.status = true,
                dadosGeneros.status_code = 200,
                dadosGeneros.genero = resultGenero

                return dadosGeneros
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
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarGeneros,
    buscarGenero
}