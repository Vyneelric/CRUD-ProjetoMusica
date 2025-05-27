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
const playlistDAO = require('../../model/DAO/playlist.js')
const musicaPlaylistDAO = require ('../../model/DAO/musica_playlist.js')


//Import das controllers
const controllerUsuario = require('../usuario/controllerUsuario.js')
const controllerMusicaPlaylist = require('../../controller/musica/controllerMusicaPlaylist.js')

//Função para inserir uma nova música
const inserirPlaylist = async function(playlist, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( playlist.titulo    == ''        || playlist.titulo == null   || playlist.titulo == undefined   || playlist.titulo.length > 45   ||
                playlist.imagem_capa           == ''        || playlist.imagem_capa == null           || playlist.imagem_capa == undefined  ||
                playlist.id_usuario    == ''        || playlist.id_usuario == null           || playlist.id_usuario == undefined
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{


            let result = await playlistDAO.insertNovaPlaylist(playlist)

            if (result) {
                    if (playlist.musicas && Array.isArray(playlist.musicas)) {
                        // Obtém o ID do playlist inserido
                        let playlistInserida = await playlistDAO.selectLastInsertId()
                        let idPlaylist = playlistInserida[0].id;
                        
                        for (let musicas of playlist.musicas) {
                            if (musicas.id && !isNaN(musicas.id)) {
                                let musicaPlaylist = {
                                    id_musica: musicas.id,
                                    id_playlist: idPlaylist 
                                }
                                await musicaPlaylistDAO.insertMusicaPlaylist(musicaPlaylist);
                            }
                        }
                    }
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
const atualizarPlaylist = async function(id, playlist, contentType){
try {
    if(String(contentType).toLowerCase() == 'application/json'){
        if( playlist.titulo    == ''        || playlist.titulo == null   || playlist.titulo == undefined   || playlist.titulo.length > 45   ||
            playlist.imagem_capa           == ''        || playlist.imagem_capa == null           || playlist.imagem_capa == undefined  ||
            playlist.id_usuario    == ''        || playlist.id_usuario == null           || playlist.id_usuario == undefined ||
            id                      == ''        || id == undefined                 || id            == null                || isNaN(id)
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Verifica se o ID existe no BD
                let result = await playlistDAO.selectByIDPlaylist(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                    //Update
                    
                    //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                    playlist.id = id
                    let resultPlaylist = await playlistDAO.updatePlaylist(playlist)
                    
                    if(resultPlaylist){
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
const excluirPlaylist = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

            //Antes de excluir, estamos verificando se existe este ID no BD
            let resultPlaylist = await playlistDAO.selectByIDPlaylist(id)
            if(resultPlaylist != false || typeof(resultPlaylist) == 'object'){
                if(resultPlaylist.length > 0){
                    //Delete
                    let result = await playlistDAO.deletePlaylist(id)

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
const listarPlaylist = async function(){

    let arrayPlaylist = []


    //Objeto JSON
    let dadosPlaylist = {}

    try {
        let result = await playlistDAO.selectAllPlaylist()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosPlaylist.status = true,
                dadosPlaylist.status_code = 200,
                dadosPlaylist.items = result.length


                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação
                
                // resultFilme.forEach( async function(itemFilme){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemPlaylist of result){
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                        //Busca os dados da classificação na controller de classificacao
                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemPlaylist.id_usuario)
                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemPlaylist.usuario = dadosUsuario.usuario

                        delete itemPlaylist.id_usuario
                    /* */

                    /* RELACIONAMENTO DE MUSICAPLAYLIST (NXN) */
                    let dadosMusicas = await controllerMusicaPlaylist.buscarMusicaPorPlaylist(itemPlaylist.id)

                    itemPlaylist.musicas = dadosMusicas.musicas

                    arrayPlaylist.push(itemPlaylist)
                }

                dadosPlaylist.playlist = arrayPlaylist

                return dadosPlaylist

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
const buscarPlaylist = async function (id){
    try {

        let arrayPlaylist = []

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        //Objeto JSON
        let dadosPlaylist = {}
        let result = await playlistDAO.selectByIDPlaylist(id)

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosPlaylist.status = true,
                dadosPlaylist.status_code = 200
                //dadosPlaylist.usuarios = result


                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação
                
                // resultFilme.forEach( async function(itemFilme){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemPlaylist of result){
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                        //Busca os dados da classificação na controller de classificacao
                        let dadosUsuario = await controllerUsuario.buscarUsuario(itemPlaylist.id_usuario)
                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemPlaylist.usuario = dadosUsuario.usuario

                        delete itemPlaylist.id_usuario
                        
                    /* */

                    arrayPlaylist.push(itemPlaylist)
                }

                dadosPlaylist.usuario = arrayPlaylist

                return dadosPlaylist //200
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
    inserirPlaylist,
    atualizarPlaylist,
    excluirPlaylist,
    listarPlaylist,
    buscarPlaylist
}