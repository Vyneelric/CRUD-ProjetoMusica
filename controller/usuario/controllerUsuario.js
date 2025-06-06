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
const usuarioDAO = require('../../model/DAO/usuario.js')


//Import das controllers
const controllerAssinatura = require('../assinatura/controllerAssinatura.js')

//Função para inserir uma nova música
const inserirUsuario = async function(usuario, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( usuario.nome_usuario    == ''        || usuario.nome_usuario == null   || usuario.nome_usuario == undefined   || usuario.nome_usuario.length > 150   ||
                usuario.email           == ''        || usuario.email == null           || usuario.email == undefined           || usuario.email.length > 150 ||
                usuario.senha           == ''        || usuario.senha == null           || usuario.senha == undefined           || usuario.senha.length > 100           ||
                usuario.data_criacao    == ''        || usuario.data_criacao == null           || usuario.data_criacao == undefined           || usuario.data_criacao.length > 150           ||
                usuario.foto_perfil     == ''        || usuario.foto_perfil == null           || usuario.foto_perfil == undefined           || usuario.foto_perfil.length > 150 ||
                usuario.id_assinatura   == ''        || usuario.id_assinatura == undefined   
            
            
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Encaminhando os dados da música para o DAO realizar o insert no Banco de dados
                let result = await usuarioDAO.insertNovoUsuario(usuario)
        
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
const atualizarUsuario = async function(id, usuario, contentType){
try {
    if(String(contentType).toLowerCase() == 'application/json'){
        if( usuario.nome_usuario    == ''        || usuario.nome_usuario == null   || usuario.nome_usuario == undefined   || usuario.nome_usuario.length > 150   ||
            usuario.email           == ''        || usuario.email == null           || usuario.email == undefined           || usuario.email.length > 150 ||
            usuario.senha           == ''        || usuario.senha == null           || usuario.senha == undefined           || usuario.senha.length > 100           ||
            usuario.data_criacao    == ''        || usuario.data_criacao == null           || usuario.data_criacao == undefined           || usuario.data_criacao.length > 150           ||
            usuario.foto_perfil     == ''        || usuario.foto_perfil == null           || usuario.foto_perfil == undefined           || usuario.foto_perfil.length > 150 ||
            usuario.id_assinatura   == ''        || usuario.id_assinatura == undefined                 || usuario.id_assinatura             == null                ||
            id                      == ''        || id == undefined                 || id            == null                || isNaN(id)
            )
            {
                return message.ERROR_REQUIRE_FIELDS //Status code 400
            }else{
                //Verifica se o ID existe no BD
                let result = await usuarioDAO.selectByIDUsuarios(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                    //Update
                    
                    //Adiciona o atributo do ID no JSON com os dados recebidos no corpo da requisição
                    usuario.id = id
                    let resultArtista = await usuarioDAO.updateUsuario(usuario)
                    
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
const excluirUsuario = async function(id){
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
const listarUsuario = async function(){

    let arrayUsuarios = []


    //Objeto JSON
    let dadosUsuario = {}

    try {
        let result = await usuarioDAO.selectAllUsuarios()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosUsuario.status = true,
                dadosUsuario.status_code = 200,
                dadosUsuario.items = result.length


                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação
                
                // resultFilme.forEach( async function(itemFilme){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemUsuarios of result){
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                        //Busca os dados da classificação na controller de classificacao
                        let dadosAssinatura = await controllerAssinatura.buscarAssinatura(itemUsuarios.id_assinatura)

                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemUsuarios.assinatura = dadosAssinatura.assinaturas

                        delete itemUsuarios.id_assinatura
                    /* */

                    arrayUsuarios.push(itemUsuarios)
                }

                dadosUsuario.usuarios = arrayUsuarios

                return dadosUsuario

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
const buscarUsuario = async function (id){
    try {

        let arrayUsuarios = []

        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        //Objeto JSON
        let dadosUsuario = {}
        let result = await usuarioDAO.selectByIDUsuarios(id)

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                //Cria um JSON para colocar o array de músicas
                dadosUsuario.status = true,
                dadosUsuario.status_code = 200
                // dadosUsuario.usuarios = result


                //Percorrer o array de filmes para pegar cada ID de classificação
                // e descobrir quais os dados da classificação
                
                // resultFilme.forEach( async function(itemFilme){
                //Precisamos utilizar o for of, pois o foreach não consegue trabalhar com 
                // requisições async com await
                for(const itemUsuarios of result){
                    /* Monta o objeto da classificação para retornar no Filme (1XN) */
                        //Busca os dados da classificação na controller de classificacao
                        let dadosAssinatura = await controllerAssinatura.buscarAssinatura(itemUsuarios.id_assinatura)
                        //Adiciona um atributo classificação no JSON de filmes e coloca os dados da classificação
                        itemUsuarios.assinatura = dadosAssinatura.assinaturas
                        //Remover um atributo do JSON
                        delete itemUsuarios.id_assinatura
                    /* */

                    arrayUsuarios.push(itemUsuarios)
                }

                dadosUsuario.usuario = arrayUsuarios

                return dadosUsuario //200
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}