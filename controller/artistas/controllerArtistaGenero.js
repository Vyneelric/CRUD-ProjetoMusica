/**********************************************************************************
 * Objetivo: Controller responsável pela regra de negócio referente ao CRUD de Filme Genero
 * Data: 11/02/2025
 * Autor: Marcel
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const artistaGeneroDAO = require('../../model/DAO/artista_genero.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirArtistaGenero = async function(artistaGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    artistaGenero.id_artista              == ''           || artistaGenero.id_artista     == undefined    || artistaGenero.id_artista  == null || isNaN(artistaGenero.id_artista)  || artistaGenero.id_artista <=0 ||
                    artistaGenero.id_genero             == ''           || artistaGenero.id_genero    == undefined    || artistaGenero.id_genero == null || isNaN(artistaGenero.id_genero) || artistaGenero.id_genero<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let result = await artistaGeneroDAO.insertArtistaGenero(artistaGenero)

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
const atualizarArtistaGenero = async function(id, artistaGenero, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''           || id                       == undefined    || id                    == null || isNaN(id)  || id  <= 0   ||
                    artistaGenero.id_artista              == ''           || artistaGenero.id_artista     == undefined    || artistaGenero.id_artista  == null || isNaN(artistaGenero.id_artista)  || artistaGenero.id_artista <=0 ||
                    artistaGenero.id_genero             == ''           || artistaGenero.id_genero    == undefined    || artistaGenero.id_genero == null || isNaN(artistaGenero.id_genero) || artistaGenero.id_genero<=0
                )
                {
                    return message.ERROR_REQUIRED_FIELDS //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let result = await artistaGeneroDAO.selectByIdArtistaGenero(parseInt(id))

                    if(result != false || typeof(result) == 'object'){
                        if(result.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            genero.id = parseInt(id)

                            let resultGenero = await artistaGeneroDAO.updateArtistaGenero(artistaGenero)

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
const excluirArtistaGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{

            //Funcção que verifica se  ID existe no BD
            let resultgenero = await artistaGeneroDAO.selectByIdArtistaGenero(parseInt(id))

            if(resultgenero != false || typeof(resultgenero) == 'object'){
                //Se existir, faremos o delete
                if(resultgenero.length > 0){
                    //delete
                    let result = await artistaGeneroDAO.deleteArtistaGenero(parseInt(id))

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
const listarArtistaGenero = async function(){
    try {
        //Objeto do tipo JSON
        let dadosgenero = {}
        //Chama a função para retornar os generos cadastrados
        let resultgenero = await artistaGeneroDAO.selectAllArtistaGenero()

        if(resultgenero != false || typeof(resultgenero) == 'object'){
            if(resultgenero.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosgenero.status = true
                dadosgenero.status_code = 200
                dadosgenero.items = resultgenero.length
                dadosgenero.generos = resultgenero

                return dadosgenero
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
const buscarArtistaGenero = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosgenero = {}

            let resultgenero = await artistaGeneroDAO.selectByIdArtistaGenero(parseInt(id))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosgenero.status = true
                    dadosgenero.status_code = 200
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
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
const buscarGeneroPorArtista = async function(idArtista){

    try {
        if(idArtista == '' || idArtista == undefined || idArtista == null || isNaN(idArtista) || idArtista <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            
            dadosgenero = {}

            let resultgenero = await artistaGeneroDAO.selectGeneroByIdArtista(parseInt(idArtista))
            
            if(resultgenero != false || typeof(resultgenero) == 'object'){
                if(resultgenero.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    
                    dadosgenero.status = true
                    
                    dadosgenero.status_code = 200
                    
                    dadosgenero.genero = resultgenero

                    return dadosgenero //200
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
const buscarArtistaPorGenero = async function(idGenero){

    try {
        if(idGenero == '' || idGenero == undefined || idGenero == null || isNaN(idGenero) || idGenero <=0){
            return message.ERROR_REQUIRED_FIELDS //400
        }else{
            dadosMusica = {}

            let resultMusic = await artistaGeneroDAO.selectArtistaByIdGenero(parseInt(idGenero))
            
            if(resultMusic != false || typeof(resultMusic) == 'object'){
                if(resultMusic.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosMusica.status = true
                    dadosMusica.status_code = 200
                    dadosMusica.musica = resultMusic

                    return dadosMusica //200
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
    inserirArtistaGenero,
    atualizarArtistaGenero,
    excluirArtistaGenero,
    listarArtistaGenero,
    buscarArtistaGenero,
    buscarGeneroPorArtista,
    buscarArtistaPorGenero
} 