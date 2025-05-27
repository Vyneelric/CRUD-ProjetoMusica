/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const musicaPlaylistDAO = require('../../model/DAO/musica_playlist.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirMusicaPlaylist = async function(musicaPlaylist, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    musicaPlaylist.id_musica              == ''           || musicaPlaylist.id_musica     == undefined    || musicaPlaylist.id_musica  == null || isNaN(musicaPlaylist.id_musica)  || musicaPlaylist.id_musica <=0 ||
                    musicaPlaylist.id_playlist             == ''           || musicaPlaylist.id_playlist    == undefined    || musicaPlaylist.id_playlist == null || isNaN(musicaPlaylist.id_playlist) || musicaPlaylist.id_playlist<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let result = await musicaPlaylistDAO.insertMusicaPlaylist(musicaPlaylist)

                    if(result)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const atualizarMusicaPlaylist = async function(id, musicaPlaylist, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    musicaPlaylist.id_musica              == ''           || musicaPlaylist.id_musica     == undefined    || musicaPlaylist.id_musica  == null || isNaN(musicaPlaylist.id_musica)  || musicaPlaylist.id_musica <=0 ||
                    musicaPlaylist.id_playlist             == ''           || musicaPlaylist.id_playlist    == undefined    || musicaPlaylist.id_playlist == null || isNaN(musicaPlaylist.id_playlist) || musicaPlaylist.id_playlist<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let result = await musicaPlaylistDAO.selectByIdMusicaPlaylist(parseInt(id))

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            genero.id = parseInt(id)

                            let resultGenero = await musicaPlaylistDAO.updateMusicaPlaylist(musicaPlaylist)

                            if(resultGenero){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero no DAO
const excluirMusicaPlaylist = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultgenero = await musicaPlaylistDAO.selectByIdMusicaPlaylist(parseInt(id))

            if(resultgenero != false || typeof(resultgenero) == 'object'){
                //Se existir, faremos o delete
                if(resultgenero.length > 0){
                    //delete
                    let result = await musicaPlaylistDAO.deleteMusicaPlaylist(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const listarMusicaPlaylist = async function(){
    try {
        //Objeto do tipo JSON
        let dadosMusicaPlaylist = {}
        //Chama a função para retornar os generos cadastrados
        let resultMusicaPlaylist = await musicaPlaylistDAO.selectAllMusicaPlaylist()

        if(resultMusicaPlaylist != false || typeof(resultMusicaPlaylist) == 'object'){
            if(resultMusicaPlaylist.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosMusicaPlaylist.status = true
                dadosMusicaPlaylist.status_code = 200
                dadosMusicaPlaylist.items = resultMusicaPlaylist.length
                dadosMusicaPlaylist.generos = resultMusicaPlaylist

                return dadosMusicaPlaylist
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarMusicaPlaylist = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosMusicaPlaylist = {}

            let resultMusicaPlaylist = await musicaGeneroDAO.selectByIdMusicaGenero(parseInt(id))
            
            if(resultMusicaPlaylist != false || typeof(resultMusicaPlaylist) == 'object'){
                if(resultMusicaPlaylist.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosMusicaPlaylist.status = true
                    dadosMusicaPlaylist.status_code = 200
                    dadosMusicaPlaylist.genero = resultMusicaPlaylist

                    return dadosMusicaPlaylist //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Funções Novas............................


//Função para retornar os generos pelo id da musica
const buscarPlaylistPorMusica = async function(idMusica){

    try {
        if(idMusica == '' || idMusica == undefined || idMusica == null || isNaN(idMusica) || idMusica <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosMusicaPlaylist = {}

            let resultMusicaPlaylist = await musicaPlaylistDAO.selectPlaylistByIdMusica(parseInt(idMusica))
            
            if(resultMusicaPlaylist != false || typeof(resultMusicaPlaylist) == 'object'){
                if(resultMusicaPlaylist.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosMusicaPlaylist.status = true
                    dadosMusicaPlaylist.status_code = 200
                    dadosMusicaPlaylist.musicas = resultMusicaPlaylist

                    return dadosMusicaPlaylist //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para retornar os filmes pelo id do genero
const buscarMusicaPorPlaylist = async function(idPlaylist){

    try {
        if(idPlaylist == '' || idPlaylist == undefined || idPlaylist == null || isNaN(idPlaylist) || idPlaylist <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            let dadosMusicaPlaylist = {}

            let resultMusic = await musicaPlaylistDAO.selectMusicaByIdPlaylist(parseInt(idPlaylist))
            
            if(resultMusic != false || typeof(resultMusic) == 'object'){
                if(resultMusic.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosMusicaPlaylist.status = true
                    dadosMusicaPlaylist.status_code = 200
                    dadosMusicaPlaylist.musicas = resultMusic


                    return dadosMusicaPlaylist //200
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports = {
    inserirMusicaPlaylist,
    atualizarMusicaPlaylist,
    excluirMusicaPlaylist,
    listarMusicaPlaylist,
    buscarMusicaPlaylist,
    buscarPlaylistPorMusica,
    buscarMusicaPorPlaylist
} 