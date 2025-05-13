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
const musicaDAO = require('../../model/DAO/musica.js')

//Função para inserir uma nova música
const inserirMusica = async function(musica, contentType){
    console.log(musica)
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( musica.nome            == ''        || musica.nome == null            || musica.nome == undefined            || musica.nome.length > 100           ||
                musica.data_lancamento == ''        || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10 ||
                musica.letra           == undefined ||
                musica.link            == undefined || musica.link.length > 200       ||
                musica.duracao         == ''        || musica.duracao == null         || musica.duracao == undefined         || musica.duracao.length > 8
            
            
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let resultMusica = await musicaDAO.insertMusica(musica)
        
                if (resultMusica){
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
const atualizarMusica = async function(id, musica, contentType){
try {
    if(String(contentType).toLowerCase() == 'application/json'){
        if( musica.nome            == ''        || musica.nome == null            || musica.nome == undefined            || musica.nome.length > 100           ||
            musica.data_lancamento == ''        || musica.data_lancamento == null || musica.data_lancamento == undefined || musica.data_lancamento.length > 10 ||
            musica.letra           == undefined ||
            musica.link            == undefined || musica.link.length > 200       ||
            musica.duracao         == ''        || musica.duracao == null         || musica.duracao == undefined         || musica.duracao.length > 8 ||
            id                     == ''        || id == undefined                || id == null                          || isNaN(id)
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Verifica se o ID existe no BD
                let result = await musicaDAO.selectByIDMusica(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                    //Update
                    
                    //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                    musica.id = id
                    let resultMusica = await musicaDAO.updateMusica(musica)
                    
                    if(resultMusica){
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



//Função para excluir uma música existente
const excluirMusica = async function(id_musica){
    try {
        if(id_musica == '' || id_musica == undefined || id_musica == null || isNaN(id_musica)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{
            //Antes de excluir, estamos verificando se existe este ID no BD
            let resultMusica = await musicaDAO.selectByIDMusica(id_musica)
            if(resultMusica != false || typeof(resultMusica) == 'object'){
                if(resultMusica.length > 0){
                    //Delete
                    let result = await musicaDAO.deleteMusica(id_musica)

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
const listarMusica = async function(){

    //Objeto JSON
    let dadosMusicas = {}

    try {
        let resultMusica = await musicaDAO.selectAllMusica()

        if(resultMusica != false || typeof(resultMusica) == 'object'){
            if(resultMusica.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosMusicas.status = true,
                dadosMusicas.status_code = 200,
                dadosMusicas.items = resultMusica.length,
                dadosMusicas.musics = resultMusica

                return dadosMusicas
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
//id_musica = recebe o ID
const buscarMusica = async function (id_musica){
    try {
        if(id_musica == '' || id_musica == undefined || id_musica == null || isNaN(id_musica)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        //Objeto JSON
        let dadosMusicas = {}
        let resultMusica = await musicaDAO.selectByIDMusica(id_musica)

        if(resultMusica != false || typeof(resultMusica) == 'object'){
            if(resultMusica.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosMusicas.status = true,
                dadosMusicas.status_code = 200,
                dadosMusicas.musics = resultMusica

                return dadosMusicas
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
    inserirMusica,
    atualizarMusica,
    excluirMusica,
    listarMusica,
    buscarMusica
}