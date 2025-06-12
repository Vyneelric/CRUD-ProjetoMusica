const message = require('../../modulo/config.js')

const tipo_emailDAO = require('../../model/DAO/tipo_email.js')

const controllerArtista = require('../../controller/artistas/controllerArtistas.js')
const controllerUsuario = require('../../controller/usuario/controllerUsuario.js')

const inserirTipoEmail = async function(tipo_email, contentType){
    try {

        if(String(contentType).toLowerCase() == 'application/json')
        {
            if( tipo_email.nome         == ''           || tipo_email.nome       == null      || tipo_email.nome       == undefined      || tipo_email.nome.length > 20    ||
                tipo_email.id_artista   == ''           || tipo_email.id_artista == null      || tipo_email.id_artista == undefined      ||  isNaN(tipo_email.id_artista)  ||
                tipo_email.id_usuario   == ''           || tipo_email.id_usuario == null      || tipo_email.id_usuario == undefined      ||  isNaN(tipo_email.id_usuario)     
            )
            {
                return message.ERROR_REQUIRE_FIELDS //400
            }else{
                let result = await tipo_emailDAO.insertNovoTipoEmail(tipo_email)

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


const atualizarTipoEmail = async function(id, tipo_email, contentType){
try {
    if(String(contentType).toLowerCase() == 'application/json'){

        if(     tipo_email.nome         == ''           || tipo_email.nome       == null      || tipo_email.nome       == undefined      || tipo_email.nome.length > 20    ||
                tipo_email.id_artista   == ''           || tipo_email.id_artista == null      || tipo_email.id_artista == undefined      ||  isNaN(tipo_email.id_artista)  ||
                tipo_email.id_usuario   == ''           || tipo_email.id_usuario == null      || tipo_email.id_usuario == undefined      ||  isNaN(tipo_email.id_usuario)  ||   
                id                      == ''           || id == undefined                    || id == null                              || isNaN(id)
            )
            {
                return message.ERROR_REQUIRE_FIELDS //400
            }else{
                let result = await tipo_emailDAO.selectByIDTipoEmail(id)

                if(result != false || typeof(result) == 'object'){
                    if(result.length > 0){
                
                    tipo_email.id = id
                    let resultTipoEmail = await tipo_emailDAO.updateTipoEmail(tipo_email)
                    
                    if(resultTipoEmail){
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

const excluirTipoEmail = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{
            let resultTipoEmail = await tipo_emailDAO.selectByIDTipoEmail(id)

            if(resultTipoEmail != false || typeof(resultTipoEmail) == 'object'){
                if(resultTipoEmail.length > 0){
                    //Delete
                    let result = await tipo_emailDAO.deleteTipoEmail(id)

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

const listarTipoEmail = async function(){
    let arrayTipoEmail = []

    let dadosTipoEmail = {}

    try {
        let result = await tipo_emailDAO.selectAllTipoEmail()

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                dadosTipoEmail.status = true,
                dadosTipoEmail.status_code = 200,
                dadosTipoEmail.items = result.length

                for(const itemTipoEmail of result){
                    let dadosArtista = await controllerArtista.buscarArtista(itemTipoEmail.id_artista)
        
                    itemTipoEmail.id_artista = dadosArtista.artistas
                    

                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemTipoEmail.id_usuario)
        
                    itemTipoEmail.id_usuario = dadosUsuario.usuario

                    arrayTipoEmail.push(itemTipoEmail)
                }
                
                dadosTipoEmail.tipo_email = arrayTipoEmail

                return dadosTipoEmail
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

const buscarTipoEmail = async function (id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id)){
            return message.ERROR_REQUIRE_FIELDS //400
        }else{

        let dadosTipoEmail = {}
        
        let arrayTipoEmail = []

        let result = await tipo_emailDAO.selectByIDTipoEmail(id)

        if(result != false || typeof(result) == 'object'){
            if(result.length > 0){
                dadosTipoEmail.status = true,
                dadosTipoEmail.status_code = 200,
                dadosTipoEmail.items = result.length

                for(const itemTipoEmail of result){
                    let dadosArtista = await controllerArtista.buscarArtista(itemTipoEmail.id_artista)
        
                    itemTipoEmail.id_artista = dadosArtista.artistas
                    

                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemTipoEmail.id_usuario)
        
                    itemTipoEmail.id_usuario = dadosUsuario.usuario
                    
                    arrayTipoEmail.push(itemTipoEmail)
                }
                
                dadosTipoEmail.tipo_email = arrayTipoEmail

                return dadosTipoEmail
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
    inserirTipoEmail,
    atualizarTipoEmail,
    excluirTipoEmail,
    listarTipoEmail,
    buscarTipoEmail
}