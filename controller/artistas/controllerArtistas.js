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
const aristaDAO = require('../../model/DAO/artista.js')
const artistaGeneroDAO = require('../../model/DAO/artista_genero.js')


//Import das controllers do projeto
const controllerArtistaGenero = require('../../controller/artistas/controllerArtistaGenero.js')

//Função para inserir uma nova música
const inserirArtista = async function(artista, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( artista.nome            == ''        || artista.nome == null            || artista.nome == undefined            || artista.nome.length > 100            ||
                artista.nome_completo   == ''        || artista.nome_completo == null   || artista.nome_completo == undefined   || artista.nome_completo.length > 150   ||
                artista.biografia       == undefined ||
                artista.foto_perfil     == undefined ||
                artista.senha           == ''        || artista.senha == null           || artista.senha == undefined           || artista.senha.length > 100           ||
                artista.email           == ''        || artista.email == null           || artista.email == undefined           || artista.email.length > 150
            
            
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let resultArtista = await aristaDAO.insertNovoArtista(artista)
                if (resultArtista) {
                // Se houver gêneros para associar
                    if (artista.genero_artista && Array.isArray(artista.genero_artista)) {
                        // Obtém o ID do artista inserido
                        let artistaInserido = await aristaDAO.selectLastInsertId();
                        let idArtista = artistaInserido[0].id;
                        
                        // Para cada gênero no array, cria a relação
                        for (let genero of artista.genero_artista) {
                            if (genero.id && !isNaN(genero.id)) {
                                let artistaGenero = {
                                    id_artista: idArtista,
                                    id_genero: genero.id
                                }
                                await artistaGeneroDAO.insertArtistaGenero(artistaGenero);
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
        return message.ERROR_INTERNET_SERVER_CONTROLLER;
    }


}

//Função para atulizar uma música existente
const atualizarArtista = async function(id, artista, contentType){
try {
    if(String(contentType).toLowerCase() == 'application/json'){
        if( artista.nome            == ''        || artista.nome == null            || artista.nome == undefined            || artista.nome.length > 100            ||
            artista.nome_completo   == ''        || artista.nome_completo == null   || artista.nome_completo == undefined   || artista.nome_completo.length > 150   ||
            artista.biografia       == undefined ||
            artista.foto_perfil     == undefined ||
            artista.senha           == ''        || artista.senha == null           || artista.senha == undefined           || artista.senha.length > 100           ||
            artista.email           == ''        || artista.email == null           || artista.email == undefined           || artista.email.length > 150           ||
            id                      == ''        || id == undefined                 || id            == null                || isNaN(id)
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Verifica se o ID existe no BD
                let result = await aristaDAO.selectByIDArtista(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                    //Update
                    
                    //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                    artista.id = id
                    let resultArtista = await aristaDAO.updateArtista(artista)
                    
                    if(resultArtista){
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
const excluirArtista = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

            //Antes de excluir, estamos verificando se existe este ID no BD
            let resultArtista = await aristaDAO.selectByIDArtista(id)
            if(resultArtista != false || typeof(resultArtista) == 'object'){
                if(resultArtista.length > 0){
                    //Delete
                    let result = await aristaDAO.deleteArtista(id)

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
const listarArtista = async function(){

    let arrayArtistas = []

    //Objeto JSON
    let dadosArtistas = {}

    try {
        let resultArtista = await aristaDAO.selectAllArtistas()

        if(resultArtista != false || typeof(resultArtista) == 'object'){
            if(resultArtista.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosArtistas.status = true,
                dadosArtistas.status_code = 200,
                dadosArtistas.items = resultArtista.length
                
                for(const itemArtista of resultArtista){
                    //Busca os dados da classificação na controller de classificacao
                    let dadosGenero = await controllerArtistaGenero.buscarGeneroPorArtista(itemArtista.id)
                    
                    //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                    itemArtista.genero_artista = dadosGenero.genero

                    //Adiciona em um novo array o JSON de filmes com a sua nova estrutura de dados
                    arrayArtistas.push(itemArtista)
 
                }
                
                dadosArtistas.artista = arrayArtistas

                return dadosArtistas
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNET_SERVER_MODEL //500
        }

    } catch (error) {
                    console.error('Erro no selectGeneroByIdArtista:', error);
        return message.ERROR_INTERNET_SERVER_CONTROLLER //500
    }
}

//Função para retornar um Artista pelo seu ID
const buscarArtista = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        //Objeto JSON
        let dadosArtistas = {}
        let resultArtista = await aristaDAO.selectByIDArtista(id)

        if(resultArtista != false || typeof(resultArtista) == 'object'){
            if(resultArtista.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosArtistas.status = true,
                dadosArtistas.status_code = 200,
                dadosArtistas.artistas = resultArtista

                return dadosArtistas
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
    inserirArtista,
    atualizarArtista,
    excluirArtista,
    listarArtista,
    buscarArtista
}