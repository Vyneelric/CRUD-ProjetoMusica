const message = require('../../modulo/config.js')

const curtidasDAO = require('../../model/DAO/curtidas.js')

const controllerMusica = require('../../controller/musica/controllerMusica.js')
const controllerUsuario = require('../../controller/usuario/controllerUsuario.js')

const inserirCurtidas = async function(curtidas, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
            if(  curtidas.id_usuario   == ''           || curtidas.id_usuario == null      || curtidas.id_usuario == undefined      ||  isNaN(curtidas.id_usuario)  ||
                 curtidas.id_musica   == ''           || curtidas.id_musica == null      || curtidas.id_musica == undefined      ||  isNaN(curtidas.id_musica)     
            )
            {
                return message.ERROR_REQUIRE_FIELDS //400
            }else{
                let result = await curtidasDAO.insertNovaCurtida(curtidas)

                if(result){
                    return message.SUCESS_CREATED_ITEM //201
                } else{
                    return message.ERROR_INTERNET_SERVER_MODEL //500
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }    
    } catch (error) {
        return message.ERROR_INTERNET_SERVER_CONTROLLER
    }
}


const atualizarCurtidas = async function(id, curtidas, contentType){
try {
    if(String(contentType).toLowerCase() == 'application/json'){

        if(     curtidas.id_usuario   == ''           || curtidas.id_usuario == null      || curtidas.id_usuario == undefined      ||  isNaN(curtidas.id_usuario)  ||
                curtidas.id_musica   == ''           || curtidas.id_musica == null      || curtidas.id_musica == undefined      ||  isNaN(curtidas.id_musica)  ||   
                id                    == ''           || id == undefined                  || id == null                              || isNaN(id)
            )
            {
                return message.ERROR_REQUIRE_FIELDS //400
            }else{
                let result = await curtidasDAO.selectByIDCurtidas(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                
                    curtidas.id = id
                    let resultCurtidas = await curtidasDAO.updateCurtida(curtidas)
                    
                    if(resultCurtidas){
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

const excluirCurtidas = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{
            let resultCurtidas = await curtidasDAO.selectByIDCurtidas(id)

            if(resultCurtidas != false || typeof(resultCurtidas) == 'object'){
                if(resultCurtidas.length > 0){
                    //Delete
                    let result = await curtidasDAO.deleteCurtida(id)

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
        return message.ERROR_INTERNET_SERVER_CONTROLLER //500
    }
}

const listarCurtidas = async function(){
    let arrayCurtidas = []

    let dadosCurtidas = {}

    try {
        let result = await curtidasDAO.selectAllCurtidas()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                dadosCurtidas.status = true,
                dadosCurtidas.status_code = 200,
                dadosCurtidas.items = result.length

                for(const itemCurtidas of result){
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemCurtidas.id_usuario)
        
                    itemCurtidas.id_usuario = dadosUsuario.usuario

                    let dadosMusica = await controllerMusica.buscarMusica(itemCurtidas.id_musica)
        
                    itemCurtidas.id_musica = dadosMusica.musics

                    arrayCurtidas.push(itemCurtidas)
                }
                
                dadosCurtidas.curtidas = arrayCurtidas

                return dadosCurtidas
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

const buscarCurtidas = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        let dadosCurtidas = {}
        
        let arrayCurtidas = []

        let result = await curtidasDAO.selectByIDCurtidas(id)

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                dadosCurtidas.status = true,
                dadosCurtidas.status_code = 200,
                dadosCurtidas.items = result.length

                for(const itemCurtidas of result){
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemCurtidas.id_usuario)
        
                    itemCurtidas.id_usuario = dadosUsuario.usuario

                    let dadosMusica = await controllerMusica.buscarMusica(itemCurtidas.id_musica)
        
                    itemCurtidas.id_musica = dadosMusica.musics

                    arrayCurtidas.push(itemCurtidas)
                }
                
                dadosCurtidas.curtidas = arrayCurtidas

                return dadosCurtidas
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
    inserirCurtidas,
    atualizarCurtidas,
    excluirCurtidas,
    listarCurtidas,
    buscarCurtidas
}