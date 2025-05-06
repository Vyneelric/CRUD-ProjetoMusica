/**************************************************************************************************************************************************************************************************
 * Objetivo: Criar o CRUD de dados da tabela de artista no Banco de Dados
 * Data: 15/04/2025
 * Autor: Vinicius
 * Versão: 1.0
***************************************************************************************************************************************************************************************************/

//Import da biblioteca do prisma cliente para realizar as ações no BD
const { PrismaClient } = require('@prisma/client')

//Instância da classe do Prisma Client (cria um objeto)
const prisma = new PrismaClient()

//Função para inserir um novo genero
const insertNovoAlbum = async function(album){
    try {

    let sql = `insert into tbl_albuns
    (   titulo,
        data_lancamento,
        imagem_capa,
        id_artista)
    values(  '${album.titulo}',
             '${album.data_lancamento}',
             '${album.imagem_capa}',
             '${album.id_artista}')`
    //Executa o script SQL no banco de dados e AGUARDA o resultado (retorna um true ou false)
    //$executeRawUnsafe = Usado para quando não há uma devolutiva do banco (POST, UPDATE, DELETE)
    let result = await prisma.$executeRawUnsafe(sql)

    if(result)
        return true
    else
        return false //Bug no banco de dados

    } catch(error){
        return false //Bug de programação.
    }

}

//Função para atualizar uma genero já existente
const updateAlbum = async function(album){
try {
    let sql = `update tbl_albuns set 
        titulo =                        '${album.titulo}',
        data_lancamento =               '${album.titulo}',
        imagem_capa =                   '${album.imagem_capa}',
        id_artista =                    '${album.id_usuario}'
    where id =                         ${album.id}`

    let result = await prisma.$executeRawUnsafe(sql)
    
    if(result)
        return true //Pega os bag do banco e manda pa nois
    else
        return false //Deu pau em algo do banco

} catch (error) {
    return false //Bug de Programação
}

}

//Função para excluir um genero que já existe
const deleteAlbum = async function(id){
    try {
        //Script SQL
        let sql = `delete from tbl_albuns where id = ${id}`
    
        //$executeRawUnsafe = Usado para quando não há uma devolutiva do banco (POST, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)
    
        if(result)
            return true //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }
}

//Função para retonar todas as músicas do Banco
const selectAllAlbum = async function(){
    try {
        //Script SQL
        let sql = 'select * from tbl_albuns order by id desc'
    
        //Executa o script SQL no banco de dados e AGUARDA (retorna apenas um false)
        //$queryRawUnsafe = Utilizado para quando há uma devolutiva do banco (Select)
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(result)
            return result //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }


}

//Função para buscar uma música pelo ID
const selectByIDAlbum = async function(id){

    try {
        //Script SQL
        let sql = `select * from tbl_albuns where id = ${id}`
    
        //Executa o script SQL no banco de dados e AGUARDA (retorna apenas um false)
        //$queryRawUnsafe = Para retornar dados
        let result = await prisma.$queryRawUnsafe(sql)
    
        if(result)
            return result //Retorna os dados do banco
        else
            return false //Bug no banco de dados
    
        } catch(error){
            return false //Bug de programação.
        }

}

module.exports = {
    insertNovoAlbum,
    updateAlbum,
    deleteAlbum,
    selectAllAlbum,
    selectByIDAlbum
}
