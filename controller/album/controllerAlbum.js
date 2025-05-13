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
const albumDAO = require('../../model/DAO/albuns.js')


//Import das controllers
const controllerArtista = require('../artistas/controllerArtistas.js')

//Função para inserir uma nova música
const inserirAlbum = async function(album, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( album.titulo    == ''        || album.titulo == null   || album.titulo == undefined   || album.titulo.length > 45   ||
                album.data_lancamento           == ''        || album.data_lancamento == null           || album.data_lancamento == undefined ||
                album.imagem_capa           == ''        || album.imagem_capa == null           || album.imagem_capa == undefined  ||
                album.id_artista    == ''        || album.id_artista == null           || album.id_artista == undefined
            
            
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let result = await albumDAO.insertNovoAlbum(album)
        
                if (result){
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
const atualizarAlbum = async function(id, album, contentType){
try {
    if(String(contentType).toLowerCase() == 'application/json'){
        if( album.titulo    == ''        || album.titulo == null   || album.titulo == undefined   || album.titulo.length > 45   ||
            album.data_lancamento           == ''        || album.data_lancamento == null           || album.data_lancamento == undefined ||
            album.imagem_capa           == ''        || album.imagem_capa == null           || album.imagem_capa == undefined  ||
            album.id_artista    == ''        || album.id_artista == null            ||
            id                      == ''        || id == undefined                 || id            == null                || isNaN(id)
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Verifica se o ID existe no BD
                let result = await albumDAO.selectByIDAlbum(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                    //Update
                    
                    //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                    album.id = id
                    let resultAlbum = await albumDAO.updateAlbum(album)
                    if(resultAlbum){
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
const excluirAlbum = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

            //Antes de excluir, estamos verificando se existe este ID no BD
            let resultAlbum = await albumDAO.selectByIDAlbum(id)
            if(resultAlbum != false || typeof(resultAlbum) == 'object'){
                if(resultAlbum.length > 0){
                    //Delete
                    let result = await albumDAO.deleteAlbum(id)

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
const listarAlbum = async function(){

    let arrayAlbum = []


    //Objeto JSON
    let dadosAlbum = {}

    try {
        let result = await albumDAO.selectAllAlbum()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosAlbum.status = true,
                dadosAlbum.status_code = 200,
                dadosAlbum.items = result.length


                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação
                
                // resultFilme.forEach( async function(itemFilme){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemAlbum of result){
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */

                        //Busca os dados da classificação na controller de classificacao
                        let dadosArtistas = await controllerArtista.buscarArtista(itemAlbum.id_artista)

                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemAlbum.artista = dadosArtistas.artistas

                        delete itemAlbum.id_artista
                    /* */

                    arrayAlbum.push(itemAlbum)
                }

                dadosAlbum.albuns = arrayAlbum

                return dadosAlbum

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

//Função para retornar um Artista pelo seu ID
const buscarAlbum = async function (id){
    try {

        let arrayAlbum = []

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        //Objeto JSON
        let dadosAlbum = {}
        let result = await albumDAO.selectByIDAlbum(id)

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosAlbum.status = true,
                dadosAlbum.status_code = 200
                // dadosAlbum.usuarios = result


                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação
                
                // resultFilme.forEach( async function(itemFilme){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemAlbum of result){
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                        //Busca os dados da classificação na controller de classificacao
                        let dadosArtistas = await controllerArtista.buscarArtista(itemAlbum.id_artista)
                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemAlbum.artista = dadosArtistas.artistas
                        delete itemAlbum.id_artista
                    /* */

                    arrayAlbum.push(itemAlbum)
                }

                dadosAlbum.album = arrayAlbum

                return dadosAlbum //200
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
    inserirAlbum,
    atualizarAlbum,
    excluirAlbum,
    listarAlbum,
    buscarAlbum
}