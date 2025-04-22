/**************************************************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela padronização de mensagens e status code
 * Data: 18/02/2025
 * Autor: Vinicius
 * Versão: 1.0
***************************************************************************************************************************************************************************************************/

/*******************************STATUS CODE DE ERROS*******************************/
const ERROR_REQUIRE_FIELDS = {
    status: false,
    status_code: 400,
    message: "Existem campos de preenchimento obrigatórios ou quantidade de caracteres que não foram atendidos."
}
const ERROR_INTERNET_SERVER = {
    status: false,
    status_code: 500,
    message: "Devido ao um erro interno no servidor, não foi possível processar a requisição"
}
const ERROR_INTERNET_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: "Devido ao um erro interno no servidor da CONTROLLER, não foi possível processar a requisição"
}
const ERROR_INTERNET_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: "Devido ao um erro interno no servidor da MODEL, não foi possível processar a requisição"
}
const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: "O content-type encaminhando não é suportado pelo servidor. Você deve encaminhar apenas conteúdos no formato JSON."
}
const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: "Não foram encotrados itens de retorno."
}


/*******************************STATUS CODE DE SUCESSO*******************************/
const SUCESS_CREATED_ITEM = {
    status: true,
    status_code: 201,
    message: "Item criado com sucesso"
}
const SUCESS_DELETED_ITEM = {
    status: true,
    status_code: 200,
    message: "Item excluído com sucesso"
}

const SUCESS_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: "Item atualizado com sucesso"
}




module.exports = {
    ERROR_REQUIRE_FIELDS,
    ERROR_INTERNET_SERVER,
    ERROR_INTERNET_SERVER_CONTROLLER,
    ERROR_INTERNET_SERVER_MODEL,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND,
    SUCESS_CREATED_ITEM,
    SUCESS_DELETED_ITEM,
    SUCESS_UPDATED_ITEM
}