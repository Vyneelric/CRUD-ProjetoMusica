/**************************************************************************************************************************************************************************************************
 * Objetivo: Criar uma API para efetuar a integração com o banco de dados
 * Data: 11/02/2025
 * Autor: Vinicius
 * Versão: 1.0
***************************************************************************************************************************************************************************************************/


//Import das bibliotecas para criar a API
const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')


//Cria um objeto para o Body do tipo JSON
const bodyparserJSON = bodyparser.json()

//Cria um objeto do app para criar a API
const app = express()

//Import das Controllers do projeto
const controller = require('./controller/musica/controllerMusica.js')
const controllerGenero = require('./controller/genero/controllerGenero.js')
const controllerArtista = require('./controller/artistas/controllerArtistas.js')
const controllerAssinatura = require('./controller/assinatura/controllerAssinatura.js')
const controllerUsuario = require('./controller/usuario/controllerUsuario.js')

//Configurações de permissões do CORS para a API
app.use((request, response, next)=>{
    response.header('Acess-Control-Allow-Origin', '*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})

//End-Point para inserir uma nova música  
app.post('/v1/controle-musicas/musica', cors(), bodyparserJSON, async function(request, response){
    //Recebe o content-type do Header da requisição !
    let contentType = request.headers['content-type'] 
    //Recebe os dados do Body da requisição ! 
    let dadosBody = request.body

    //Chama a função da controller para inserir os dados e aguarda o retorno da função
    let resultMusica = await controller.inserirMusica(dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//End-Point para listar todas as músicas inseridas
app.get('/v1/controle-musicas/musica', cors(), async function(request, response){

    let resultMusica = await controller.listarMusica()

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//End-Point para selecionar a música pelo ID
app.get('/v1/controle-musicas/musica/:id', cors(), async function(request, response){
    //Recebe o ID enviado pelo end-point
    const idMusica = request.params.id

    //CHama a função
    let resultMusica = await controller.buscarMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//End-Point para excluir uma música já existente 
app.delete('/v1/controle-musicas/musica/:id', cors(), async function(request, response){
    //Recebe o ID enviado pelo end-point
    const idMusica = request.params.id

    //CHama a função
    let resultMusica = await controller.excluirMusica(idMusica)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})

//End-Point para atualizar uma música já existente 
app.put('/v1/controle-musicas/musica/:id', cors(), bodyparserJSON, async function(request, response){
    
    //Recebe o contentType da requisição
    let contentType = request.headers['content-type']
    
    //Recebe o ID enviado pelo end-point
    let idMusica = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //CHama a função
    let resultMusica = await controller.atualizarMusica(idMusica, dadosBody, contentType)

    response.status(resultMusica.status_code)
    response.json(resultMusica)
})




//END-POINT DO GENÊRO

//End-Point para inserir um novo gênero
app.post('/v1/controle-musicas/genero', cors(), bodyparserJSON, async function(request, response){
    
    //Recebe o content-type do Header da requisição!
    let contentType = request.headers['content-type'] 
    //Recebe os dados do Body da requisição ! 
    let dadosBody = request.body

    //Chama a função da controller para inserir os dados e aguarda o retorno da função
    let resultGenero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//End-Point para listar todas os gêneros já existentes
app.get('/v1/controle-musicas/genero', cors(), async function(request, response){

    let resultGenero = await controllerGenero.listarGeneros()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//End-Point para selecionar um gênero pelo ID
app.get('/v1/controle-musicas/genero/:id', cors(), async function(request, response){
    //Recebe o ID enviado pelo end-point
    const id = request.params.id

    //CHama a função
    let resultGenero = await controllerGenero.buscarGenero(id)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//End-Point para excluir um gênero já existente 
app.delete('/v1/controle-musicas/genero/:id', cors(), async function(request, response){
    //Recebe o ID enviado pelo end-point
    const id = request.params.id

    //CHama a função
    let resultGenero = await controllerGenero.excluirGenero(id)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
})

//End-Point para atualizar um gênero já existente 
app.put('/v1/controle-musicas/genero/:id', cors(), bodyparserJSON, async function(request, response){
    
    //Recebe o contentType da requisição
    let contentType = request.headers['content-type']
    
    //Recebe o ID enviado pelo end-point
    let id = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //CHama a função
    let resultGenero = await controllerGenero.atualizarGenero(id, dadosBody, contentType)
    
    response.status(resultGenero.status_code)
    response.json(resultGenero)
})




//END-POINT DO ARTISTA

//End-Point para inserir um novo artista
app.post('/v1/controle-musicas/artista', cors(), bodyparserJSON, async function(request, response){
    
    //Recebe o content-type do Header da requisição!
    let contentType = request.headers['content-type'] 
    //Recebe os dados do Body da requisição ! 
    let dadosBody = request.body

    //Chama a função da controller para inserir os dados e aguarda o retorno da função
    let resultArtista = await controllerArtista.inserirArtista(dadosBody, contentType)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

//End-Point para listar todas os artista já existentes
app.get('/v1/controle-musicas/artista', cors(), async function(request, response){

    let resultArtista = await controllerArtista.listarArtista()

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

//End-Point para selecionar o artista pelo ID
app.get('/v1/controle-musicas/artista/:id', cors(), async function(request, response){
    //Recebe o ID enviado pelo end-point
    const id = request.params.id

    //Chama a função
    let resultArtista = await controllerArtista.buscarArtista(id)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

//End-Point para excluir um artista já existente 
app.delete('/v1/controle-musicas/artista/:id', cors(), async function(request, response){
    //Recebe o ID enviado pelo end-point
    const id = request.params.id

    //Chama a função
    let resultArtista = await controllerArtista.excluirArtista(id)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})

//End-Point para atualizar um artista já existente 
app.put('/v1/controle-musicas/artista/:id', cors(), bodyparserJSON, async function(request, response){
    
    //Recebe o contentType da requisição
    let contentType = request.headers['content-type']
    
    //Recebe o ID enviado pelo end-point
    let id = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //CHama a função
    let resultArtista = await controllerArtista.atualizarArtista(id, dadosBody, contentType)

    response.status(resultArtista.status_code)
    response.json(resultArtista)
})





//END-POINT DA ASSINATURA

//End-Point para inserir uma nova assinatura
app.post('/v1/controle-musicas/assinatura', cors(), bodyparserJSON, async function(request, response){
    
    //Recebe o content-type do Header da requisição!
    let contentType = request.headers['content-type'] 
    //Recebe os dados do Body da requisição ! 
    let dadosBody = request.body

    //Chama a função da controller para inserir os dados e aguarda o retorno da função
    let resultAssinatura = await controllerAssinatura.inserirAssinatura(dadosBody, contentType)

    response.status(resultAssinatura.status_code)
    response.json(resultAssinatura)
})

//End-Point para listar todas os assinaturas já existentes
app.get('/v1/controle-musicas/assinatura', cors(), async function(request, response){

    let resultAssinatura = await controllerAssinatura.listarAssinatura()

    response.status(resultAssinatura.status_code)
    response.json(resultAssinatura)
})

//End-Point para selecionar a assinatura pelo ID
app.get('/v1/controle-musicas/assinatura/:id', cors(), async function(request, response){
    //Recebe o ID enviado pelo end-point
    const id = request.params.id

    //Chama a função
    let resultAssinatura = await controllerAssinatura.buscarAssinatura(id)

    response.status(resultAssinatura.status_code)
    response.json(resultAssinatura)
})

//End-Point para excluir um assinatura já existente 
app.delete('/v1/controle-musicas/assinatura/:id', cors(), async function(request, response){
    //Recebe o ID enviado pelo end-point
    const id = request.params.id

    //Chama a função
    let resultAssinatura = await controllerAssinatura.excluirAssinatura(id)

    response.status(resultAssinatura.status_code)
    response.json(resultAssinatura)
})

//End-Point para atualizar um assinatura já existente 
app.put('/v1/controle-musicas/assinatura/:id', cors(), bodyparserJSON, async function(request, response){
    
    //Recebe o contentType da requisição
    let contentType = request.headers['content-type']
    
    //Recebe o ID enviado pelo end-point
    let id = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //CHama a função
    let resultAssinatura = await controllerAssinatura.atualizarAssinatura(id, dadosBody, contentType)

    response.status(resultAssinatura.status_code)
    response.json(resultAssinatura)
})


//END-POINT DO USUARIO

//End-Point para inserir um novo usuario
app.post('/v1/controle-musicas/usuario', cors(), bodyparserJSON, async function(request, response){
    
    //Recebe o content-type do Header da requisição!
    let contentType = request.headers['content-type'] 
    //Recebe os dados do Body da requisição ! 
    let dadosBody = request.body

    //Chama a função da controller para inserir os dados e aguarda o retorno da função
    let result = await controllerUsuario.inserirUsuario(dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

//End-Point para listar todas os usuario já existentes
app.get('/v1/controle-musicas/usuario', cors(), async function(request, response){

    let result = await controllerUsuario.listarUsuario()

    response.status(result.status_code)
    response.json(result)
})

//End-Point para selecionar o usuario pelo ID
app.get('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){
    //Recebe o ID enviado pelo end-point
    const id = request.params.id

    //Chama a função
    let result = await controllerUsuario.buscarUsuario(id)

    response.status(result.status_code)
    response.json(result)
})

//End-Point para excluir um usuario já existente 
app.delete('/v1/controle-musicas/usuario/:id', cors(), async function(request, response){
    //Recebe o ID enviado pelo end-point
    const id = request.params.id

    //Chama a função
    let result = await controllerUsuario.excluirUsuario(id)

    response.status(result.status_code)
    response.json(result)
})

//End-Point para atualizar um usuario já existente 
app.put('/v1/controle-musicas/usuario/:id', cors(), bodyparserJSON, async function(request, response){
    
    //Recebe o contentType da requisição
    let contentType = request.headers['content-type']
    
    //Recebe o ID enviado pelo end-point
    let id = request.params.id

    //Recebe os dados do corpo da requisição
    let dadosBody = request.body

    //CHama a função
    let result = await controllerUsuario.atualizarUsuario(id, dadosBody, contentType)

    response.status(result.status_code)
    response.json(result)
})

app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições...')
})